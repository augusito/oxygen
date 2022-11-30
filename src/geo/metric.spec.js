const { KILOMETERS, MILES, NEUTRAL } = require("./constants");
const Metric = require("./metric");

describe("Metric", () => {
  it(`should return correct values`, () => {
    const neMetric = new Metric();
    const kmMetric = new Metric(KILOMETERS.multiplier, KILOMETERS.abbreviation);
    const miMetric = new Metric(MILES.multiplier, MILES.abbreviation);

    expect(neMetric.getMultiplier()).toEqual(NEUTRAL.multiplier);
    expect(neMetric.getAbbreviation()).toEqual(NEUTRAL.abbreviation);
    expect(kmMetric.getMultiplier()).toEqual(KILOMETERS.multiplier);
    expect(kmMetric.getAbbreviation()).toEqual(KILOMETERS.abbreviation);
    expect(miMetric.getMultiplier()).toEqual(MILES.multiplier);
    expect(miMetric.getAbbreviation()).toEqual(MILES.abbreviation);
  });
});
