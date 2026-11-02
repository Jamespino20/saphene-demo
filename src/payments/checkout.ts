export function charge(amountCents: number, method: "cash" | "card") {
  // TODO: send receipt email after successful charge
  return { ok: true, amountCents, method };
}
