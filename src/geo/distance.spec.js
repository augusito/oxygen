const { KILOMETERS, MILES } = require("./constants");
const Distance = require("./distance");
const Metric = require("./metric");

const kmMetric = new Metric(KILOMETERS.multiplier, KILOMETERS.abbreviation);
const miMetric = new Metric(MILES.multiplier, MILES.abbreviation);

describe("Distance", () => {
  it(`should return correct values`, () => {
    const distance = new Distance(1.5, kmMetric);

    expect(distance.getNormalizedValue()).toEqual(
      1.5 / kmMetric.getMultiplier()
    );
    expect(distance.getUnit()).toEqual(kmMetric.getAbbreviation());
    expect(distance.getValue()).toEqual(1.5);
    expect(distance.getMetric().getMultiplier()).toEqual(
      kmMetric.getMultiplier()
    );
    expect(distance.getMetric().getAbbreviation()).toEqual(
      kmMetric.getAbbreviation()
    );
  });

  it(`should add given distance to current one`, () => {
    const left = new Distance(2.5, kmMetric);
    const right = new Distance(2.5, kmMetric);

    expect(left.add(right).getValue()).toEqual(
      new Distance(5, kmMetric).getValue()
    );
  });

  it(`should convert distance to the given Metric`, () => {
    expect(
      new Distance(10, kmMetric).in(miMetric).getNormalizedValue()
    ).toBeCloseTo(new Distance(6.21371192, miMetric).getNormalizedValue());
  });
});
