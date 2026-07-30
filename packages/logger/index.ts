import winston from "winston";
import LokiTransport from "winston-loki";
import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage<LogContext>();

export interface LogContext {
  user?: string;
  requestId?: string;
}

type logger = winston.Logger | null;
export interface loggerDefinition {
  message: string;
  loggingLevel?: "info" | "error" | "warn" | "debug" | "silly";
  timeStamp?: string;
  error?: string | null;
  user?: string;
}

let logger: logger = null;

export function runWithContext<T>(context: LogContext, fn: () => Promise<T>) {
  return asyncLocalStorage.run(context, fn);
}

export function getLogContext(): LogContext {
  return asyncLocalStorage.getStore() || {};
}

class Logger {
  loggerInstance: logger | undefined;

  constructor(
    host: string,
    user: string,
    apiKey: string,
    labels: string,
    isJson: boolean,
    interval: number,
  ) {
    if (logger) {
      this.loggerInstance = logger; // reuse existing one
      return;
    }

    const transports: winston.transport[] = [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ];

    if (host && user && apiKey) {
      transports.push(
        new LokiTransport({
          host,
          basicAuth: `${user}:${apiKey}`,
          labels: JSON.parse(labels || "{}"),
          json: isJson,
          interval,
          format: winston.format.json(),
          replaceTimestamp: true,
        }),
      );
    }

    logger = winston.createLogger({ transports });
    this.loggerInstance = logger;
  }

  logData(data: loggerDefinition) {
    if (!data.timeStamp) {
      data.timeStamp = new Date().toISOString();
    }
    const ctx = getLogContext();
    data.user = data.user || ctx.user || "SYSTEM";

    if (this.loggerInstance) {
      this.loggerInstance.log(
        (data.loggingLevel || "info") as any,
        JSON.stringify(data),
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
  interval: number,
) {
  return new Logger(host, user, apiKey, labels, isJson, interval);
}

export default createLogger;
