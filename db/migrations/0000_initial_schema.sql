CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE "user_role" AS ENUM ('staff', 'manager');
CREATE TYPE "order_status" AS ENUM ('pending_confirmation', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'completed', 'cancelled', 'rejected');
CREATE TYPE "order_channel" AS ENUM ('website', 'phone', 'whatsapp');

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" varchar(320) NOT NULL UNIQUE,
  "password_hash" text NOT NULL,
  "role" "user_role" NOT NULL DEFAULT 'staff',
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "user_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "token_hash" text NOT NULL UNIQUE,
  "expires_at" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX "sessions_user_id_idx" ON "sessions" ("user_id");

CREATE TABLE "menu_categories" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(120) NOT NULL,
  "slug" varchar(120) NOT NULL UNIQUE,
  "sort_order" integer NOT NULL DEFAULT 0,
  "is_active" boolean NOT NULL DEFAULT true
);

CREATE TABLE "products" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "category_id" uuid NOT NULL REFERENCES "menu_categories"("id"),
  "name" varchar(160) NOT NULL,
  "slug" varchar(160) NOT NULL UNIQUE,
  "description" text,
  "price_minor" integer NOT NULL CHECK ("price_minor" >= 0),
  "currency" varchar(3) NOT NULL DEFAULT 'GBP',
  "is_available" boolean NOT NULL DEFAULT true,
  "image_url" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX "products_category_id_idx" ON "products" ("category_id");
CREATE INDEX "products_available_idx" ON "products" ("is_available");

CREATE TABLE "product_options" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "product_id" uuid NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
  "name" varchar(120) NOT NULL,
  "is_required" boolean NOT NULL DEFAULT false,
  "max_selections" integer NOT NULL DEFAULT 1,
  "sort_order" integer NOT NULL DEFAULT 0
);
CREATE INDEX "product_options_product_id_idx" ON "product_options" ("product_id");

CREATE TABLE "product_option_values" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "option_id" uuid NOT NULL REFERENCES "product_options"("id") ON DELETE CASCADE,
  "name" varchar(120) NOT NULL,
  "price_delta_minor" integer NOT NULL DEFAULT 0,
  "is_available" boolean NOT NULL DEFAULT true,
  "sort_order" integer NOT NULL DEFAULT 0,
  CONSTRAINT "product_option_values_name_unique" UNIQUE ("option_id", "name")
);
CREATE INDEX "product_option_values_option_id_idx" ON "product_option_values" ("option_id");

CREATE TABLE "delivery_areas" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar(120) NOT NULL,
  "postcode_prefix" varchar(16) NOT NULL UNIQUE,
  "delivery_fee_minor" integer NOT NULL CHECK ("delivery_fee_minor" >= 0),
  "minimum_order_minor" integer NOT NULL CHECK ("minimum_order_minor" >= 0),
  "is_active" boolean NOT NULL DEFAULT true
);

CREATE TABLE "delivery_rules" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "day_of_week" integer NOT NULL UNIQUE CHECK ("day_of_week" BETWEEN 0 AND 6),
  "opens_at" varchar(5) NOT NULL,
  "closes_at" varchar(5) NOT NULL,
  "is_closed" boolean NOT NULL DEFAULT false
);

CREATE TABLE "orders" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "idempotency_key" varchar(128) NOT NULL UNIQUE,
  "status" "order_status" NOT NULL DEFAULT 'pending_confirmation',
  "channel" "order_channel" NOT NULL DEFAULT 'website',
  "customer_name" varchar(160) NOT NULL,
  "customer_phone" varchar(32) NOT NULL,
  "customer_address" text NOT NULL,
  "delivery_area_id" uuid REFERENCES "delivery_areas"("id"),
  "subtotal_minor" integer NOT NULL CHECK ("subtotal_minor" >= 0),
  "delivery_fee_minor" integer NOT NULL CHECK ("delivery_fee_minor" >= 0),
  "total_minor" integer NOT NULL CHECK ("total_minor" >= 0),
  "currency" varchar(3) NOT NULL DEFAULT 'GBP',
  "notes" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX "orders_status_created_at_idx" ON "orders" ("status", "created_at");
CREATE INDEX "orders_customer_phone_idx" ON "orders" ("customer_phone");

CREATE TABLE "order_items" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "order_id" uuid NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,
  "product_id" uuid REFERENCES "products"("id") ON DELETE SET NULL,
  "product_name_snapshot" varchar(160) NOT NULL,
  "unit_price_minor_snapshot" integer NOT NULL CHECK ("unit_price_minor_snapshot" >= 0),
  "quantity" integer NOT NULL CHECK ("quantity" > 0),
  "line_total_minor" integer NOT NULL CHECK ("line_total_minor" >= 0)
);
CREATE INDEX "order_items_order_id_idx" ON "order_items" ("order_id");

CREATE TABLE "order_item_options" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "order_item_id" uuid NOT NULL REFERENCES "order_items"("id") ON DELETE CASCADE,
  "option_name_snapshot" varchar(120) NOT NULL,
  "value_name_snapshot" varchar(120) NOT NULL,
  "price_delta_minor_snapshot" integer NOT NULL
);
CREATE INDEX "order_item_options_item_id_idx" ON "order_item_options" ("order_item_id");

CREATE TABLE "order_status_history" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "order_id" uuid NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,
  "from_status" "order_status",
  "to_status" "order_status" NOT NULL,
  "changed_by_user_id" uuid REFERENCES "users"("id"),
  "created_at" timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX "order_status_history_order_id_idx" ON "order_status_history" ("order_id", "created_at");
