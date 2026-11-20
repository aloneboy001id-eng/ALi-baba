import { describe, expect, it } from "vitest";

import { canTransitionOrderStatus } from "@/server/domain/orders/status";

describe("order status transitions", () => {
  it("allows restaurant acceptance from pending confirmation", () => {
    expect(canTransitionOrderStatus("pending_confirmation", "confirmed")).toBe(true);
  });

  it("rejects skipping preparation states", () => {
    expect(canTransitionOrderStatus("confirmed", "completed")).toBe(false);
  });
});
