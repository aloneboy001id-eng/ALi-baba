import "server-only";

import { z } from "zod";

const serverEnvSchema = z.object({
  // Public demo pages can render at build time without a database connection.
  DATABASE_URL: z.string().min(1).optional(),
  AUTH_SESSION_SECRET: z.string().min(32).optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().default(process.env.URL ?? "http://localhost:3000"),
  WHATSAPP_PROVIDER_URL: z.string().url().optional().or(z.literal("")),
  WHATSAPP_PROVIDER_TOKEN: z.string().optional().or(z.literal("")),
  PHONE_NOTIFICATION_PROVIDER_URL: z.string().url().optional().or(z.literal("")),
  PHONE_NOTIFICATION_PROVIDER_TOKEN: z.string().optional().or(z.literal("")),
  RATE_LIMIT_PROVIDER_URL: z.string().url().optional().or(z.literal("")),
  RATE_LIMIT_PROVIDER_TOKEN: z.string().optional().or(z.literal("")),
});

export function getDatabaseUrl(): string {
  const value = process.env.DATABASE_URL;

  if (!value) {
    throw new Error("DATABASE_URL must be configured for database access.");
  }

  return value;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getServerEnv() {
  return serverEnvSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SESSION_SECRET: process.env.AUTH_SESSION_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    WHATSAPP_PROVIDER_URL: process.env.WHATSAPP_PROVIDER_URL,
    WHATSAPP_PROVIDER_TOKEN: process.env.WHATSAPP_PROVIDER_TOKEN,
    PHONE_NOTIFICATION_PROVIDER_URL: process.env.PHONE_NOTIFICATION_PROVIDER_URL,
    PHONE_NOTIFICATION_PROVIDER_TOKEN: process.env.PHONE_NOTIFICATION_PROVIDER_TOKEN,
    RATE_LIMIT_PROVIDER_URL: process.env.RATE_LIMIT_PROVIDER_URL,
    RATE_LIMIT_PROVIDER_TOKEN: process.env.RATE_LIMIT_PROVIDER_TOKEN,
  });
}
