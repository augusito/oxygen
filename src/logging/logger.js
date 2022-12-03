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

  log(level, msg, ...args) {
    if (this.level > level) {
      return msg instanceof Function ? undefined : msg;
    }

    let fnResult;
    let logMessage;

    if (msg instanceof Function) {
      fnResult = msg();
      logMessage = toString(fnResult);
    } else {
      logMessage = toString(msg);
    }

    const record = new LogRecord({
      msg: logMessage,
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

    return msg instanceof Function ? fnResult : msg;
  }

  trace(msg, ...args) {
    return this.log(LogLevels.TRACE, msg, ...args);
  }

  debug(msg, ...args) {
    return this.log(LogLevels.DEBUG, msg, ...args);
  }

  info(msg, ...args) {
    return this.log(LogLevels.INFO, msg, ...args);
  }

  warn(msg, ...args) {
    return this.log(LogLevels.WARN, msg, ...args);
  }

  error(msg, ...args) {
    return this.log(LogLevels.ERROR, msg, ...args);
  }

  fatal(msg, ...args) {
    return this.log(LogLevels.FATAL, msg, ...args);
  }
}

module.exports = Logger;
