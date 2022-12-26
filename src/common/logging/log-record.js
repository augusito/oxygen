const { getLevelName } = require("./levels");

class LogRecord {
  level;
  levelName;
  loggerName;
  args;
  datetime;
  pid;

  constructor(options) {
    this.message = options.message;
    this.level = options.level;
    this.levelName = getLevelName(options.level);
    this.loggerName = options.loggerName;
    this.args = [...options.args];
    this.datetime = new Date();
    this.pid = process.pid;
  }
}

module.exports = LogRecord;
