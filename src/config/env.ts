export interface ServiceConfig {
  dsnAvailable: boolean;
  queueDepth: number;
  region: string;
}

export function fromEnv(env: Record<string, string | undefined>): ServiceConfig {
  return {
    dsnAvailable: Boolean(env["DSN"]),
    queueDepth: Number(env["QUEUE_DEPTH"] ?? 0),
    region: env["REGION"] ?? "ap-southeast-1",
  };
}

export function describe(cfg: ServiceConfig): string {
  return `${cfg.region} depth=${cfg.queueDepth}`;
}
