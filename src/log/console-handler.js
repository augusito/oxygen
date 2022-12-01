const { blue, yellow, red, bold } = require("@hemjs/color");
const BaseHandler = require("./base-handler");
const { LogLevels } = require("./constants");

class ConsoleHandler extends BaseHandler {
  format1(logRecord) {
    let msg = super.format(logRecord);

    switch (logRecord.level) {
      case LogLevels.DEBUG:
        msg = blue(msg);
        break;
      case LogLevels.INFO:
        msg = blue(msg);
        break;
      case LogLevels.WARNING:
        msg = yellow(msg);
        break;
      case LogLevels.ERROR:
        msg = red(msg);
        break;
      case LogLevels.CRITICAL:
        msg = bold(red(msg));
        break;
      default:
        break;
    }

    return msg;
  }

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
        switch (logRecord.level) {
          case LogLevels.INFO:
            value = blue(value);
            break;
          case LogLevels.WARNING:
            value = yellow(value);
            break;
          case LogLevels.ERROR:
            value = red(value);
            break;
          case LogLevels.CRITICAL:
            value = bold(red(value));
            break;
          default:
            break;
        }
      }

      return String(value);
    });
  }

  log(msg) {
    console.log(msg);
  }
}

module.exports = ConsoleHandler;
