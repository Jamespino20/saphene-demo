export type Role = "admin" | "cashier" | "auditor";

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  admin: ["charges:create", "charges:refund", "sessions:manage", "sync:manage"],
  cashier: ["charges:create", "sync:push"],
  auditor: ["charges:read", "sync:read"],
};

export function can(role: Role, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function scopesMatch(requestedRef: string, assignedRef: string): boolean {
  return requestedRef === assignedRef;
}
