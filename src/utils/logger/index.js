import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const logDir = "logs";
const { combine, timestamp, printf } = winston.format;

const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

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

logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    })
  );
}

export default logger;
