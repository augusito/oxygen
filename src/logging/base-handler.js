const { DEFAULT_FORMATTER } = require("./constants");
const { getLevelByName } = require("./utils");

class BaseHandler {
  level;
  levelName;
  formatter;

  constructor(levelName, options = {}) {
    this.level = getLevelByName(levelName);
    this.levelName = levelName;

    this.formatter = options.formatter || DEFAULT_FORMATTER;
  }

  handle(logRecord) {
    if (this.level > logRecord.level) return;

    const message = this.format(logRecord);
    return this.log(message, this.level);
  }

  format(logRecord) {
    if (this.formatter instanceof Function) {
      return this.formatter(logRecord);
    }

    return this.formatter.replace(/{([^\s}]+)}/g, (match, p1) => {
      const value = logRecord[p1];

      // do not interpolate missing values
      if (value == null) {
        return match;
      }

      return String(value);
    });
  }

  log(message, level) {}
  setup() {}
  destroy() {}
}

module.exports = BaseHandler;
