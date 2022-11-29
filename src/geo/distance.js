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
    this.metric = metric;
  }

  /**
   * Returns the normalized value regarding the underlying Metric.
   *
   * @return
   */
  getNormalizedValue() {
    return value / metric.getMultiplier();
  }

  /**
   * Returns a string representation of the unit the distance is in.
   *
   * @returns
   */
  getUnit() {
    return metric.getAbbreviation();
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
