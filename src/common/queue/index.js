const Bull = require("bull");
const {
  isAdvancedProcessor,
  isAdvancedSeparateProcessor,
  isSeparateProcessor,
  isProcessorCallback,
} = require("./utils");

function createQueue(options) {
  const queueName = options.name ?? "default";

  const queue = options?.url
    ? new Bull(queueName, options.url, options)
    : new Bull(queueName, options);

  if (options.processors) {
    options.processors.forEach((processor) => {
      let args = [];

      if (isAdvancedProcessor(processor)) {
        args.push(processor.name, processor.concurrency, processor.callback);
      } else if (isAdvancedSeparateProcessor(processor)) {
        args.push(processor.name, processor.concurrency, processor.path);
      } else if (isSeparateProcessor(processor)) {
        args.push(processor);
      } else if (isProcessorCallback(processor)) {
        args.push(processor);
      }

      args = args.filter((arg) => typeof arg !== "undefined");
      queue.process.call(queue, ...args);
    });
  }

  queue.onApplicationShutdown = function () {
    return this.close();
  };

  return queue;
}

module.exports = { createQueue };
