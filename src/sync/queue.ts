export interface PendingItem {
  id: string;
  tenantRef: string;
  payload: string;
  createdAt: number;
  attempts: number;
}

const pending: PendingItem[] = [];

export function enqueue(item: PendingItem): void {
  pending.push(item);
}

export function pendingCount(): number {
  return pending.length;
}

export function listPending(tenantRef: string): PendingItem[] {
  return pending.filter((p) => p.tenantRef === tenantRef);
}

export function removeById(id: string): boolean {
  const idx = pending.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  pending.splice(idx, 1);
  return true;
}

export function clearForTest(): void {
  pending.length = 0;
}
