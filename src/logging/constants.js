const LogLevels = {
  OFF: 0,
  TRACE: 10,
  DEBUG: 20,
  INFO: 30,
  WARN: 40,
  ERROR: 50,
  FATAL: 60,
};

const DEFAULT_FORMATTER =
  "{datetime} {levelName} {pid} {threadName} {loggerName} {msg}";

module.exports = { LogLevels, DEFAULT_FORMATTER };
