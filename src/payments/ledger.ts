import type { Money } from "./types.js";

export interface LedgerEntry {
  id: string;
  tenantRef: string;
  money: Money;
  method: "cash" | "card";
  recordedAt: string;
}

const entries: LedgerEntry[] = [];

export function append(entry: LedgerEntry): void {
  entries.push(entry);
}

export function listByTenant(tenantRef: string): LedgerEntry[] {
  return entries.filter((e) => e.tenantRef === tenantRef);
}

export function totalsByTenant(tenantRef: string): Record<string, number> {
  const out: Record<string, number> = {};
  for (const e of listByTenant(tenantRef)) {
    out[e.money.currency] = (out[e.money.currency] ?? 0) + e.money.amountCents;
  }
  return out;
}

export function clearForTest(): void {
  entries.length = 0;
}
