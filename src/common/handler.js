const bindHandler = (...args) => {
  return args.map((arg) => {
    return arg.handle.bind(arg);
  });
};

module.exports = { bindHandler };
