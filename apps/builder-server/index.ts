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
  }),
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
    ],
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
  if (!process.env.DOCKER_PASSWORD) {
    throw new Error("❌ DOCKER_PASSWORD env not found");
  }

  const projectId = data.projectId;
  const dbProject = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!dbProject?.id || !dbProject?.createdBy) {
    throw new Error("❌ Missing project or user information");
  }
  let giturl = dbProject.githubUrl || "";
  giturl = giturl.replace("api.", "").replace("/repos", "");
  console.log("GITHUB URL IS: ", giturl);
  const args = [
    "run",
    "--rm",
    "--privileged",
    "--network=host",
    "-e",
    `GIT_URL=${giturl}`,
    "-e",
    `IMAGE_NAME=octodock/${data.PROJECT_NAME.toLowerCase()}`,
    "-e",
    `DOCKER_PASSWORD=${process.env.DOCKER_PASSWORD}`,
    "angadsudan/build-project",
  ];

  await clickhouseClient.insertIntoClickHouse([
    {
      id: uuid(),
      log: "🚀 Running Docker with args: " + args.join(" "),
      projectId,
      createdAt: new Date().toISOString(),
    },
  ]);
  // Wrap spawn into a promise
  await new Promise<void>((resolve, reject) => {
    const generatedProcess = spawn("docker", args, { stdio: "pipe" });

    generatedProcess.stdout.on("data", (data) => {
      clickhouseClient.insertIntoClickHouse([
        {
          id: uuid(),
          log: `[docker-stdout] ${data}`,
          projectId,
          createdAt: new Date().toISOString(),
        },
      ]);

      console.log(`[docker-stdout] ${data}`);
    });

    generatedProcess.stderr.on("data", (data) => {
      clickhouseClient.insertIntoClickHouse([
        {
          id: uuid(),
          log: `[docker-stderr] ${data}`,
          projectId,
          createdAt: new Date().toISOString(),
        },
      ]);
      console.log(`[docker-stderr] ${data}`);
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
            projectId: data.projectId,
            createdAt: new Date().toISOString(),
          },
        ]);
        resolve();
      } else {
        reject(new Error(`❌ Build container exited with code ${code}`));
      }
    });
  });

  // Create deployment only if docker build succeeded
  const deployment = await prisma.deployment.create({
    data: {
      dockerImage: "octodock/" + data.PROJECT_NAME.toLowerCase(),
      urlSlug: generateSlug(),
      projectId: dbProject.id,
      userId: dbProject.createdBy,
    },
  });

  /**
   * TODO: Add API call to consumer group to create a K8 pod
   * and return the API URL from here to the frontend
   */
  return deployment;
}

client.consumeMessageViaConsumer(
  "deployment-consumer",
  "pending-docker-build",
  runDockerBuild,
);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.log("this is from global error handlers");
    console.error(err.stack || err.message || err);
    next();
  },
);

app
  .listen(9000, () => {
    console.log("deployment server listening on port 9000");
  })
  .addListener("error", (error) => {
    console.log(error);
  });
