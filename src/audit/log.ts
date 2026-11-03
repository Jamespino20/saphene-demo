export interface AuditEvent {
  id: string;
  tenantRef: string;
  actor: string;
  action: string;
  at: string;
}

const events: AuditEvent[] = [];

export function record(e: AuditEvent): void {
  events.push(e);
}

export function listForTenant(tenantRef: string, limit = 100): AuditEvent[] {
  return events.filter((e) => e.tenantRef === tenantRef).slice(-limit);
}

export function clearForTest(): void {
  events.length = 0;
}
