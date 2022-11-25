const { isFunction } = require("@hemjs/util");
const { toString } = require("./utils");

class Hydrator {
  static extract(object) {
    if (!isFunction(object?.toJSON)) {
      const obj = toString(object);
      throw new Error(
        `${obj} expects the provided object to implement toJSON()`
      );
    }

    const data = object.toJSON();
    return data;
  }

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
