import { getCurrentUser } from "./getCurrentUser";
import { Role } from "@/types/role";

export async function requireRole(allowedRoles: Role[]) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthenticated");
  }

  if (!allowedRoles.includes(user.role)) {
    throw new Error("Unauthorized");
  }

  return user;
}
