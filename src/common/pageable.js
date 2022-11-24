const { omit } = require("@hemjs/util/object");

class Pageable {
  model;
  options;

  constructor(model, options) {
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
