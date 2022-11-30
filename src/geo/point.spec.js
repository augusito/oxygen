const Point = require("./point");

describe("Point", () => {
  it(`should return correct values`, () => {
    const point = new Point(1.5, 1.5);

    expect(point.getX()).toEqual(1.5);
    expect(point.getY()).toEqual(1.5);
  });
});
