const { getLevelName } = require("./utils");

class LogRecord {
  msg;
  pid;
  args;
  datetime;
  level;
  levelName;
  loggerName;
  threadName;

  constructor(options) {
    this.msg = options.msg;
    this.pid = process.pid;
    this.args = [...options.args];
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
