import winston from "winston";
import LokiTransport from "winston-loki";

type logger = winston.Logger | null;
export interface loggerDefinition {
  message: string;
  loggingLevel?: "info" | "error" | "warn" | "debug" | "silly";
  timeStamp?: string;
  error?: string | null;
}

let logger: logger = null;

class Logger {
  loggerInstance: logger | undefined;

  constructor(
    host: string,
    user: string,
    apiKey: string,
    labels: string,
    isJson: boolean,
    interval: number
  ) {
    if (logger) {
      this.loggerInstance = logger; // reuse existing one
      return;
    }

    logger = winston.createLogger({
      transports: [
        new LokiTransport({
          host, // e.g. https://logs-prod3.grafana.net
          basicAuth: `${user}:${apiKey}`, // user is usually your stack ID
          labels: JSON.parse(labels),
          json: isJson,
          interval,
          format: winston.format.json(),
          replaceTimestamp: true,
        }),
      ],
    });

    this.loggerInstance = logger;
  }

  logData(data: loggerDefinition) {
    if (!data.timeStamp) {
      data.timeStamp = new Date().toISOString();
    }
    if (this.loggerInstance) {
      this.loggerInstance.log(
        (data.loggingLevel || "info") as any,
        JSON.stringify(data)
      );
    }
  }
}

function createLogger(
  host: string,
  user: string,
  apiKey: string,
  labels: string,
  isJson: boolean,
  interval: number
) {
  return new Logger(host, user, apiKey, labels, isJson, interval);
}

export default createLogger;
