import express from "express";
import { spawn, exec } from "child_process";
import process from "process";
import cors from "cors";
import registerKafkaClient from "@octodock/queue";
const app = express();
app.use(cors());
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
  const { GIT_URL, PROJECT_NAME } = req.body;
  await client.pushMessageViaProducer(
    "deployment-producer",
    "pending-docker-build",
    [
      JSON.stringify({
        GIT_URL,
        PROJECT_NAME,
      }),
    ]
  );
  res.json({
    message: "Getting the deployment ready for you",
  });
});

async function runDockerBuild(data: { GIT_URL: string; PROJECT_NAME: string }) {
  return new Promise((resolve, reject) => {
    if (!process.env.DOCKER_PASSWORD) {
      return reject(new Error("❌ DOCKER_PASSWORD env not found"));
    }

    const args = [
      "run",
      "--rm",
      "--privileged",
      "--network=host",
      "-e",
      `GIT_URL=${data.GIT_URL!}`,
      "-e",
      `IMAGE_NAME=${data.PROJECT_NAME.toLowerCase()!}`,
      "-e",
      `DOCKER_PASSWORD=${process.env.DOCKER_PASSWORD}`,
      "angadsudan/build-project",
    ];

    console.log("🚀 Running Docker with args:", args.join(" "));

    const generatedProcess = spawn("docker", args, { stdio: "pipe" });

    generatedProcess.stdout.on("data", (data) => {
      process.stdout.write(`[docker-stdout] ${data}`);
    });

    generatedProcess.stderr.on("data", (data) => {
      process.stderr.write(`[docker-stderr] ${data}`);
    });

    generatedProcess.on("error", (err) => {
      reject(new Error(`❌ Failed to start docker: ${err.message}`));
    });

    generatedProcess.on("close", (code) => {
      if (code === 0) {
        console.log("✅ Build container completed successfully");
        /**
         * Put the entry into another queue which will be saving it to database
         */
        resolve("");
      } else {
        reject(new Error(`❌ Build container exited with code ${code}`));
      }
    });
  });
}
client.consumeMessageViaConsumer(
  "deployment-consumer",
  "pending-docker-build",
  runDockerBuild
);

app.listen(3000, () => {
  console.log("deployment server listening on port 9000");
});
