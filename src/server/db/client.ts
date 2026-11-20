import "server-only";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { getServerEnv } from "@/lib/config/env";

import * as schema from "./schema";

// Keep local public routes usable without a database, while production still
// fails fast when its required server configuration is missing.
const serverEnv = process.env.NODE_ENV === "production" ? getServerEnv() : null;
const databaseUrl = serverEnv?.DATABASE_URL ?? process.env.DATABASE_URL;

const connection = postgres(databaseUrl ?? "postgres://localhost/unused", {
  max: process.env.NODE_ENV === "production" ? 10 : 1,
  prepare: false,
});

export const db = drizzle(connection, { schema });
export type Database = typeof db;
