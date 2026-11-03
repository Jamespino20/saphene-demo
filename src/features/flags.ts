export interface FlagSet {
  tenantRef: string;
  flags: Record<string, boolean>;
}

const sets = new Map<string, Record<string, boolean>>();

export function setFlag(tenantRef: string, key: string, on: boolean): void {
  const cur = sets.get(tenantRef) ?? {};
  cur[key] = on;
  sets.set(tenantRef, cur);
}

export function isOn(tenantRef: string, key: string): boolean {
  return sets.get(tenantRef)?.[key] ?? false;
}

export function clearForTest(): void {
  sets.clear();
}
