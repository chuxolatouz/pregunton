/* Only public offline HTML and immutable application assets are cached. */
const CACHE = "pregunton-offline-v1";
const OFFLINE = "/sin-conexion";
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
async function prepare(extra = []) {
  const cache = await caches.open(CACHE);
  const response = await fetch(OFFLINE, {
    cache: "reload",
    credentials: "omit",
  });
  if (!response.ok) throw new Error("offline page");
  const html = await response.clone().text();
  const resources = new Set([
    "/brand/pregunton-imagotipo-compacto.svg",
    "/brand/icon-192.png",
    "/brand/favicon.svg",
    "/brand/icon-512.png",
    "/brand/apple-touch-icon.png",
  ]);
  for (const match of html.matchAll(/(?:src|href)="([^"\s]+)"/g)) {
    const path = match[1].replaceAll("&amp;", "&");
    if (path.startsWith("/_next/static/")) resources.add(path);
  }
  for (const entry of extra) {
    try {
      const url = new URL(entry, self.location.origin);
      if (
        url.origin === self.location.origin &&
        url.pathname.startsWith("/_next/static/")
      )
        resources.add(url.pathname);
    } catch {
      /* Ignore malformed resource entries. */
    }
  }
  for (const path of resources) {
    const result = await fetch(path, { cache: "reload", credentials: "omit" });
    if (!result.ok) throw new Error("asset");
    await cache.put(path, result.clone());
    if (path.split("?")[0].endsWith(".css")) {
      for (const match of (await result.text()).matchAll(
        /url\(["']?([^\)"']+)["']?\)/g,
      )) {
        const font = new URL(match[1], new URL(path, self.location.origin));
        if (
          font.origin === self.location.origin &&
          font.pathname.startsWith("/_next/static/")
        ) {
          const asset = await fetch(font.href, { credentials: "omit" });
          if (!asset.ok) throw new Error("font");
          await cache.put(font.href, asset);
        }
      }
    }
  }
  // Mark the shell available only after all of its dependencies were stored.
  await cache.put(OFFLINE, response);
}
self.addEventListener("message", (event) => {
  if (event.data?.type === "PREPARE_OFFLINE")
    event.waitUntil(
      prepare(event.data.resources ?? [])
        .then(() => event.ports[0]?.postMessage({ ok: true }))
        .catch(() => event.ports[0]?.postMessage({ ok: false })),
    );
});
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || event.request.method !== "GET")
    return;
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/brand/")
  ) {
    event.respondWith(
      caches
        .open(CACHE)
        .then(
          async (cache) =>
            (await cache.match(event.request)) ?? fetch(event.request),
        ),
    );
    return;
  }
  if (event.request.mode === "navigate")
    event.respondWith(
      (async () => {
        try {
          return await fetch(event.request);
        } catch {
          const cache = await caches.open(CACHE);
          const shell = await cache.match(OFFLINE);
          if (!shell)
            return new Response(
              "Todavía no hay mazos descargados. Vuelve a conectar para guardar uno.",
              {
                status: 503,
                headers: { "Content-Type": "text/plain; charset=utf-8" },
              },
            );
          if (url.pathname === OFFLINE && !url.search) return shell;
          if (url.pathname === OFFLINE && url.search)
            return Response.redirect(
              `${url.origin}${OFFLINE}#${url.searchParams.toString()}`,
              302,
            );
          const target = new URL(OFFLINE, url.origin);
          if (url.pathname === "/mis-cartas")
            target.searchParams.set("vista", "guardadas");
          if (url.pathname.startsWith("/mi-carta/"))
            target.searchParams.set("carta", url.pathname.slice(10));
          if (url.pathname.startsWith("/mazo/"))
            target.searchParams.set(
              "mazo",
              decodeURIComponent(url.pathname.slice(6)),
            );
          if (url.pathname.startsWith("/coleccion/"))
            target.searchParams.set("coleccion", url.pathname.slice(11));
          if (url.searchParams.has("q"))
            target.searchParams.set("q", url.searchParams.get("q"));
          const selection = target.searchParams.toString();
          target.search = "";
          if (selection) target.hash = selection;
          return Response.redirect(target.href, 302);
        }
      })(),
    );
});
