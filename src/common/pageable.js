const { isFunction, isNull } = require("@hemjs/util");
const { omit } = require("@hemjs/util/object");
const { toString } = require("./utils");

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
      const object = toString(this.model);
      throw new Error(
        `${object} expects the provided model to implement count()`
      );
    }

    if (!isFunction(this.model?.findAll)) {
      const object = toString(this.model);
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
}

module.exports = Pageable;
