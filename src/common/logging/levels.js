const { LogLevels } = require("./constants");

const LogLevelNames = Object.keys(LogLevels).filter((key) =>
  isNaN(Number(key))
);

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

module.exports = { getLevelByName, getLevelName, LogLevelNames };
