const { getLevelName } = require("./utils");

class LogRecord {
  msg;
  args;
  datetime;
  level;
  levelName;
  loggerName;

  constructor(options) {
    this.msg = options.msg;
    this.args = [...options.args];
    this.level = options.level;
    this.loggerName = options.loggerName;
    this.datetime = new Date();
    this.levelName = getLevelName(options.level);
  }

  getArgs() {
    return [...this.args];
  }

  getDatetime() {
    return new Date(this.datetime.getTime());
  }
}

module.exports = LogRecord;
