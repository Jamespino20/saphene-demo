export interface Tenant {
  ref: string;
  name: string;
  createdAt: string;
  active: boolean;
}

const tenants = new Map<string, Tenant>();

export function upsertTenant(t: Tenant): void {
  tenants.set(t.ref, t);
}

export function getTenant(ref: string): Tenant | undefined {
  return tenants.get(ref);
}

export function listActive(): Tenant[] {
  return [...tenants.values()].filter((t) => t.active);
}

export function deactivate(ref: string): boolean {
  const t = tenants.get(ref);
  if (!t) return false;
  tenants.set(ref, { ...t, active: false });
  return true;
}

export function clearForTest(): void {
  tenants.clear();
}
