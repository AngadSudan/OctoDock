import { createClient } from "@clickhouse/client";

void (async () => {
  const client = createClient({
    url: "https://j4bg0gi4tv.asia-southeast1.gcp.clickhouse.cloud:8443",
    username: "default",
    password: "gc5b~xfykPS2C",
  });
  const rows = await client.query({
    query: "SELECT 1",
    format: "JSONEachRow",
  });
  console.log("Result: ", await rows.json());
})();
