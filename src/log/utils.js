const { LogLevels } = require("./constants");

const byLevel = {
  [String(LogLevels.NOTSET)]: "NOTSET",
  [String(LogLevels.DEBUG)]: "DEBUG",
  [String(LogLevels.INFO)]: "INFO",
  [String(LogLevels.WARNING)]: "WARNING",
  [String(LogLevels.ERROR)]: "ERROR",
  [String(LogLevels.CRITICAL)]: "CRITICAL",
};

const getLevelByName = (name) => {
  switch (name) {
    case "NOTSET":
      return LogLevels.NOTSET;
    case "DEBUG":
      return LogLevels.DEBUG;
    case "INFO":
      return LogLevels.INFO;
    case "WARNING":
      return LogLevels.WARNING;
    case "ERROR":
      return LogLevels.ERROR;
    case "CRITICAL":
      return LogLevels.CRITICAL;
    default:
      return LogLevels.NOTSET;
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
