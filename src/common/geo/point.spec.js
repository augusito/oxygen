const Point = require("./point");

describe("Point", () => {
  it(`should return correct values`, () => {
    expect(new Point(1.5, 1.5)).toEqual(new Point(1.5, 1.5));
    expect(new Point(1.5, 1.5)).not.toEqual(new Point(2.0, 2.0));
    expect(new Point(2.0, 2.0)).not.toEqual(new Point(1.5, 1.5));
    expect(new Point(1.5, 1.5).getX()).toEqual(1.5);
    expect(new Point(1.5, 1.5).getY()).toEqual(1.5);
  });
});
