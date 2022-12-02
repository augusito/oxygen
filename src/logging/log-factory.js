const ConsoleHandler = require("./console-handler");
const Logger = require("./logger");

class LogFactory {
  static getLog(loggerName = "default") {
    return new Logger(loggerName, "NOTSET", new ConsoleHandler("NOTSET"));
  }
}

module.exports = LogFactory;
