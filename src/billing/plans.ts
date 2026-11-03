export type PlanId = "starter" | "growth" | "scale";

export interface Plan {
  id: PlanId;
  maxSeats: number;
  maxPushPerDay: number;
  retentionDays: number;
}

export const PLANS: Record<PlanId, Plan> = {
  starter: { id: "starter", maxSeats: 3, maxPushPerDay: 500, retentionDays: 30 },
  growth: { id: "growth", maxSeats: 15, maxPushPerDay: 10_000, retentionDays: 90 },
  scale: { id: "scale", maxSeats: 100, maxPushPerDay: 100_000, retentionDays: 365 },
};

export function getPlan(id: PlanId): Plan {
  return PLANS[id];
}

export function canPush(plan: Plan, usedToday: number): boolean {
  return usedToday < plan.maxPushPerDay;
}
