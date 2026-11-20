import "dotenv/config";

import type { Config } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;
const isGenerateCommand = process.argv.includes("generate");

if (!databaseUrl && !isGenerateCommand) {
  throw new Error("DATABASE_URL must be set before running database-connected Drizzle commands.");
}

export default {
  schema: "./src/server/db/schema/index.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // `generate` is offline; Drizzle still requires a URL in its config shape.
    // Database-connected commands require the real DATABASE_URL above.
    url: databaseUrl ?? "postgresql://localhost:5432/migration_generation_placeholder",
  },
  strict: true,
  verbose: true,
} satisfies Config;
