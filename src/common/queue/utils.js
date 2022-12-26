function isAdvancedProcessor(processor) {
  return (
    "object" === typeof processor &&
    !!processor.callback &&
    isProcessorCallback(processor.callback)
  );
}

function isAdvancedSeparateProcessor(processor) {
  return (
    "object" === typeof processor &&
    !!processor.path &&
    isSeparateProcessor(processor.path)
  );
}

function isProcessorCallback(processor) {
  return "function" === typeof processor;
}

function isSeparateProcessor(processor) {
  return "string" === typeof processor;
}

module.exports = {
  isAdvancedProcessor,
  isAdvancedSeparateProcessor,
  isProcessorCallback,
  isSeparateProcessor,
};
