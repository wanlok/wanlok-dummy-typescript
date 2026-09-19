import { formatPercentage } from "./formatPercentage";

describe(formatPercentage.name, () => {
  it("", () => {
    expect(formatPercentage(0.01)).toBe("1%");
    expect(formatPercentage(0.012)).toBe("1.2%");
    expect(formatPercentage(0.001)).toBe("0.1%");
    expect(formatPercentage(0.0001)).toBe("0.01%");
    expect(formatPercentage(0.00001)).toBe("0%");
    expect(formatPercentage(0.02)).toBe("2%");
    expect(formatPercentage(0.0234)).toBe("2.34%");
    expect(formatPercentage(0.0235)).toBe("2.35%");
    expect(formatPercentage(0.002)).toBe("0.2%");
    expect(formatPercentage(0.0002)).toBe("0.02%");
  });
});
