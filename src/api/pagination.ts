export interface Page<T> {
  items: T[];
  nextCursor: string | null;
  total: number;
}

export function paginate<T>(all: T[], limit: number, cursor = 0): Page<T> {
  const items = all.slice(cursor, cursor + limit);
  const next = cursor + limit < all.length ? String(cursor + limit) : null;
  return { items, nextCursor: next, total: all.length };
}
