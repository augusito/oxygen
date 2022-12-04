const { getLevelName } = require("./utils");

class LogRecord {
  pid;
  args;
  message;
  datetime;
  level;
  levelName;
  loggerName;
  threadName;

  constructor(options) {
    this.pid = process.pid;
    this.args = [...options.args];
    this.message = options.message;
    this.level = options.level;
    this.loggerName = options.loggerName;
    this.datetime = new Date();
    this.levelName = getLevelName(options.level);
    this.threadName = options.threadName || "main";
  }

  getArgs() {
    return [...this.args];
  }

  getDatetime() {
    return new Date(this.datetime.getTime());
  }
}

module.exports = LogRecord;
