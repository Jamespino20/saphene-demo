export type Currency = "PHP" | "USD" | "SGD";

export interface Money {
  amountCents: number;
  currency: Currency;
}

export function isValidMoney(m: Money): boolean {
  return Number.isInteger(m.amountCents) && m.amountCents > 0;
}

export function addMoney(a: Money, b: Money): Money | null {
  if (a.currency !== b.currency) return null;
  return { amountCents: a.amountCents + b.amountCents, currency: a.currency };
}
