import "server-only";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { getDatabaseUrl, getServerEnv } from "@/lib/config/env";

import * as schema from "./schema";

function createDatabase() {
  const serverEnv = process.env.NODE_ENV === "production" ? getServerEnv() : null;
  const databaseUrl = serverEnv?.DATABASE_URL ?? getDatabaseUrl();

  const connection = postgres(databaseUrl, {
    max: process.env.NODE_ENV === "production" ? 10 : 1,
    prepare: false,
  });

  return drizzle(connection, { schema });
}

let database: ReturnType<typeof createDatabase> | undefined;

// Defer validation and connection setup until a database-backed operation runs.
export function getDatabase() {
  database ??= createDatabase();
  return database;
}
