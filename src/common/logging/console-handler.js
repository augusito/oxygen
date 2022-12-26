const color = require("@hemjs/color");
const BaseHandler = require("./base-handler");
const { LogLevels } = require("./constants");
const { toString } = require("./levels");

class ConsoleHandler extends BaseHandler {
  format(logRecord) {
    if (this.formatter instanceof Function) {
      return this.formatter(logRecord);
    }

    return this.formatter.replace(/{([^\s}]+)}/g, (match, p1) => {
      let value = logRecord[p1];

      // do not interpolate missing values
      if (value == null) {
        return match;
      }

      if (p1 === "levelName") {
        value = this.formattedLevelName(value, logRecord.level);
      } else if (p1 === "loggerName") {
        value = this.formatLoggerName(value, 32);
      } else if (p1 === "datetime") {
        value = this.formatTimestamp(value);
      } else if (p1 === "pid") {
        value = this.formatPid(value);
      }

      return String(value);
    });
  }

  log(message, level) {
    process[this.getWriteStreamType(level)].write(message + "\n");
  }

  formatPid(pid) {
    return color.dim(`(${pid})`);
  }

  formatTimestamp(value) {
    return color.dim(`[${this.getTimestamp(value)}]`);
  }

  formattedLevelName(value, logLevel) {
    return this.colorize(value.padStart(8, " "), logLevel);
  }

  formatLoggerName(loggerName, maxLength) {
    if (loggerName.length > maxLength) {
      loggerName = loggerName.slice(1 - maxLength).padStart(maxLength, "~");
    }

    return `${color.cyan(loggerName)}:`;
  }

  colorize(value, logLevel) {
    return this.getColorByLogLevel(logLevel)(value);
  }

  getTimestamp(value) {
    return new Date(value).toISOString();
  }

  getWriteStreamType(level) {
    switch (level) {
      case LogLevels.CRITICAL:
      case LogLevels.ERROR:
        return "stderr";
      default:
        return "stdout";
    }
  }

  getColorByLogLevel(level) {
    switch (level) {
      case LogLevels.CRITICAL:
      case LogLevels.ERROR:
        return color.red;
      case LogLevels.WARNING:
        return color.yellow;
      default:
        return color.green;
    }
  }
}

module.exports = ConsoleHandler;
