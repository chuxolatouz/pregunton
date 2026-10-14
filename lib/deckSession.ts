export type DeckSession = { order: string[]; cursor: number };
export function shuffled(
  ids: string[],
  first?: string,
  random = Math.random,
): string[] {
  const order = ids.filter((id) => id !== first);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return first && ids.includes(first) ? [first, ...order] : order;
}
export function restoreSession(
  ids: string[],
  saved?: DeckSession & { questionId: string },
  explicit?: string,
): DeckSession {
  if (explicit)
    return { order: ids, cursor: Math.max(0, ids.indexOf(explicit)) };
  if (
    saved &&
    saved.order.length === ids.length &&
    new Set(saved.order).size === ids.length &&
    saved.order.every((id) => ids.includes(id)) &&
    saved.order[saved.cursor] === saved.questionId
  )
    return { order: saved.order, cursor: saved.cursor };
  return { order: ids, cursor: 0 };
}
