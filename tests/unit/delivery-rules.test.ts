import { describe, expect, it } from "vitest";

import { isWithinOpeningHours, meetsMinimumOrder } from "@/server/domain/delivery/rules";

describe("delivery rules", () => {
  it("supports regular opening hours", () => {
    const rule = { dayOfWeek: 1, opensAt: "11:00", closesAt: "23:00", isClosed: false };

    expect(isWithinOpeningHours(rule, "11:00")).toBe(true);
    expect(isWithinOpeningHours(rule, "23:30")).toBe(false);
  });

  it("supports opening hours that cross midnight", () => {
    const rule = { dayOfWeek: 1, opensAt: "22:00", closesAt: "02:00", isClosed: false };

    expect(isWithinOpeningHours(rule, "23:30")).toBe(true);
    expect(isWithinOpeningHours(rule, "01:30")).toBe(true);
    expect(isWithinOpeningHours(rule, "12:00")).toBe(false);
  });

  it("checks minimum order values in minor units", () => {
    expect(meetsMinimumOrder(1200, 1000)).toBe(true);
    expect(meetsMinimumOrder(900, 1000)).toBe(false);
  });
});
