const ConsoleHandler = require("./console-handler");
const Logger = require("./logger");

class LogFactory {
  static getLog(name = "default") {
    return new Logger(name, "NOTSET", {
      handler: new ConsoleHandler("NOTSET"),
    });
  }
}

module.exports = LogFactory;
