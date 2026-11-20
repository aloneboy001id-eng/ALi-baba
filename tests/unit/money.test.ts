import { describe, expect, it } from "vitest";

import { addMoney, multiplyMoney } from "@/server/domain/pricing/money";

describe("minor-unit money", () => {
  it("adds integer amounts without floating-point arithmetic", () => {
    expect(addMoney(1099, 250, 1)).toBe(1350);
  });

  it("multiplies only by non-negative integer quantities", () => {
    expect(multiplyMoney(799, 3)).toBe(2397);
    expect(() => multiplyMoney(799, 1.5)).toThrow();
  });
});
