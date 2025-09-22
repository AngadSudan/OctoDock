import express from "express";
import { spawn, exec } from "child_process";
import process from "process";
import cors from "cors";
import registerKafkaClient from "@octodock/queue";
import clickhouseClient from "./client";
import { v4 as uuid } from "uuid";
import prisma from "@octodock/prisma";
import generateSlug from "./slug";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:8000",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "device-remeber-token",
      "Origin",
      "Accept",
    ],
  })
);
app.use(express.json());

const client = registerKafkaClient("push-to-deployment-queue", [
  "localhost:9092",
]);
client.createTopic([
  {
    topic: "pending-docker-build",
  },
]);
client.createNewProducer("deployment-producer");
client.createNewConsumer("deployment-consumer", "initial");

app.post("/deploy", async (req, res) => {
  const { projectId } = req.body;
  const dbProject = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });
  await client.pushMessageViaProducer(
    "deployment-producer",
    "pending-docker-build",
    [
      JSON.stringify({
        GIT_URL: dbProject?.githubUrl,
        PROJECT_NAME: dbProject?.name.replaceAll(" ", "-").replaceAll(",", "-"),
        projectId,
      }),
    ]
  );
  res.json({
    message: "Getting the deployment ready for you",
  });
});

async function runDockerBuild(data: {
  GIT_URL: string;
  PROJECT_NAME: string;
  projectId: string;
}) {
  new Promise(async (resolve, reject) => {
    if (!process.env.DOCKER_PASSWORD) {
      return reject(new Error("❌ DOCKER_PASSWORD env not found"));
    }
    const projectId = data.projectId;
    const dbProject = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    const args = [
      "run",
      "--rm",
      "--privileged",
      "--network=host",
      "-e",
      `GIT_URL=${data.GIT_URL!}`,
      "-e",
      `IMAGE_NAME=octodock/${data.PROJECT_NAME.toLowerCase()!}`,
      "-e",
      `DOCKER_PASSWORD=${process.env.DOCKER_PASSWORD}`,
      "angadsudan/build-project",
    ];

    clickhouseClient.insertIntoClickHouse([
      {
        id: uuid(),
        log: "🚀 Running Docker with args:" + args.join(" "),
        projetId: projectId,
        createdAt: new Date().toISOString(),
      },
    ]);
    const generatedProcess = spawn("docker", args, { stdio: "pipe" });

    generatedProcess.stdout.on("data", (data) => {
      clickhouseClient.insertIntoClickHouse([
        {
          id: uuid(),
          log: `[docker-stdout] ${data}`,
          projetId: projectId,
          createdAt: new Date().toISOString(),
        },
      ]);
    });

    generatedProcess.stderr.on("data", (data) => {
      clickhouseClient.insertIntoClickHouse([
        {
          id: uuid(),
          log: `[docker-stderr] ${data}`,
          projetId: projectId,
          createdAt: new Date().toISOString(),
        },
      ]);
    });

    generatedProcess.on("error", (err) => {
      reject(new Error(`❌ Failed to start docker: ${err.message}`));
    });

    generatedProcess.on("close", (code) => {
      if (code === 0) {
        clickhouseClient.insertIntoClickHouse([
          {
            id: uuid(),
            log: "✅ Build container completed successfully",
            projetId: projectId,
            createdAt: new Date().toISOString(),
          },
        ]);
        /**
         * Put the entry into another queue which will be saving it to database
         */
        resolve("");
      } else {
        reject(new Error(`❌ Build container exited with code ${code}`));
      }
    });

    if (!dbProject?.id || !dbProject?.createdBy) {
      reject(new Error("❌ Missing project or user information"));
      return;
    }

    const deployment = await prisma.deployment.create({
      data: {
        dockerImage: "octodock/" + data.PROJECT_NAME.toLowerCase(),
        urlSlug: generateSlug(),
        projectId: dbProject.id,
        userId: dbProject.createdBy,
      },
    });
  });

  /**
   * add an API call to consumer group to create a K8 pod
   * and return the api url from here to the frontend
   */
}
client.consumeMessageViaConsumer(
  "deployment-consumer",
  "pending-docker-build",
  runDockerBuild
);

app.listen(9000, () => {
  console.log("deployment server listening on port 9000");
});
