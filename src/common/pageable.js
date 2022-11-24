const { omit } = require("@hemjs/util/object");

const pageable = async (model, options) => {
  const countOptions = omit(options, [
    "limit",
    "offset",
    "order",
    "attributes",
    "include",
  ]);

  const [count, rows] = await Promise.all([
    model.count(countOptions),
    model.findAll(options),
  ]);

  return {
    count,
    rows: count === 0 ? [] : rows,
  };
};

module.exports = { pageable };
