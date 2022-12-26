const LogLevels = {
  NOTSET: 0,
  DEBUG: 10,
  INFO: 20,
  WARNING: 30,
  ERROR: 40,
  CRITICAL: 50,
};

const DEFAULT_FORMATTER = "{datetime} {levelName} {pid} {loggerName} {message}";

module.exports = { LogLevels, DEFAULT_FORMATTER };
