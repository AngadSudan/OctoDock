/**
 * contains docker-node or exec using which we
 * will be executing our docker build commands
 */
import { createClient } from "@clickhouse/client";
class ClickHouse {
  client;
  constructor() {
    if (this.client) {
      return;
    }

    this.client = createClient({
      url: process.env.CLICKHOUSE_URL,
      username: process.env.CLICKHOUSE_USERNAME,
      password: process.env.CLICKHOUSE_PASSWORD,
    });

    this.client.command({
      query: `
      CREATE TABLE IF NOT EXISTS log_events
      (
          id String,
          log String,
          projectId String,
          createdAt DateTime DEFAULT now()
      )
      ENGINE = MergeTree
      ORDER BY (projectId, createdAt, id);;
      `,
    });
  }

  async insertIntoClickHouse(deployments) {
    await this.client?.insert({
      table: "log_events",
      values: deployments,
      format: "JSONEachRow",
    });
  }
}

export default new ClickHouse();

import { spawn, exec } from "child_process";

async function main() {
  const client = new ClickHouse();

  const imageName = process.env.IMAGE_NAME ?? "default-image";
  const args = [
    "build",
    "-f",
    "/home/app/Dockerfile", // make sure this points to your actual Dockerfile
    "-t",
    `octodock92/${imageName}`,
    "/home/app/project",
  ];

  console.log(`Running: docker ${args.join(" ")}`);

  const child = spawn("docker", args, { stdio: "inherit" });

  child.on("close", async (code) => {
    if (code === 0) {
      client.insertIntoClickHouse([
        { id: Date.now(), log: "✅ Build complete", projectId: imageName },
      ]);
      client.insertIntoClickHouse([
        {
          id: Date.now(),
          log: "continuing the build stage .... ",
          projectId: imageName,
        },
      ]);
      const dockerLogin = exec(`
          echo ${process.env.DOCKER_PASSWORD} | docker login -u octodock92 --password-stdin
        `);
      dockerLogin.stdout.on("data", (data) => {
        // console.log(data.toString());
        client.insertIntoClickHouse([
          { id: Date.now(), log: data.toString(), projectId: imageName },
        ]);
      });

      dockerLogin.stderr.on("data", (data) => {
        client.insertIntoClickHouse([
          { id: Date.now(), log: data.toString(), projectId: imageName },
        ]);
      });

      dockerLogin.on("close", (code) => {
        if (code === 0) {
          const process = exec(`docker push octodock92/${imageName}`);
          process.stdout.on("data", (data) => {
            console.log(data);
            client.insertIntoClickHouse([
              { id: Date.now(), log: data, projectId: imageName },
            ]);
          });
          process.stdout.on("error", (error) => {
            console.log("error occured", error);
            client.insertIntoClickHouse([
              { id: Date.now(), log: data, projectId: imageName },
            ]);
          });
          process.stdout.on("close", () => {
            console.log("push successful");
            client.insertIntoClickHouse([
              { id: Date.now(), log: "push successful", projectId: imageName },
            ]);
          });
        } else {
          console.error(`❌ Docker login failed with exit code ${code}`);

          client.insertIntoClickHouse([
            {
              id: Date.now(),
              log: `❌ Docker login failed with exit code ${code}`,
              projectId: imageName,
            },
          ]);
        }
      });
    } else {
      console.error(`❌ Build failed with exit code ${code}`);
      process.exit(code);
    }

    process.exit(0);
  });
}

main();
