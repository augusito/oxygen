const color = require("@hemjs/color");
const BaseHandler = require("./base-handler");
const { LogLevels } = require("./constants");
const { toString } = require("./utils");

class ConsoleHandler extends BaseHandler {
  format(logRecord) {
    if (this.formatter instanceof Function) {
      return this.formatter(logRecord);
    }

    return `${this.formatMessage(logRecord)}\n`;
  }

  log(msg, level) {
    process[this.getWriteStreamType(level)].write(msg);
  }

  formatMessage(logRecord) {
    return this.formatter.replace(/{([^\s}]+)}/g, (match, p1) => {
      let value = logRecord[p1];

      // do not interpolate missing values
      if (value == null) {
        return match;
      }

      if (p1 === "levelName") {
        value = this.formattedLevelName(value, logRecord.level);
      } else if (p1 === "datetime") {
        value = this.formatTimestamp(value);
      } else if (p1 === "loggerName") {
        value = this.formatLoggerName(value, 20);
      } else if (p1 === "pid") {
        value = this.formatPid(value);
      } else if (p1 === "threadName") {
        value = this.formatThreadName(value);
      }

      return String(value);
    });
  }

  formatTimestamp(value) {
    return color.dim(this.getTimestamp(value));
  }

  formatThreadName(value) {
    return color.dim(this.getThreadName(value));
  }

  formatPid(value) {
    return `${color.magenta(toString(value))}`;
  }

  formattedLevelName(msg, logLevel) {
    return this.colorize(msg.padStart(7, " "), logLevel);
  }

  formatLoggerName(loggerName, maxLength) {
    loggerName = loggerName.padEnd(maxLength, " ");

    if (loggerName.length > maxLength) {
      loggerName = loggerName.slice(1 - maxLength).padStart(maxLength, "~");
    }

    loggerName = color.cyan(loggerName);

    return `${loggerName} :`;
  }

  colorize(msg, logLevel) {
    const color = this.getColorByLogLevel(logLevel);
    return color(msg);
  }

  getTimestamp(value) {
    return new Date(value).toISOString().replace("T", " ").substring(0, 23);
  }

  getThreadName(value) {
    return `--- [${value.padStart(7, " ")}]`;
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
      case LogLevels.DEBUG:
        return color.blue;
      default:
        return color.green;
    }
  }
}

module.exports = ConsoleHandler;
