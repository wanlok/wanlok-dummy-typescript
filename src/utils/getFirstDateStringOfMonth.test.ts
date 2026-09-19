import { getFirstDateStringOfMonth } from "./getFirstDateStringOfMonth";

describe(getFirstDateStringOfMonth.name, () => {
  it("should return the first date of the month for a given date string", () => {
    expect(getFirstDateStringOfMonth("2026-01-01")).toBe("2026-01-01");
    expect(getFirstDateStringOfMonth("2026-12-31")).toBe("2026-12-01");
    expect(getFirstDateStringOfMonth("2026-03-15")).toBe("2026-03-01");
    expect(getFirstDateStringOfMonth("2024-02-29")).toBe("2024-02-01");
    expect(getFirstDateStringOfMonth("2025-02-29")).toBe("2025-03-01");
    expect(getFirstDateStringOfMonth("2026-02-29")).toBe("2026-03-01");
    expect(getFirstDateStringOfMonth("")).toBe(null);
    expect(getFirstDateStringOfMonth("2026-03-32")).toBe(null);
    expect(getFirstDateStringOfMonth("invalid")).toBe(null);
  });
});
