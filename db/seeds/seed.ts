import "dotenv/config";

import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL ?? (() => {
  throw new Error("DATABASE_URL must be set before running the seed.");
})();

const categoryId = "00000000-0000-0000-0000-000000000001";
const productId = "00000000-0000-0000-0000-000000000002";
const optionId = "00000000-0000-0000-0000-000000000003";
const optionValueId = "00000000-0000-0000-0000-000000000004";
const deliveryAreaId = "00000000-0000-0000-0000-000000000005";

export async function seed() {
  const sql = postgres(databaseUrl, { prepare: false });

  try {
    await sql.begin(async (transaction) => {
      await transaction`
        INSERT INTO menu_categories (id, name, slug, sort_order, is_active)
        VALUES (${categoryId}, ${"Pizza"}, ${"pizza"}, ${1}, ${true})
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          sort_order = EXCLUDED.sort_order,
          is_active = EXCLUDED.is_active
      `;

      await transaction`
        INSERT INTO products (
          id, category_id, name, slug, description, price_minor, currency, is_available
        )
        VALUES (
          ${productId}, ${categoryId}, ${"Margherita Pizza"}, ${"margherita-pizza"},
          ${"Tomato, mozzarella, and basil"}, ${899}, ${"GBP"}, ${true}
        )
        ON CONFLICT (id) DO UPDATE SET
          category_id = EXCLUDED.category_id,
          name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          description = EXCLUDED.description,
          price_minor = EXCLUDED.price_minor,
          currency = EXCLUDED.currency,
          is_available = EXCLUDED.is_available
      `;

      await transaction`
        INSERT INTO product_options (id, product_id, name, is_required, max_selections, sort_order)
        VALUES (${optionId}, ${productId}, ${"Size"}, ${true}, ${1}, ${1})
        ON CONFLICT (id) DO UPDATE SET
          product_id = EXCLUDED.product_id,
          name = EXCLUDED.name,
          is_required = EXCLUDED.is_required,
          max_selections = EXCLUDED.max_selections,
          sort_order = EXCLUDED.sort_order
      `;

      await transaction`
        INSERT INTO product_option_values (
          id, option_id, name, price_delta_minor, is_available, sort_order
        )
        VALUES (${optionValueId}, ${optionId}, ${"Regular"}, ${0}, ${true}, ${1})
        ON CONFLICT (id) DO UPDATE SET
          option_id = EXCLUDED.option_id,
          name = EXCLUDED.name,
          price_delta_minor = EXCLUDED.price_delta_minor,
          is_available = EXCLUDED.is_available,
          sort_order = EXCLUDED.sort_order
      `;

      await transaction`
        INSERT INTO delivery_areas (
          id, name, postcode_prefix, delivery_fee_minor, minimum_order_minor, is_active
        )
        VALUES (${deliveryAreaId}, ${"Local area"}, ${"AB"}, ${199}, ${1000}, ${true})
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          postcode_prefix = EXCLUDED.postcode_prefix,
          delivery_fee_minor = EXCLUDED.delivery_fee_minor,
          minimum_order_minor = EXCLUDED.minimum_order_minor,
          is_active = EXCLUDED.is_active
      `;

      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek += 1) {
        await transaction`
          INSERT INTO delivery_rules (day_of_week, opens_at, closes_at, is_closed)
          VALUES (${dayOfWeek}, ${"11:00"}, ${"23:00"}, ${false})
          ON CONFLICT (day_of_week) DO UPDATE SET
            opens_at = EXCLUDED.opens_at,
            closes_at = EXCLUDED.closes_at,
            is_closed = EXCLUDED.is_closed
        `;
      }
    });
  } finally {
    await sql.end();
  }
}

if (process.argv[1]?.endsWith("seed.ts")) {
  await seed();
}
