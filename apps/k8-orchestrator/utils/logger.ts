import createLogger from "@octodock/octolog";

const host = process.env.LOKI_HOST!;
const username = process.env.LOKI_USER!;
const apiKey = process.env.LOKI_APIKEY!;
const labels = process.env.LOKI_LABELS!;
const isJson = process.env.ISJSON! === "true" ? true : false;
const interval = Number.parseInt(process.env.LOKI_INTERVAL!);

const logger = createLogger(host, username, apiKey, labels, isJson, interval);
logger.loggerInstance.on("error", (err) => {
  console.error("Logger error:", err);
});
export default logger;
/**
 * Use Like logger.log(<logging_level>,<message_string>)
 * level of logging info error system
 */
