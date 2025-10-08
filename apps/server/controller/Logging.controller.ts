import axios from "axios";
class LoggingController {
  /**
   * This controller is created for the sole purpose of creating an admin panel
   * and collection the logs using LOKI (grafana-labs) and winston logger
   */
  private lokiEndpoint: string;
  private lokiUsername: string;
  private lokiApiKey: string;
  constructor() {
    this.lokiEndpoint = process.env.LOKI_HOST!;
    this.lokiApiKey = process.env.LOKI_APIKEY!;
    this.lokiUsername = process.env.LOKI_USER!;
    this.servePaginatedLogic = this.servePaginatedLogic.bind(this);
  }
  async getCompletePaginatedLogs(currentIndex: number) {
    /**
     * hits the loki api inorder to get all the logs that are built in the cloud of loki
     * which will be done via batching of log requests.
     */
    const numberOfLogs = await this.getNumberOfLogsPresent();
    const PAGINATION_LIMIT = 20;
    /**
     * Batching logic for the db
     */
    let next = null;
    let prev = null;
    if (currentIndex * PAGINATION_LIMIT > 0) {
      prev = currentIndex - 1;
    }
    if (currentIndex * PAGINATION_LIMIT < numberOfLogs) {
      next = currentIndex + 1;
    }

    if (
      currentIndex * PAGINATION_LIMIT < 0 ||
      currentIndex * PAGINATION_LIMIT > numberOfLogs
    ) {
      console.log("No Logs Found");
      return;
    }
    try {
      const response = await axios.get(
        `${this.lokiEndpoint}/loki/api/v1/query_range`,
        {
          params: {
            query: '{app="octodock"}',
            limit: PAGINATION_LIMIT,
            direction: "backward",
            start: Date.now() * 1e6 - 10 * 24 * 3600 * 1e9,
            end: Date.now() * 1e6,
          },
          auth: {
            username: this.lokiUsername,
            password: this.lokiApiKey,
          },
        },
      );

      const streams = response.data.data.result;

      if (streams.length === 0) {
        console.log("No logs found");
        return [];
      }

      // Flatten logs
      const logs = streams.flatMap((s: any) =>
        s.values.map(([ts, line]: [string, string]) => ({
          timestamp: new Date(Number(ts) / 1e6),
          log: line,
        })),
      );

      for (let i = 0; i < logs.length; i++) {
        logs[i] = this.parseLog(logs[i]);
      }
      return { logs, prev, next };
    } catch (err: any) {
      console.error("Error fetching logs:", err.response?.data || err.message);
      console.log(err);
      return [];
    }
  }
  async getNumberOfLogsPresent() {
    try {
      const response = await axios.get(
        `${this.lokiEndpoint}/loki/api/v1/query`,
        {
          params: {
            query: 'sum(count_over_time({app="octodock"}[30d]))',
          },
          auth: {
            username: this.lokiUsername, // your Grafana Cloud stack ID
            password: this.lokiApiKey, // token with logs:read
          },
        },
      );

      let result = response.data.data.result;
      if (result.length > 0) {
        result = result[0].value[1];
      } else {
        result = 0;
      }
      return result;
    } catch (err: any) {
      console.error("Error querying Loki:", err.response?.data || err.message);
    }
  }
  parseLog(log: any) {
    let parsedLog = JSON.parse(log.log);
    parsedLog.message = JSON.parse(JSON.parse(log.log).message);
    return parsedLog;
  }
  async servePaginatedLogic(req, res) {
    /**
     * SSE Endpoint for serving real time data from the application logs
     */
    const pageNumber: number = Number.parseInt(req.query.page);
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    const interval = setInterval(async () => {
      try {
        console.log("pageNumber: ", pageNumber);
        let logs = await this.getCompletePaginatedLogs(pageNumber);
        if (logs) {
          res.write("data: " + JSON.stringify(logs) + "\n\n");
        }
      } catch (error) {
        res.write(`event: error\ndata: ${JSON.stringify(error.message)}\n\n`);
      }
    }, 10000);

    req.on("close", () => {
      clearInterval(interval);
      res.end();
    });
  }
}

export default new LoggingController();
