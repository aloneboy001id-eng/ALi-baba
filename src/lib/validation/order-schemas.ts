import { z } from "zod";

const quantitySchema = z.number().int().min(1).max(20);

export const cartItemSchema = z
  .object({
    productId: z.string().uuid(),
    quantity: quantitySchema,
    optionValueIds: z.array(z.string().uuid()).max(20),
  })
  .superRefine((item, context) => {
    if (new Set(item.optionValueIds).size !== item.optionValueIds.length) {
      context.addIssue({
        code: "custom",
        path: ["optionValueIds"],
        message: "Option values must be unique.",
      });
    }
  });

export const orderCreationSchema = z.object({
  idempotencyKey: z.string().trim().min(16).max(128),
  customerName: z.string().trim().min(1).max(160),
  customerPhone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ()-]{7,32}$/, "Enter a valid phone number."),
  customerAddress: z.string().trim().min(5).max(500),
  deliveryAreaId: z.string().uuid(),
  notes: z.string().trim().max(1_000).optional(),
  items: z.array(cartItemSchema).min(1).max(50),
});

export const orderStatusUpdateSchema = z.object({
  orderId: z.string().uuid(),
  status: z.enum([
    "confirmed",
    "preparing",
    "ready",
    "out_for_delivery",
    "completed",
    "cancelled",
    "rejected",
  ]),
});

export type OrderCreationInput = z.infer<typeof orderCreationSchema>;
export type OrderStatusUpdateInput = z.infer<typeof orderStatusUpdateSchema>;
