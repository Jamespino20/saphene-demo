export interface ApiKey {
  id: string;
  tenantRef: string;
  prefix: string;
  hash: string;
  revoked: boolean;
}

const keys: ApiKey[] = [];

export function registerKey(k: ApiKey): void {
  keys.push(k);
}

export function findActive(keyId: string): ApiKey | undefined {
  return keys.find((k) => k.id === keyId && !k.revoked);
}

export function revoke(keyId: string): boolean {
  const k = keys.find((x) => x.id === keyId);
  if (!k) return false;
  k.revoked = true;
  return true;
}

export function clearForTest(): void {
  keys.length = 0;
}
