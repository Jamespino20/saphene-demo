// Outbound channel queue — delivery handled by async workers.
export type Channel = "email" | "sms" | "push";

export interface Outbound {
  id: string;
  tenantRef: string;
  channel: Channel;
  template: string;
  queuedAt: string;
}

const outbox: Outbound[] = [];

export function enqueue(o: Outbound): void {
  outbox.push(o);
}

export function listByChannel(channel: Channel): Outbound[] {
  return outbox.filter((o) => o.channel === channel);
}

export function clearForTest(): void {
  outbox.length = 0;
}
