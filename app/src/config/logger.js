const { createLogger, transports, format } = require("winston");
const { combine, printf, colorize, label, timestamp, simple } = format;
require("winston-daily-rotate-file");

const printFormat = printf(({ timestamp, label, level, message }) => {
  return `[${level}] [${label}] ${timestamp} - ${message}`;
});

const printLogFormat = {
  file: combine(
    label({
      label: "backend",
    }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:dd",
    }),
    printFormat
  ),
  console: combine(colorize(), simple()),
};

const opts = {
  file: new transports.DailyRotateFile({
    dirname: __dirname + "/../../logs",
    filename: "%DATE%-access.log",
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "info",
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    level: "debug",
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [opts.file],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(opts.console);
}

module.exports = logger;
