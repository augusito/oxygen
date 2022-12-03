const LogFactory = require("../../logging/log-factory");

/**
 * Strategy fo handling a failure that occurs whn executing a task.
 */
class FailureHandler {
  static logger = LogFactory.getLog(FailureHandler.name);

  /**
   * Handle the failure that occured when executing a task.
   *
   * @param failure the failure that occured
   */
  handle(failure) {
    FailureHandler.logger.error(failure);
  }
}

module.exports = FailureHandler;
