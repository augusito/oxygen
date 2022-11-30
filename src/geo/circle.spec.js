const Circle = require("./circle");
const { NEUTRAL } = require("./constants");
const Distance = require("./distance");
const Metric = require("./metric");
const Point = require("./point");

describe("Circle", () => {
  it(`should return correct values`, () => {
    const metric = new Metric(NEUTRAL.multiplier, NEUTRAL.abbreviation);
    const radius = new Distance(1, metric);
    const center = new Point(1, 1);
    const circle = new Circle(center, radius);

    expect(circle.getCenter()).toEqual(center);
    expect(circle.getRadius()).toEqual(radius);
  });
});
