export function healthCheck() {
  return { status: "ok", uptime: process.uptime() };
}

export interface DependencyStatus {
  name: string;
  reachable: boolean;
  latencyMs: number;
}

export interface ReadinessReport {
  ready: boolean;
  version: string;
  uptimeSec: number;
  dependencies: DependencyStatus[];
  checkedAt: string;
}

const SERVICE_VERSION = "1.4.0";
const STARTED_AT = Date.now();

export function getUptimeSeconds(now = Date.now()): number {
  return Math.floor((now - STARTED_AT) / 1000);
}

export function checkDatabase(dsnAvailable: boolean): DependencyStatus {
  const started = Date.now();
  // Simulated probe — real implementation pings the pool with a 1s timeout.
  return {
    name: "postgres",
    reachable: dsnAvailable,
    latencyMs: Date.now() - started,
  };
}

export function checkQueueAdapter(queueDepth: number): DependencyStatus {
  return {
    name: "sync-queue",
    reachable: queueDepth < 10_000,
    latencyMs: 1,
  };
}

export function buildReadiness(
  deps: DependencyStatus[],
): ReadinessReport {
  const ready = deps.every((d) => d.reachable);
  return {
    ready,
    version: SERVICE_VERSION,
    uptimeSec: getUptimeSeconds(),
    dependencies: deps,
    checkedAt: new Date().toISOString(),
  };
}

export function readinessSummary(report: ReadinessReport): string {
  const failed = report.dependencies.filter((d) => !d.reachable);
  if (failed.length === 0) return `ready v${report.version}`;
  return `degraded: ${failed.map((f) => f.name).join(", ")} unreachable`;
}
