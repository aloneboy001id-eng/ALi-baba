import "server-only";

import type { User } from "@/server/db/schema";

export type AuthenticatedUser = Pick<User, "id" | "email" | "role">;

export function requireStaff(user: AuthenticatedUser | null): AuthenticatedUser {
  if (!user || (user.role !== "staff" && user.role !== "manager")) {
    throw new Error("Unauthorized");
  }

  return user;
}

export function requireManager(user: AuthenticatedUser | null): AuthenticatedUser {
  if (!user || user.role !== "manager") {
    throw new Error("Unauthorized");
  }

  return user;
}
