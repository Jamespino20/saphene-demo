export interface WebhookTarget {
  url: string;
  secret: string;
  active: boolean;
}

export interface Delivery {
  targetUrl: string;
  event: string;
  attempts: number;
  delivered: boolean;
}

export function isDeliverable(t: WebhookTarget): boolean {
  return t.active && t.url.startsWith("https://");
}

export function nextDelay(attempts: number): number {
  return Math.min(1000 * 2 ** attempts, 30_000);
}

export function markDelivered(d: Delivery): Delivery {
  return { ...d, delivered: true };
}
