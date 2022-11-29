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
    this.multiplier = multiplier;
    this.abbreviation = abbreviation;
  }

  /**
   * Returns the multiplier to calculate metric value from a base scale.
   *
   * @returns
   */
  getMultiplier() {
    return multiplier;
  }

  /**
   * Returns the scientific abbreviation of the unit the Metric is in.
   *
   * @returns
   */
  getAbbreviation() {
    return abbreviation;
  }
}
