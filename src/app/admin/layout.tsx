import { redirect } from "next/navigation";

import { requireStaff } from "@/lib/auth/authorization";
import { getCurrentUser } from "@/lib/security/session";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  requireStaff(user);
  return <>{children}</>;
}
