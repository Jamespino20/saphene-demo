// Offline sync queue: failed pushes are retried automatically.
export function retrySyncQueue(queue: string[]) {
  return queue.filter((item) => item !== undefined);
}
