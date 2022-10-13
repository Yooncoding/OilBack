import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const logDir = "logs"; // logs 디렉토리 하위에 로그 파일 저장
const { combine, timestamp, printf } = winston.format;

const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

/**
 * Log level
 * error: 0, warn: 1, info: 2, http: 3, verbose:4, debug:5, silly: 6
 */
const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%-error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    })
  );
}

export default logger;
