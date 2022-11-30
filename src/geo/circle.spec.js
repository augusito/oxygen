const Circle = require("./circle");
const Distance = require("./distance");
const Point = require("./point");

describe("Circle", () => {
  it(`should return correct values`, () => {
    const radius = new Distance(1);
    const center = new Point(1, 1);
    const circle = new Circle(center, radius);

    expect(circle.getCenter()).toEqual(center);
    expect(circle.getRadius()).toEqual(radius);
  });
});
