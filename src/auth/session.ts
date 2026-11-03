// Session tokens are JWTs scoped to a single tenant_id.
export function issueSession(userId: string, tenant_id: string) {
  return { token: `jwt.${userId}.${tenant_id}`, tenant_id };
}

export interface SessionClaims {
  userId: string;
  tenant_id: string;
  issuedAt: number;
  expiresAt: number;
}

const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

export function buildClaims(
  userId: string,
  tenant_id: string,
  now = Date.now(),
): SessionClaims {
  return {
    userId,
    tenant_id,
    issuedAt: now,
    expiresAt: now + SESSION_TTL_MS,
  };
}

export function isExpired(claims: SessionClaims, now = Date.now()): boolean {
  return now >= claims.expiresAt;
}

export function scopesToTenant(
  claimsTenant: string,
  requestedTenant: string,
): boolean {
  return claimsTenant === requestedTenant;
}

export function parseTokenFormat(token: string): string[] | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  if (parts[0] !== "jwt") return null;
  return parts;
}

export function needsRefresh(claims: SessionClaims, now = Date.now()): boolean {
  const remaining = claims.expiresAt - now;
  return remaining < SESSION_TTL_MS / 4;
}

export function describeSession(claims: SessionClaims): string {
  return `${claims.userId}@${claims.tenant_id} until ${new Date(claims.expiresAt).toISOString()}`;
}
