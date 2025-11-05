import { createClient } from "@clickhouse/client";
import type { ClickHouseClient } from "@clickhouse/client";

interface deployment {
  id: string;
  log: string;
  projectId: string;
  createdAt: string;
}

class ClickHouse {
  client: ClickHouseClient | null = null;
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

  async queryFromClickHouse(projectId: string) {
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
  async insertIntoClickHouse(deployments: deployment[]) {
    await this.client?.insert({
      table: "log_events",
      values: deployments,
      format: "JSONEachRow",
    });
  }
}

export default new ClickHouse();
