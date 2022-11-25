const bindHandler = (...args) => {
  return args.map((arg) => {
    return arg.handle.bind(arg);
  });
};

const toString = (value) => {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return "[" + value.map(toString).join(", ") + "]";
  }

  if (value == null) {
    return "" + value;
  }

  if (value.name) {
    return `${value.name}`;
  }

  const result = value.toString();

  if (result == null) {
    return "" + result;
  }

  const newLineIndex = result.indexOf("\n");
  return newLineIndex === -1 ? result : result.substring(0, newLineIndex);
};

module.exports = { bindHandler, toString };
