export interface RequestContext {
  tenantRef: string;
  userId: string;
  token: string;
}

export function extractBearer(authHeader: string | undefined): string | null {
  if (!authHeader) return null;
  const [scheme, value] = authHeader.split(" ");
  if (scheme.toLowerCase() !== "bearer" || !value) return null;
  return value;
}

export function requireTenant(ctx: RequestContext | null): string | null {
  if (!ctx) return "missing context";
  if (!ctx.tenantRef) return "missing tenant scope";
  if (!ctx.userId) return "missing user";
  return null;
}

export function logContext(ctx: RequestContext): string {
  return `${ctx.userId}@${ctx.tenantRef}`;
}
