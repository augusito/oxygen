const Metric = require("./metric");

/**
 * Value object to represent distances in a given metric.
 */
class Distance {
  value;
  metric;

  /**
   * Creates a new Distance with the given Metric.
   *
   * @param value
   * @param metric
   */
  constructor(value, metric) {
    this.value = value;
    this.metric = metric || new Metric();
  }

  /**
   * Returns the normalized value regarding the underlying Metric.
   *
   * @return
   */
  getNormalizedValue() {
    return this.value / this.metric.getMultiplier();
  }

  /**
   * Returns a string representation of the unit the distance is in.
   *
   * @returns
   */
  getUnit() {
    return this.metric.getAbbreviation();
  }

  /**
   * Adds the given distance to the current one.
   *
   * @param other
   * @return
   */
  add(other) {
    const newNormalizedValue =
      this.getNormalizedValue() + other.getNormalizedValue();

    return new Distance(
      newNormalizedValue * this.metric.getMultiplier(),
      this.metric
    );
  }

  /**
   * Returns a new Distance in the given Metric.
   *
   * @param metric.
   * @return
   */
  in(metric) {
    return new Distance(
      this.getNormalizedValue() * metric.getMultiplier(),
      metric
    );
  }

  /**
   * Returns the value of the Distance.
   *
   * @returns
   */
  getValue() {
    return this.value;
  }

  /**
   * Returns the Metric of the Distance.
   *
   * @returns
   */
  getMetric() {
    return this.metric;
  }
}

module.exports = Distance;
