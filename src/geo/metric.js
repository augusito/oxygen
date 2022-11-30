const { NEUTRAL } = require("./constants");

/**
 * Metric that can be applied to a base sacle.
 */
class Metric {
  multiplier;
  abbreviation;

  /**
   * Creates a new Metric using the given multiplier.
   *
   * @param multiplier the earth radius at equator
   * @param abbreviation the abbreviation to use for this Metric
   */
  constructor(multiplier, abbreviation) {
    this.multiplier = multiplier || NEUTRAL.multiplier;
    this.abbreviation = abbreviation || NEUTRAL.abbreviation;
  }

  /**
   * Returns the multiplier to calculate metric value from a base scale.
   *
   * @returns
   */
  getMultiplier() {
    return this.multiplier;
  }

  /**
   * Returns the scientific abbreviation of the unit the Metric is in.
   *
   * @returns
   */
  getAbbreviation() {
    return this.abbreviation;
  }
}

module.exports = Metric;
