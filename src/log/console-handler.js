const { blue, yellow, red, bold } = require("@hemjs/color");
const BaseHandler = require("./base-handler");
const { LogLevels } = require("./constants");

class ConsoleHandler extends BaseHandler {
  format(logRecord) {
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

  log(msg) {
    console.log(msg);
  }
}

module.exports = ConsoleHandler;
