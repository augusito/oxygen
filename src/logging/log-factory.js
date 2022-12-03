const ConsoleHandler = require("./console-handler");
const Logger = require("./logger");

class LogFactory {
  static getLog(loggerName = "default") {
    return new Logger(loggerName, "OFF", new ConsoleHandler("OFF"));
  }
}

module.exports = LogFactory;
