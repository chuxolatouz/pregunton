"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Full navigations allow the service worker to serve the offline shell. */
import { useState, useSyncExternalStore } from "react";
import {
  getOfflineSnapshot,
  getOfflineServer,
  offlineDeckIds,
  removeOfflineDeck,
  saveOfflineDeck,
  subscribeOffline,
} from "@/lib/offline";
export function OfflineButton({ deckId }: { deckId: string }) {
  const raw = useSyncExternalStore(
    subscribeOffline,
    getOfflineSnapshot,
    getOfflineServer,
  );
  const saved = offlineDeckIds(raw).includes(deckId);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  return (
    <div>
      <button
        disabled={busy}
        className="quiet-action"
        onClick={async () => {
          setBusy(true);
          setStatus(saved ? "" : "Preparando el mazo y sus recursos…");
          try {
            if (saved) {
              removeOfflineDeck(deckId);
              setStatus("Mazo retirado de la lista sin conexión");
            } else {
              await saveOfflineDeck(deckId);
              setStatus("Mazo disponible sin conexión");
            }
          } catch (error) {
            setStatus(
              error instanceof Error ? error.message : "No se pudo descargar",
            );
          } finally {
            setBusy(false);
          }
        }}
      >
        {busy
          ? "Preparando…"
          : saved
            ? "Retirar de mis mazos sin conexión"
            : "Guardar mazo sin conexión"}
      </button>
      <p className="text-xs leading-5 text-ink/70" role="status">
        {status}
      </p>
      {saved ? (
        <a href="/sin-conexion" className="quiet-action">
          Abrir mis mazos sin conexión →
        </a>
      ) : null}
    </div>
  );
}
