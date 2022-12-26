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

const isEmpty = (value) => {
  if (value instanceof Array) {
    value = value.filter((val) => !isEmpty(val));
    return value.length === 0;
  }

  if (value && typeof value === "object") {
    for (const key in value) {
      if (
        value[key] === null ||
        value[key] === undefined ||
        value[key] === ""
      ) {
        delete value[key];
      }
    }
    return Object.keys(value).length === 0;
  }

  if (typeof value === "string") {
    return value.trim().length === 0;
  }

  return (
    !value ||
    `${value}`.toLocaleLowerCase() === "null" ||
    `${value}`.toLocaleLowerCase() === "undefined"
  );
};

const bindHandler = (...args) => {
  return args.map((arg) => {
    return arg.handle.bind(arg);
  });
};

const bindProcessor = (...args) => {
  return args.map((arg) => {
    return arg.process.bind(arg);
  });
};

module.exports = { toString, isEmpty, bindHandler, bindProcessor };
