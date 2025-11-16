/**
 * contains docker-node or exec using which we
 * will be executing our docker build commands
 */
import { spawn, exec } from "child_process";
import { createClient } from "@clickhouse/client";

class ClickHouse {
  client = null;
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
          createdAt String
      )
      ENGINE = MergeTree
      ORDER BY (projectId, createdAt, id);;
      `,
    });
  }

  async queryFromClickHouse(projectId) {
    const result = await this.client?.query({
      query: `
    SELECT log
    FROM log_events
    WHERE projectId = {projectId:String}
      AND parseDateTimeBestEffort(createdAt) > parseDateTimeBestEffort({afterTime:String})
    ORDER BY parseDateTimeBestEffort(createdAt) DESC
  `,
      query_params: {
        projectId,
        afterTime: "2025-11-05 14:45:00", // example timestamp (2:45 PM)
      },
    });

    console.log(typeof result);
    console.log(result);
    return result;
  }
  async insertIntoClickHouse(deployments) {
    await this.client?.insert({
      table: "log_events",
      values: deployments,
      format: "JSONEachRow",
    });
  }
}

async function main() {
  const client = new ClickHouse();
  const imageName =
    process.env.IMAGE_NAME.replace("octodock/", "") ?? "default-image";
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

  child.on("close", (code) => {
    if (code === 0) {
      client.insertIntoClickHouse([
        { id: Date.now(), log: "✅ Build complete", projectId: imageName },
      ]);
      console.log("✅ Build complete octodock92/", imageName);
      console.log("continuing the build stage .... ");
      client.insertIntoClickHouse([
        {
          id: Date.now(),
          log: "continuing to push phase",
          projectId: imageName,
        },
      ]);
      console.log(`octodock92:${process.env.DOCKER_PASSWORD}`);
      const dockerLogin = exec(`
          echo ${process.env.DOCKER_PASSWORD} | docker login -u octodock92 --password-stdin
        `);
      dockerLogin.stdout.on("data", (data) => {
        client.insertIntoClickHouse([
          { id: Date.now(), log: data.toString(), projectId: imageName },
        ]);
        console.log(data.toString());
      });

      dockerLogin.stderr.on("data", (data) => {
        client.insertIntoClickHouse([
          { id: Date.now(), log: data.toString(), projectId: imageName },
        ]);
        console.error(data.toString());
      });

      dockerLogin.on("close", (code) => {
        if (code === 0) {
          const process = exec(`docker push octodock92/${imageName}`);
          process.stdout.on("data", (data) => {
            client.insertIntoClickHouse([
              { id: Date.now(), log: data.toString(), projectId: imageName },
            ]);
            console.log(data);
          });
          process.stdout.on("error", (error) => {
            client.insertIntoClickHouse([
              { id: Date.now(), log: data.toString(), projectId: imageName },
            ]);
            console.log("error occured", error);
          });
          process.stdout.on("close", () => {
            client.insertIntoClickHouse([
              {
                id: Date.now(),
                log: `push successful octodock92/${imageName} `,
                projectId: imageName,
              },
            ]);
            console.log("push successful");
          });
        } else {
          client.insertIntoClickHouse([
            {
              id: Date.now(),
              log: `❌ Docker login failed with exit code ${code}`,
              projectId: imageName,
            },
          ]);
          console.error(`❌ Docker login failed with exit code ${code}`);
        }
      });
    } else {
      client.insertIntoClickHouse([
        {
          id: Date.now(),
          log: `❌ Build failed with exit code ${code}`,
          projectId: imageName,
        },
      ]);
      process.exit(code);
    }
  });
}

main();
