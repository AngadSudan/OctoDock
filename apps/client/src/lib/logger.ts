import createLogger from "octolog";

const host = import.meta.env.VITE_LOKI_HOST!;
const username = import.meta.env.VITE_LOKI_USER!;
const apiKey = import.meta.env.VITE_LOKI_APIKEY!;
const labels = import.meta.env.VITE_LOKI_LABELS!;
const isJson = import.meta.env.VITE_ISJSON! === "true" ? true : false;
const interval = Number.parseInt(process.env.LOKI_INTERVAL!);

const logger = createLogger(host, username, apiKey, labels, isJson, interval);
logger.loggerInstance.on("error", (err) => {
  console.error("Logger error:", err);
});
export default logger;
/**
 * Use Like logger.log(<logging_level>,<message_string>)
 * level of logging info error system
 * logger.logData({
 *  message: <statement_with_console_log>
 * })
 * 
 * for error 
 * logger.logData({
 *  message: "Error: " + error.message,
 *  loggingLevel: "error",
 * error:error 
 * })
 */
