import {
  emptyLibrary,
  maxRevision,
  mergeLibraries,
  parseLibrary,
  type Library,
  type Stamp,
} from "./libraryModel";
const event = "pregunton:library-change";
const serverSnapshot = emptyLibrary();
let scope = "guest";
let rawCache: string | null | undefined;
let snapshot = serverSnapshot;
let error = "";
const key = () => `pregunton:library:v1:${scope}`;
export function getLibraryScope() {
  return scope;
}
export function setLibraryScope(next: string) {
  if (next !== scope) {
    scope = next;
    rawCache = undefined;
    snapshot = serverSnapshot;
    error = "";
    window.dispatchEvent(new Event(event));
  }
}
export function getLibraryError() {
  return error;
}
export function getServerLibrary() {
  return serverSnapshot;
}
export function readLibrary(): Library {
  if (typeof window === "undefined") return serverSnapshot;
  try {
    let raw = localStorage.getItem(key());
    if (!raw && scope === "guest") {
      const old = localStorage.getItem("pregunton:favorites");
      if (old) {
        const ids: unknown = JSON.parse(old);
        if (
          !Array.isArray(ids) ||
          !ids.every((id) => typeof id === "string" && /^[a-z0-9-]+$/.test(id))
        )
          throw new Error(
            "No se pudieron leer tus cartas anteriores. Exporta una copia antes de continuar.",
          );
        const migrated = emptyLibrary();
        ids.forEach((id) => {
          migrated.favorites[id] = {
            active: true,
            updatedAt: 1,
            device: "legacy",
          };
        });
        raw = JSON.stringify(migrated);
        localStorage.setItem(key(), raw);
        // Keep the old key as a recovery copy.
      }
    }
    if (raw === rawCache) return snapshot;
    snapshot = raw ? parseLibrary(JSON.parse(raw)) : emptyLibrary();
    rawCache = raw;
    error = "";
  } catch {
    error =
      "No se pudieron leer tus cartas. Conserva una copia y vuelve a intentarlo.";
  }
  return snapshot;
}
export function subscribeLibrary(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(event, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(event, listener);
  };
}
export function writeLibrary(next: Library) {
  const valid = parseLibrary(next);
  const raw = JSON.stringify(valid);
  try {
    localStorage.setItem(key(), raw);
  } catch {
    throw new Error(
      "No se pudo guardar en este dispositivo. Revisa el espacio disponible.",
    );
  }
  snapshot = valid;
  rawCache = raw;
  error = "";
  window.dispatchEvent(new Event(event));
}
export function changeLibrary(
  change: (library: Library, stamp: Stamp) => Library,
) {
  const current = readLibrary();
  if (error) throw new Error(error);
  let device = localStorage.getItem("pregunton:device");
  if (!device) {
    device = crypto.randomUUID();
    localStorage.setItem("pregunton:device", device);
  }
  const stamp = {
    device,
    updatedAt: Math.max(Date.now(), maxRevision(current) + 1),
  };
  writeLibrary(change(current, stamp));
}
export function setFavorite(id: string, active: boolean) {
  changeLibrary((state, stamp) => ({
    ...state,
    favorites: { ...state.favorites, [id]: { ...stamp, active } },
  }));
}
export function createCollection(name: string) {
  const id = crypto.randomUUID();
  changeLibrary((state, stamp) => ({
    ...state,
    collections: {
      ...state.collections,
      [id]: { ...stamp, name: name.trim(), deleted: false },
    },
  }));
  return id;
}
export function updateCollection(id: string, name: string, deleted = false) {
  changeLibrary((state, stamp) => ({
    ...state,
    collections: {
      ...state.collections,
      [id]: { ...stamp, name: name.trim(), deleted },
    },
  }));
}
export function setMembership(
  collectionId: string,
  questionId: string,
  active: boolean,
) {
  changeLibrary((state, stamp) => ({
    ...state,
    members: {
      ...state.members,
      [`${collectionId}:${questionId}`]: {
        ...stamp,
        collectionId,
        questionId,
        active,
      },
    },
  }));
}
export function rawLibraryBackup() {
  return (
    localStorage.getItem(key()) ??
    (scope === "guest" ? localStorage.getItem("pregunton:favorites") : null)
  );
}
export function importLibrary(value: unknown) {
  const incoming = parseLibrary(value);
  readLibrary();
  if (error) {
    const raw = rawLibraryBackup();
    if (raw) localStorage.setItem(`${key()}:recovery:${Date.now()}`, raw);
    writeLibrary(incoming);
    return;
  }
  // Imported copies add active cards; they never erase current cards or progress.
  changeLibrary((state, stamp) => {
    const next = structuredClone(state);
    for (const [id, item] of Object.entries(incoming.custom))
      if (!item.deleted && !next.custom[id])
        next.custom[id] = { ...item, ...stamp };
    for (const [id, item] of Object.entries(incoming.favorites))
      if (item.active && !next.favorites[id]?.active)
        next.favorites[id] = { ...stamp, active: true };
    for (const [id, item] of Object.entries(incoming.collections))
      if (!item.deleted && !next.collections[id])
        next.collections[id] = { ...item, ...stamp };
    for (const [id, item] of Object.entries(incoming.members))
      if (
        item.active &&
        next.collections[item.collectionId] &&
        !next.collections[item.collectionId].deleted &&
        !next.members[id]?.active
      )
        next.members[id] = { ...item, ...stamp };
    return next;
  });
}
export function mergeRemote(remote: Library, expectedScope: string) {
  if (scope !== expectedScope) return;
  const current = readLibrary();
  if (error) throw new Error(error);
  const next = mergeLibraries(current, remote);
  if (JSON.stringify(current) !== JSON.stringify(next)) writeLibrary(next);
}
export function guestLibrary() {
  const raw = localStorage.getItem("pregunton:library:v1:guest");
  return raw ? parseLibrary(JSON.parse(raw)) : emptyLibrary();
}

export function addCustomQuestion(collectionId: string, text: string) {
  const id = `custom-${crypto.randomUUID()}`;
  changeLibrary((state, stamp) => ({
    ...state,
    custom: {
      ...state.custom,
      [id]: { ...stamp, text: text.trim(), deleted: false },
    },
    members: {
      ...state.members,
      [`${collectionId}:${id}`]: {
        ...stamp,
        collectionId,
        questionId: id,
        active: true,
      },
    },
  }));
  return id;
}
export function saveSharedQuestion(id: string, text: string, active: boolean) {
  changeLibrary((state, stamp) => ({
    ...state,
    custom: { ...state.custom, [id]: { ...stamp, text, deleted: false } },
    favorites: { ...state.favorites, [id]: { ...stamp, active } },
  }));
}
