const { KILOMETERS } = require("./constants");
const Metric = require("./metric");

describe("Metric", () => {
  it(`should return correct values`, () => {
    const metric = new Metric(KILOMETERS.multiplier, KILOMETERS.abbreviation);

    expect(metric.getMultiplier()).toEqual(KILOMETERS.multiplier);
    expect(metric.getAbbreviation()).toEqual(KILOMETERS.abbreviation);
  });
});
