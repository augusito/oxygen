const hydrate = (data, object) => {
  object.fromJSON(data);
  return object;
};

module.exports = { hydrate };
