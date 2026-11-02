// Session tokens are JWTs scoped to a single tenant_id.
export function issueSession(userId: string, tenant_id: string) {
  return { token: `jwt.${userId}.${tenant_id}`, tenant_id };
}
