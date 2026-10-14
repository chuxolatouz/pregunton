"use client";
import Link from "next/link";
import { useState } from "react";
import { ImportGuestButton, useAccount } from "./AccountProvider";
export function AccountClient() {
  const account = useAccount();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState(false);
  async function run(action: () => Promise<void>, success: string) {
    setBusy(true);
    try {
      await action();
      setMessage(success);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "No se pudo completar",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="mx-auto max-w-xl px-4 py-10">
      <Link className="quiet-action" href="/mis-cartas">
        ← Mis cartas
      </Link>
      <h1 className="display-serif mt-5 text-4xl">Tus cartas, contigo</h1>
      <p className="mt-4 leading-7 text-ink/70">
        Una cuenta para conservar tus favoritos, colecciones y la última carta
        que leíste en otros dispositivos.
      </p>
      {!account.configured ? (
        <p className="mt-6 leading-7">
          La sincronización todavía no está disponible. Puedes seguir guardando
          cartas en este dispositivo y exportar una copia desde Mis cartas.
        </p>
      ) : account.user ? (
        <div className="mt-6 space-y-3">
          <p className="font-bold break-words">{account.user.email}</p>
          <p role="status">{account.status}</p>
          <button
            className="quiet-action"
            disabled={busy}
            onClick={() => void account.synchronize()}
          >
            Sincronizar ahora
          </button>
          <ImportGuestButton onStatus={setMessage} />
          <p className="text-sm leading-6 text-ink/70">
            Tus colecciones son privadas. La cuenta guarda favoritos,
            colecciones y progreso. Puedes exportarlos desde Mis cartas.
          </p>
          <button
            className="quiet-action"
            disabled={busy}
            onClick={() => void run(account.logout, "Sesión cerrada")}
          >
            Cerrar sesión en este dispositivo
          </button>
          <details className="pt-4">
            <summary className="quiet-action">
              Eliminar mis datos guardados
            </summary>
            <p className="mt-2 text-sm leading-6">
              Se eliminarán favoritos, colecciones y progreso de esta cuenta. El
              correo de acceso permanece. Exporta una copia antes de hacerlo.
            </p>
            <label className="mt-3 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={confirm}
                onChange={(event) => setConfirm(event.target.checked)}
              />
              Quiero eliminar mis datos
            </label>
            <button
              className="quiet-action mt-2"
              disabled={busy || !confirm}
              onClick={() =>
                void run(
                  account.erase,
                  "Datos borrados en este dispositivo. Comprueba el estado de sincronización para confirmar el borrado en la cuenta.",
                )
              }
            >
              Eliminar datos
            </button>
          </details>
        </div>
      ) : (
        <form
          className="mt-7 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void run(
              () => account.requestEmail(email),
              "Revisa tu correo: te enviamos un enlace para entrar. Si expiró, solicita uno nuevo.",
            );
          }}
        >
          <label htmlFor="email" className="block text-sm font-bold">
            Tu correo
            <input
              id="email"
              className="paper-input mt-2 w-full"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <button
            className="paper-button paper-button-ink min-h-12 w-full rounded-xl font-bold"
            disabled={busy}
          >
            {busy ? "Enviando…" : "Recibir enlace para entrar"}
          </button>
          <p className="text-sm leading-6 text-ink/70">
            Usamos tu correo para darte acceso a tus cartas. Al entrar podrás
            añadir las que ya guardaste como invitado.
          </p>
        </form>
      )}
      <p className="mt-4 min-h-8 text-sm leading-6" role="status">
        {message}
      </p>
      <Link className="quiet-action mt-4" href="/mis-cartas">
        Seguir con mis cartas
      </Link>
    </section>
  );
}
