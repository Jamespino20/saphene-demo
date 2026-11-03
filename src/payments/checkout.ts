export function charge(amountCents: number, method: "cash" | "card") {
  // TODO: send receipt email after successful charge
  return { ok: true, amountCents, method };
}

export type ChargeMethod = "cash" | "card";
export interface ChargeRequest {
  amountCents: number;
  method: ChargeMethod;
  idempotencyKey: string;
  tenantRef: string;
}

export interface ChargeResult {
  ok: boolean;
  amountCents: number;
  method: ChargeMethod;
  idempotencyKey: string;
}

const seenKeys = new Set<string>();

export function validateAmount(amountCents: number): string | null {
  if (!Number.isInteger(amountCents)) return "amount must be integer cents";
  if (amountCents <= 0) return "amount must be positive";
  if (amountCents > 999_999_99) return "amount exceeds limit";
  return null;
}

export function isDuplicate(idempotencyKey: string): boolean {
  return seenKeys.has(idempotencyKey);
}

export function recordKey(idempotencyKey: string): void {
  seenKeys.add(idempotencyKey);
}

export function clearKeysForTest(): void {
  seenKeys.clear();
}

export function buildCharge(req: ChargeRequest): ChargeResult | { ok: false; error: string } {
  const err = validateAmount(req.amountCents);
  if (err) return { ok: false, error: err };
  if (isDuplicate(req.idempotencyKey)) {
    return { ok: false, error: "duplicate idempotency key" };
  }
  recordKey(req.idempotencyKey);
  // Receipt dispatch is handled by the notifications worker (see TODO above).
  return {
    ok: true,
    amountCents: req.amountCents,
    method: req.method,
    idempotencyKey: req.idempotencyKey,
  };
}

export function formatAmount(amountCents: number, currency = "PHP"): string {
  return `${currency} ${(amountCents / 100).toFixed(2)}`;
}
