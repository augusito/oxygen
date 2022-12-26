const { createQueue } = require("../common/queue");
const { bindProcessor } = require("../common/utils");
const TaskProcessor = require("./task.processor");

const taskQueue = createQueue({
  processors: bindProcessor(new TaskProcessor()),
});

module.exports = { taskQueue };
