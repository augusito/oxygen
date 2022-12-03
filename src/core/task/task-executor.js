const FailureHandler = require("./failure-handler");

const DEFAULT_TEARDOWN = () => process.exit(1);

/**
 * Simple task executor that abstracts the execution of a callback.
 */
class TaskExecutor {
  static failureHandler = new FailureHandler();
  /**
   * Eexute the given task.
   *
   * @param task the callback to execute
   * @param teardown the failure teardown
   */
  static execute(task, teardown = DEFAULT_TEARDOWN) {
    try {
      task();
    } catch (e) {
      this.failureHandler.handle(e);
      teardown(e);
    }
  }
}

module.exports = TaskExecutor;
