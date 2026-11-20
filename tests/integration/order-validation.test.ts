import { describe, expect, it } from "vitest";

import { orderCreationSchema } from "@/lib/validation/order-schemas";

describe("order request boundary", () => {
  it("rejects duplicate option values and unsafe quantities", () => {
    const result = orderCreationSchema.safeParse({
      idempotencyKey: "checkout-request-123456",
      customerName: "Test Customer",
      customerPhone: "+441234567890",
      customerAddress: "1 Test Street",
      deliveryAreaId: "00000000-0000-0000-0000-000000000005",
      items: [
        {
          productId: "00000000-0000-0000-0000-000000000002",
          quantity: 21,
          optionValueIds: [
            "00000000-0000-0000-0000-000000000004",
            "00000000-0000-0000-0000-000000000004",
          ],
        },
      ],
    });

    expect(result.success).toBe(false);
  });
});
