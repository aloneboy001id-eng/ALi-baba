import "server-only";

import type { OrderCreationInput } from "@/lib/validation/order-schemas";

export type CreateOrderResult = {
  orderId: string;
  status: "pending_confirmation";
  totalMinor: number;
};

export interface OrderService {
  createOrder(input: OrderCreationInput): Promise<CreateOrderResult>;
}

// The concrete implementation belongs here once repositories and transactions are wired.
// It must re-read products/options and calculate every total on the server.
export function createOrderService(): OrderService {
  throw new Error("Order service is not implemented yet.");
}
