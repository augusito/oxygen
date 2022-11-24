const { isFunction, isNull } = require("@hemjs/util");
const { omit } = require("@hemjs/util/object");

class Pageable {
  model;
  options;

  constructor(model, options = {}) {
    if (isNull(model)) {
      throw new Error("Model must not be null");
    }

    this.model = model;
    this.options = options;
  }

  getModel() {
    return this.model;
  }

  getOptions() {
    return this.options;
  }

  async getItems() {
    if (!isFunction(this.model?.count)) {
      const object = this.toString(this.model);
      throw new Error(
        `${object} expects the provided model to implement count()`
      );
    }

    if (!isFunction(this.model?.findAll)) {
      const object = this.toString(this.model);
      throw new Error(
        `${object} expects the provided model to implement findAll()`
      );
    }

    const countOptions = omit(this.options, [
      "limit",
      "offset",
      "order",
      "attributes",
      "include",
    ]);

    const [count, rows] = await Promise.all([
      this.model.count(countOptions),
      this.model.findAll(this.options),
    ]);

    return {
      count,
      rows: count === 0 ? [] : rows,
    };
  }

  toString(value) {
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
  }
}

module.exports = Pageable;
