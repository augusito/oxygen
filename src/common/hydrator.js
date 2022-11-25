class Hydrator {
  static hydrate(data, object) {
    if (!isFunction(object?.fromJSON)) {
      const obj = toString(object);
      throw new Error(
        `${obj} expects the provided object to implement fromJSON()`
      );
    }

    object.fromJSON(data);
    return object;
  }
}

module.exports = Hydrator;
