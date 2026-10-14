const key = "pregunton:offline-decks:v1";
const event = "pregunton:offline-change";
export const getOfflineServer = () => "[]";
export function getOfflineSnapshot() {
  try {
    return localStorage.getItem(key) ?? "[]";
  } catch {
    return "[]";
  }
}
export function offlineDeckIds(raw: string): string[] {
  try {
    const ids: unknown = JSON.parse(raw);
    return Array.isArray(ids)
      ? ids.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}
export function subscribeOffline(listener: () => void) {
  window.addEventListener(event, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(event, listener);
    window.removeEventListener("storage", listener);
  };
}
export async function registerOffline() {
  if (!("serviceWorker" in navigator))
    throw new Error("Este navegador no permite guardar mazos sin conexión.");
  const registration = await navigator.serviceWorker.register("/sw.js", {
    updateViaCache: "none",
  });
  const worker = registration.installing ?? registration.waiting;
  if (worker && worker.state !== "activated") {
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(
        () =>
          reject(
            new Error(
              "El modo sin conexión aún se está preparando. Inténtalo de nuevo.",
            ),
          ),
        20000,
      );
      const changed = () => {
        if (worker.state === "activated") {
          clearTimeout(timer);
          worker.removeEventListener("statechange", changed);
          resolve();
        } else if (worker.state === "redundant") {
          clearTimeout(timer);
          worker.removeEventListener("statechange", changed);
          reject(new Error("No se pudo actualizar el modo sin conexión."));
        }
      };
      worker.addEventListener("statechange", changed);
      changed();
    });
  }
  return navigator.serviceWorker.ready;
}
export async function saveOfflineDeck(id: string) {
  const registration = await registerOffline();
  await new Promise<void>((resolve, reject) => {
    const channel = new MessageChannel();
    const timeout = setTimeout(() => {
      channel.port1.close();
      reject(new Error("La descarga tardó demasiado. Inténtalo de nuevo."));
    }, 45000);
    channel.port1.onmessage = (event) => {
      clearTimeout(timeout);
      channel.port1.close();
      if (event.data?.ok) resolve();
      else
        reject(
          new Error(
            "No se pudo preparar el mazo. Revisa tu conexión o el espacio disponible.",
          ),
        );
    };
    if (!registration.active) {
      clearTimeout(timeout);
      reject(new Error("Vuelve a intentarlo en un momento."));
      return;
    }
    registration.active.postMessage(
      {
        type: "PREPARE_OFFLINE",
        resources: performance
          .getEntriesByType("resource")
          .map((entry) => entry.name)
          .filter(
            (name) =>
              new URL(name).origin === location.origin &&
              new URL(name).pathname.startsWith("/_next/static/"),
          ),
      },
      [channel.port2],
    );
  });
  const ids = new Set(offlineDeckIds(getOfflineSnapshot()));
  ids.add(id);
  localStorage.setItem(key, JSON.stringify([...ids]));
  window.dispatchEvent(new Event(event));
}
export function removeOfflineDeck(id: string) {
  const ids = offlineDeckIds(getOfflineSnapshot()).filter(
    (item) => item !== id,
  );
  localStorage.setItem(key, JSON.stringify(ids));
  window.dispatchEvent(new Event(event));
}
