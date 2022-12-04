const { LogLevels } = require("./constants");
const LogRecord = require("./log-record");
const { getLevelByName, getLevelName, toString } = require("./utils");

class Logger {
  level;
  handler;
  loggerName;

  constructor(loggerName, levelName, handler) {
    this.loggerName = loggerName;
    this.level = getLevelByName(levelName);
    this.handler = handler;
  }

  getLevel() {
    return this.level;
  }

  setLevel(level) {
    this.level = level;
  }

  getLevelName() {
    return getLevelName(this.level);
  }

  setLevelName(levelName) {
    this.level = getLevelByName(levelName);
  }

  getLoggerName() {
    return this.loggerName;
  }

  setLoggerName(loggerName) {
    loggerName = loggerName;
  }

  setHandler(handler) {
    this.handler = handler;
  }

  getHandler() {
    this.handler;
  }

  log(level, message, ...args) {
    if (this.level > level) {
      return message instanceof Function ? undefined : message;
    }

    let fnResult;
    let logMessage;

    if (message instanceof Function) {
      fnResult = message();
      logMessage = toString(fnResult);
    } else {
      logMessage = toString(message);
    }

    const record = new LogRecord({
      message: logMessage,
      args: args,
      level: level,
      loggerName: this.loggerName,
    });

    if (!Array.isArray(this.handler)) {
      this.handler = [this.handler];
    }

    this.handler.forEach((handler) => {
      handler.handle(record);
    });

    return message instanceof Function ? fnResult : message;
  }

  trace(message, ...args) {
    return this.log(LogLevels.TRACE, message, ...args);
  }

  debug(message, ...args) {
    return this.log(LogLevels.DEBUG, message, ...args);
  }

  info(message, ...args) {
    return this.log(LogLevels.INFO, message, ...args);
  }

  warn(message, ...args) {
    return this.log(LogLevels.WARN, message, ...args);
  }

  error(message, ...args) {
    return this.log(LogLevels.ERROR, message, ...args);
  }

  fatal(message, ...args) {
    return this.log(LogLevels.FATAL, message, ...args);
  }
}

module.exports = Logger;
