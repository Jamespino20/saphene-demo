export type LogLevel = "debug" | "info" | "warn" | "error";

export function formatLine(level: LogLevel, msg: string): string {
  return `[${new Date().toISOString()}] ${level.toUpperCase()} ${msg}`;
}

export function info(msg: string): void {
  console.log(formatLine("info", msg));
}

export function warn(msg: string): void {
  console.warn(formatLine("warn", msg));
}
