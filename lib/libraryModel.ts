export type Stamp = { updatedAt: number; device: string };
export type CustomQuestion = Stamp & { text: string; deleted: boolean };
export type Favorite = Stamp & { active: boolean };
export type Collection = Stamp & { name: string; deleted: boolean };
export type Membership = Stamp & {
  collectionId: string;
  questionId: string;
  active: boolean;
};
export type Progress = Stamp & {
  questionId: string;
  order: string[];
  cursor: number;
};
export type Library = {
  version: 1;
  resetAt: number;
  favorites: Record<string, Favorite>;
  custom: Record<string, CustomQuestion>;
  collections: Record<string, Collection>;
  members: Record<string, Membership>;
  progress: Record<string, Progress>;
};
export const emptyLibrary = (): Library => ({
  version: 1,
  resetAt: 0,
  custom: {},
  favorites: {},
  collections: {},
  members: {},
  progress: {},
});
const validKey = (key: string) =>
  /^[a-zA-Z0-9_:.-]{1,180}$/.test(key) &&
  !["__proto__", "constructor", "prototype"].includes(key);
const object = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);
export function parseLibrary(value: unknown): Library {
  if (!object(value) || value.version !== 1)
    throw new Error("La copia tiene un formato desconocido.");
  const result = emptyLibrary();
  if (value.resetAt !== undefined) {
    if (!Number.isSafeInteger(value.resetAt) || (value.resetAt as number) < 0)
      throw new Error("Revisión inválida.");
    result.resetAt = value.resetAt as number;
  }
  for (const field of [
    "favorites",
    "collections",
    "members",
    "progress",
    "custom",
  ] as const) {
    const records = field === "custom" ? (value[field] ?? {}) : value[field];
    if (!object(records) || Object.keys(records).length > 10000)
      throw new Error("La copia no es válida.");
    for (const [key, item] of Object.entries(records)) {
      if (
        !validKey(key) ||
        !object(item) ||
        !Number.isSafeInteger(item.updatedAt) ||
        (item.updatedAt as number) < 0 ||
        typeof item.device !== "string" ||
        !validKey(item.device)
      )
        throw new Error("La copia contiene datos inválidos.");
      const stamp = {
        updatedAt: item.updatedAt as number,
        device: item.device,
      };
      if (field === "custom") {
        if (!key.startsWith("custom-") && !key.startsWith("shared-"))
          throw new Error("ID de carta propia inválido.");
        if (
          typeof item.text !== "string" ||
          !item.text.trim() ||
          item.text.length > 145 ||
          typeof item.deleted !== "boolean"
        )
          throw new Error("Pregunta propia inválida.");
        result.custom[key] = {
          ...stamp,
          text: item.text.trim(),
          deleted: item.deleted,
        };
      } else if (field === "favorites") {
        if (typeof item.active !== "boolean")
          throw new Error("Favorito inválido.");
        result.favorites[key] = { ...stamp, active: item.active };
      } else if (field === "collections") {
        if (
          typeof item.name !== "string" ||
          !item.name.trim() ||
          item.name.length > 60 ||
          typeof item.deleted !== "boolean"
        )
          throw new Error("Colección inválida.");
        result.collections[key] = {
          ...stamp,
          name: item.name.trim(),
          deleted: item.deleted,
        };
      } else if (field === "members") {
        if (
          typeof item.collectionId !== "string" ||
          !validKey(item.collectionId) ||
          typeof item.questionId !== "string" ||
          !validKey(item.questionId) ||
          key !== `${item.collectionId}:${item.questionId}` ||
          typeof item.active !== "boolean"
        )
          throw new Error("Carta de colección inválida.");
        result.members[key] = {
          ...stamp,
          collectionId: item.collectionId,
          questionId: item.questionId,
          active: item.active,
        };
      } else {
        if (
          typeof item.questionId !== "string" ||
          !validKey(item.questionId) ||
          !Array.isArray(item.order) ||
          item.order.length > 2000 ||
          !item.order.every((id) => typeof id === "string" && validKey(id)) ||
          new Set(item.order).size !== item.order.length ||
          !Number.isInteger(item.cursor) ||
          (item.cursor as number) < 0 ||
          (item.cursor as number) >= item.order.length ||
          item.order[item.cursor as number] !== item.questionId
        )
          throw new Error("Progreso inválido.");
        result.progress[key] = {
          ...stamp,
          questionId: item.questionId,
          order: item.order as string[],
          cursor: item.cursor as number,
        };
      }
    }
  }
  return result;
}
export function mergeLibraries(left: Library, right: Library): Library {
  const result = emptyLibrary();
  result.resetAt = Math.max(left.resetAt, right.resetAt);
  for (const field of [
    "favorites",
    "collections",
    "members",
    "progress",
    "custom",
  ] as const) {
    for (const key of new Set([
      ...Object.keys(left[field]),
      ...Object.keys(right[field]),
    ])) {
      const a = left[field][key];
      const b = right[field][key];
      const winner = !a
        ? b
        : !b
          ? a
          : a.updatedAt !== b.updatedAt
            ? a.updatedAt > b.updatedAt
              ? a
              : b
            : a.device !== b.device
              ? a.device > b.device
                ? a
                : b
              : JSON.stringify(a) >= JSON.stringify(b)
                ? a
                : b;
      // Each field keeps its own validated entity type.
      if (winner.updatedAt > result.resetAt)
        (result[field] as Record<string, Stamp>)[key] = winner;
    }
  }
  return result;
}
export function maxRevision(library: Library) {
  return Math.max(
    library.resetAt,
    ...Object.values(library.custom).map((x) => x.updatedAt),
    ...Object.values(library.favorites).map((x) => x.updatedAt),
    ...Object.values(library.collections).map((x) => x.updatedAt),
    ...Object.values(library.members).map((x) => x.updatedAt),
    ...Object.values(library.progress).map((x) => x.updatedAt),
  );
}
export function favoriteIds(library: Library) {
  return Object.entries(library.favorites)
    .filter(([, item]) => item.active)
    .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
    .map(([id]) => id);
}
