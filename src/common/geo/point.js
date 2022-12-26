/**
 * Represents a geospatial point value.
 */
class Point {
  x;
  y;

  /**
   * Creates a Point from the given x, y coordinate.
   * @param x
   * @param y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns the x-coordinate of the Point.
   *
   * @returns
   */
  getX() {
    return this.x;
  }

  /**
   * Returns the y-coordinate of the Point.
   *
   * @returns
   */
  getY() {
    return this.y;
  }
}

module.exports = Point;
