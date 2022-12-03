const { LogLevels } = require("./constants");

const byLevel = {
  [String(LogLevels.OFF)]: "OFF",
  [String(LogLevels.TRACE)]: "TRACE",
  [String(LogLevels.DEBUG)]: "DEBUG",
  [String(LogLevels.INFO)]: "INFO",
  [String(LogLevels.WARN)]: "WARN",
  [String(LogLevels.ERROR)]: "ERROR",
  [String(LogLevels.FATAL)]: "FATAL",
};

const getLevelByName = (name) => {
  switch (name) {
    case "OFF":
      return LogLevels.OFF;
    case "TRACE":
      return LogLevels.TRACE;
    case "DEBUG":
      return LogLevels.DEBUG;
    case "INFO":
      return LogLevels.INFO;
    case "WARN":
      return LogLevels.WARN;
    case "ERROR":
      return LogLevels.ERROR;
    case "FATAL":
      return LogLevels.FATAL;
    default:
      throw new Error(`no log level found for "${name}"`);
  }
};

const getLevelName = (level) => {
  const levelName = byLevel[level];
  if (levelName) {
    return levelName;
  }
  throw new Error(`no level name found for level: ${level}`);
};

const LogLevelNames = Object.keys(LogLevels).filter((key) =>
  isNaN(Number(key))
);

const toString = (data) => {
  if (typeof data === "string") {
    return data;
  } else if (
    data === null ||
    typeof data === "number" ||
    typeof data === "bigint" ||
    typeof data === "boolean" ||
    typeof data === "undefined" ||
    typeof data === "symbol"
  ) {
    return String(data);
  } else if (data instanceof Error) {
    return data.stack;
  } else if (typeof data === "object") {
    return JSON.stringify(data);
  }
  return "undefined";
};

module.exports = { getLevelByName, getLevelName, LogLevelNames, toString };
