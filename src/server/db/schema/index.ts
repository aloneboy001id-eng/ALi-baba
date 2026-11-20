import {
  boolean,
  check,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const userRole = pgEnum("user_role", ["staff", "manager"]);
export const orderStatus = pgEnum("order_status", [
  "pending_confirmation",
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "completed",
  "cancelled",
  "rejected",
]);
export const orderChannel = pgEnum("order_channel", ["website", "phone", "whatsapp"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: userRole("role").notNull().default("staff"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("sessions_user_id_idx").on(table.userId)],
);

export const menuCategories = pgTable("menu_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => menuCategories.id),
    name: varchar("name", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 160 }).notNull().unique(),
    description: text("description"),
    priceMinor: integer("price_minor").notNull(),
    currency: varchar("currency", { length: 3 }).notNull().default("GBP"),
    isAvailable: boolean("is_available").notNull().default(true),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("products_category_id_idx").on(table.categoryId),
    index("products_available_idx").on(table.isAvailable),
    check("products_price_non_negative", sql`${table.priceMinor} >= 0`),
  ],
);

export const productOptions = pgTable(
  "product_options",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 120 }).notNull(),
    isRequired: boolean("is_required").notNull().default(false),
    maxSelections: integer("max_selections").notNull().default(1),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [index("product_options_product_id_idx").on(table.productId)],
);

export const productOptionValues = pgTable(
  "product_option_values",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    optionId: uuid("option_id")
      .notNull()
      .references(() => productOptions.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 120 }).notNull(),
    priceDeltaMinor: integer("price_delta_minor").notNull().default(0),
    isAvailable: boolean("is_available").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => [
    unique("product_option_values_name_unique").on(table.optionId, table.name),
    index("product_option_values_option_id_idx").on(table.optionId),
  ],
);

export const deliveryAreas = pgTable("delivery_areas", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  postcodePrefix: varchar("postcode_prefix", { length: 16 }).notNull().unique(),
  deliveryFeeMinor: integer("delivery_fee_minor").notNull(),
  minimumOrderMinor: integer("minimum_order_minor").notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const deliveryRules = pgTable(
  "delivery_rules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    dayOfWeek: integer("day_of_week").notNull(),
    opensAt: varchar("opens_at", { length: 5 }).notNull(),
    closesAt: varchar("closes_at", { length: 5 }).notNull(),
    isClosed: boolean("is_closed").notNull().default(false),
  },
  (table) => [
    unique("delivery_rules_day_unique").on(table.dayOfWeek),
    check("delivery_rules_day_range", sql`${table.dayOfWeek} BETWEEN 0 AND 6`),
  ],
);

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    idempotencyKey: varchar("idempotency_key", { length: 128 }).notNull().unique(),
    status: orderStatus("status").notNull().default("pending_confirmation"),
    channel: orderChannel("channel").notNull().default("website"),
    customerName: varchar("customer_name", { length: 160 }).notNull(),
    customerPhone: varchar("customer_phone", { length: 32 }).notNull(),
    customerAddress: text("customer_address").notNull(),
    deliveryAreaId: uuid("delivery_area_id").references(() => deliveryAreas.id),
    subtotalMinor: integer("subtotal_minor").notNull(),
    deliveryFeeMinor: integer("delivery_fee_minor").notNull(),
    totalMinor: integer("total_minor").notNull(),
    currency: varchar("currency", { length: 3 }).notNull().default("GBP"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("orders_status_created_at_idx").on(table.status, table.createdAt),
    index("orders_customer_phone_idx").on(table.customerPhone),
    check("orders_subtotal_non_negative", sql`${table.subtotalMinor} >= 0`),
    check("orders_delivery_fee_non_negative", sql`${table.deliveryFeeMinor} >= 0`),
    check("orders_total_non_negative", sql`${table.totalMinor} >= 0`),
  ],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: uuid("product_id").references(() => products.id),
    productNameSnapshot: varchar("product_name_snapshot", { length: 160 }).notNull(),
    unitPriceMinorSnapshot: integer("unit_price_minor_snapshot").notNull(),
    quantity: integer("quantity").notNull(),
    lineTotalMinor: integer("line_total_minor").notNull(),
  },
  (table) => [
    index("order_items_order_id_idx").on(table.orderId),
    check("order_items_quantity_positive", sql`${table.quantity} > 0`),
    check("order_items_unit_price_non_negative", sql`${table.unitPriceMinorSnapshot} >= 0`),
    check("order_items_line_total_non_negative", sql`${table.lineTotalMinor} >= 0`),
  ],
);

export const orderItemOptions = pgTable(
  "order_item_options",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderItemId: uuid("order_item_id")
      .notNull()
      .references(() => orderItems.id, { onDelete: "cascade" }),
    optionNameSnapshot: varchar("option_name_snapshot", { length: 120 }).notNull(),
    valueNameSnapshot: varchar("value_name_snapshot", { length: 120 }).notNull(),
    priceDeltaMinorSnapshot: integer("price_delta_minor_snapshot").notNull(),
  },
  (table) => [index("order_item_options_item_id_idx").on(table.orderItemId)],
);

export const orderStatusHistory = pgTable(
  "order_status_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    fromStatus: orderStatus("from_status"),
    toStatus: orderStatus("to_status").notNull(),
    changedByUserId: uuid("changed_by_user_id").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("order_status_history_order_id_idx").on(table.orderId, table.createdAt)],
);

export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
