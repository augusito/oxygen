const LogFactory = require("../common/logging/log-factory");

class TaskProcessor {
  logger = LogFactory.getLog(TaskProcessor.name);

  process(job, done) {
    this.logger.debug("Start task processing");
    this.logger.debug(job.data);
    this.logger.debug("Task processing completed");
  }
}

module.exports = TaskProcessor;
