"use client";
import { useEffect, useState } from "react";
import type { Question } from "@/data/decks";
import { useAccount } from "./AccountProvider";
import { copyText } from "@/lib/questionLinks";
export function ShareCollection({
  collectionId,
  title,
  questions,
}: {
  collectionId: string;
  title: string;
  questions: Question[];
}) {
  const { configured, user } = useAccount();
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    void import("@/lib/supabase")
      .then(async ({ getSupabase }) => {
        const { data } = await getSupabase()
          .from("shared_decks")
          .select("token")
          .eq("owner_id", user.id)
          .eq("collection_id", collectionId)
          .maybeSingle();
        if (!cancelled) setToken(data?.token ?? "");
      })
      .catch(() => {
        if (!cancelled)
          setStatus("No se pudo comprobar si hay un enlace activo.");
      });
    return () => {
      cancelled = true;
    };
  }, [user, collectionId]);
  if (!configured || !user)
    return (
      <p className="mt-7 text-sm leading-6 text-ink/70">
        Tu colección es privada y puedes usarla aquí.{" "}
        {configured
          ? "Entra en tu cuenta para crear un enlace compartible."
          : "Podrás compartirla por enlace cuando esté disponible la sincronización."}
      </p>
    );
  async function publish() {
    setBusy(true);
    setStatus("");
    try {
      const { getSupabase } = await import("@/lib/supabase");
      const sdk = getSupabase();
      const next = token || crypto.randomUUID();
      const snapshot = {
        title,
        questions: await Promise.all(
          questions.map(async (question) => {
            const digest = await crypto.subtle.digest(
              "SHA-256",
              new TextEncoder().encode(question.id),
            );
            const id = Array.from(new Uint8Array(digest).slice(0, 16), (byte) =>
              byte.toString(16).padStart(2, "0"),
            ).join("");
            return { id, text: question.text };
          }),
        ),
      };
      const { error } = await sdk.from("shared_decks").upsert(
        {
          token: next,
          owner_id: user!.id,
          collection_id: collectionId,
          snapshot,
        },
        { onConflict: "owner_id,collection_id" },
      );
      if (error) throw error;
      setToken(next);
      setStatus(
        "Enlace activo. Se comparte únicamente esta selección de preguntas.",
      );
    } catch {
      setStatus("No se pudo activar el enlace. Tu colección sigue privada.");
    } finally {
      setBusy(false);
    }
  }
  async function revoke() {
    setBusy(true);
    try {
      const { getSupabase } = await import("@/lib/supabase");
      const { error } = await getSupabase()
        .from("shared_decks")
        .delete()
        .eq("token", token)
        .eq("owner_id", user!.id);
      if (error) throw error;
      setToken("");
      setStatus("Enlace revocado");
    } catch {
      setStatus("No se pudo revocar. Inténtalo de nuevo.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <details className="mt-7">
      <summary className="quiet-action">
        Compartir esta colección por enlace
      </summary>
      <p className="mt-2 text-sm leading-6 text-ink/70">
        Quien tenga el enlace podrá leer estas preguntas sin una cuenta. Los
        cambios se publican solo al actualizar la selección. Revocarlo impide
        nuevas visitas; no borra copias ya guardadas por otras personas.
      </p>
      <div className="mt-3 flex flex-wrap gap-4">
        <button
          disabled={busy || !questions.length}
          className="quiet-action"
          onClick={() => void publish()}
        >
          {busy
            ? "Preparando…"
            : token
              ? "Actualizar selección compartida"
              : "Activar enlace compartible"}
        </button>
        {token ? (
          <>
            <button
              className="quiet-action"
              onClick={async () => {
                try {
                  await copyText(
                    `${window.location.origin}/compartido/${token}`,
                  );
                  setStatus("Enlace copiado");
                } catch {
                  setStatus("No se pudo copiar");
                }
              }}
            >
              Copiar enlace
            </button>
            <button
              disabled={busy}
              className="quiet-action"
              onClick={() => void revoke()}
            >
              Revocar enlace
            </button>
          </>
        ) : null}
      </div>
      <p role="status" className="mt-2 text-sm">
        {status}
      </p>
    </details>
  );
}
