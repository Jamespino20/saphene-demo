export interface Route {
  method: "GET" | "POST";
  path: string;
  handler: string;
}

export const routes: Route[] = [
  { method: "GET", path: "/health", handler: "readinessHandler" },
  { method: "GET", path: "/ready", handler: "readyHandler" },
  { method: "POST", path: "/sessions", handler: "createSessionHandler" },
  { method: "POST", path: "/charges", handler: "createChargeHandler" },
  { method: "POST", path: "/sync/push", handler: "pushHandler" },
  { method: "GET", path: "/sync/pending", handler: "pendingHandler" },
];

export function findRoute(method: string, path: string): Route | undefined {
  return routes.find((r) => r.method === method && r.path === path);
}

export function routePaths(): string[] {
  return routes.map((r) => `${r.method} ${r.path}`);
}
