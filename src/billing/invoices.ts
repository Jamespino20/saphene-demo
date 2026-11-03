import type { Money } from "../payments/types.js";

export interface Invoice {
  id: string;
  tenantRef: string;
  period: string;
  total: Money;
  issuedAt: string;
  paid: boolean;
}

export function buildId(tenantRef: string, period: string): string {
  return `inv_${tenantRef}_${period}`;
}

export function markPaid(inv: Invoice): Invoice {
  return { ...inv, paid: true };
}

export function outstanding(list: Invoice[]): Invoice[] {
  return list.filter((i) => !i.paid);
}

export function totalOutstanding(list: Invoice[]): number {
  return outstanding(list).reduce((s, i) => s + i.total.amountCents, 0);
}
