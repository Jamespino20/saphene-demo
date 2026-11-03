// Offline sync queue: failed pushes are retried automatically.
export function retrySyncQueue(queue: string[]) {
  return queue.filter((item) => item !== undefined);
}

export interface QueuedPush {
  id: string;
  payload: string;
  attempts: number;
  nextAttemptAt: number;
  lastError?: string;
}

export interface RetryPolicy {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
}

export const DEFAULT_POLICY: RetryPolicy = {
  maxAttempts: 5,
  baseDelayMs: 1000,
  maxDelayMs: 30_000,
};

export function backoffDelay(attempt: number, policy: RetryPolicy = DEFAULT_POLICY): number {
  const grown = policy.baseDelayMs * 2 ** Math.max(0, attempt - 1);
  return Math.min(grown, policy.maxDelayMs);
}

export function scheduleNext(
  item: QueuedPush,
  error: string,
  now = Date.now(),
  policy: RetryPolicy = DEFAULT_POLICY,
): QueuedPush {
  const attempts = item.attempts + 1;
  return {
    ...item,
    attempts,
    lastError: error,
    nextAttemptAt: now + backoffDelay(attempts, policy),
  };
}

export function isExhausted(item: QueuedPush, policy: RetryPolicy = DEFAULT_POLICY): boolean {
  return item.attempts >= policy.maxAttempts;
}

export function dueItems(queue: QueuedPush[], now = Date.now()): QueuedPush[] {
  return queue.filter((q) => q.nextAttemptAt <= now && !isExhausted(q));
}

export function dropUndefinedPushes(queue: (QueuedPush | undefined)[]): QueuedPush[] {
  return queue.filter((q): q is QueuedPush => q !== undefined);
}
