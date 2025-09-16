import { createClient } from "@clickhouse/client";

const getClickHouseClient = async () => {
  const client = createClient({
    url: process.env.CLICKHOUSE_URL,
    username: process.env.CLICKHOUSE_USERNAME,
    password: process.env.CLICKHOUSE_PASSWORD,
  });
  return client;
};

export default getClickHouseClient;
