/**
 * Represents a geospatial circle value
 */
class Circle {
  center;
  radius;

  /**
   * Creates a new Circle from the given Point and radius.
   *
   * @param center
   * @param radius
   */
  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }

  /**
   * Returns the center of the Circle.
   *
   * @returns
   */
  getCenter() {
    return this.center;
  }

  /**
   * Returns the radius of the Circle.
   *
   * @returns
   */
  getRadius() {
    return this.radius;
  }
}

module.exports = Circle;
