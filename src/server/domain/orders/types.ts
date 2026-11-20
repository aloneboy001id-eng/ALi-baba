export const orderStatuses = [
  "pending_confirmation",
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "completed",
  "cancelled",
  "rejected",
] as const;

export type OrderStatus = (typeof orderStatuses)[number];
