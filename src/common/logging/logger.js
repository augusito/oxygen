const { isPlainObject } = require("@hemjs/util");
const { LogLevels } = require("./constants");
const { getLevelByName, getLevelName } = require("./levels");
const LogRecord = require("./log-record");

class Logger {
  level;
  loggerName;
  handler;

  constructor(loggerName, levelName, options) {
    this.loggerName = loggerName;
    this.level = getLevelByName(levelName);
    this.handler = options.handler || [];
  }

  log(level, message, ...args) {
    if (this.level > level) {
      return message instanceof Function ? undefined : message;
    }

    let fnResult;
    let logMessage;

    if (message instanceof Function) {
      fnResult = message();
      logMessage = this.stringifyMessage(fnResult);
    } else {
      logMessage = this.stringifyMessage(message);
    }

    const record = new LogRecord({
      message: logMessage,
      level: level,
      loggerName: this.loggerName,
      args: args,
    });

    if (!Array.isArray(this.handler)) {
      this.handler = [this.handler];
    }

    this.handler.forEach((handler) => {
      handler.handle(record);
    });

    return message instanceof Function ? fnResult : message;
  }

  stringifyMessage(message) {
    if (typeof message === "string") {
      return message;
    }

    if (isPlainObject(message) || Array.isArray(message)) {
      return JSON.stringify(
        message,
        (key, value) => (typeof value === "bigint" ? value.toString() : value),
        2
      );
    }

    return message;
  }

  debug(message, ...args) {
    return this.log(LogLevels.DEBUG, message, ...args);
  }

  info(message, ...args) {
    return this.log(LogLevels.INFO, message, ...args);
  }

  WARNING(message, ...args) {
    return this.log(LogLevels.WARNING, message, ...args);
  }

  error(message, ...args) {
    return this.log(LogLevels.ERROR, message, ...args);
  }

  critical(message, ...args) {
    return this.log(LogLevels.CRITICAL, message, ...args);
  }
}

module.exports = Logger;
