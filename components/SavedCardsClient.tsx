"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- The offline shelf needs a document navigation for the service worker. */
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { Deck, Question } from "@/data/decks";
import { getDeckThemeStyle } from "@/lib/deckTheme";
import { useLibrary } from "@/lib/useLibrary";
import {
  createCollection,
  getLibraryError,
  readLibrary,
  rawLibraryBackup,
  importLibrary,
  setFavorite,
} from "@/lib/library";
import { favoriteIds } from "@/lib/libraryModel";
import { questionHref, copyText, shareCard } from "@/lib/questionLinks";
import { HeartIcon } from "./icons";
import { FavoriteButton } from "./FavoriteButton";
import { ShareButton } from "./ShareButton";
import { CardOptions } from "./CardOptions";
import { CollectionPicker } from "./CollectionPicker";
import { DownloadQuestionButton } from "./DownloadQuestionButton";
import { AccountSummary } from "./AccountProvider";

type SavedQuestion = Question & { deckTitle: string; deckSlug: string };
export function SavedCardsClient({
  decks,
  offline = false,
}: {
  decks: Deck[];
  offline?: boolean;
}) {
  const library = useLibrary();
  const [status, setStatus] = useState("");
  const [undo, setUndo] = useState<string | null>(null);
  const [name, setName] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const catalogue = useMemo(
    () =>
      new Map(
        decks.flatMap((deck) =>
          deck.questions.map(
            (question) =>
              [
                question.id,
                {
                  ...question,
                  deckTitle: deck.title,
                  deckSlug: deck.seoSlug,
                } as SavedQuestion,
              ] as const,
          ),
        ),
      ),
    [decks],
  );
  const questions = new Map(catalogue);
  for (const [id, item] of Object.entries(library.custom))
    if (!item.deleted)
      questions.set(id, {
        id,
        text: item.text,
        deckId: "custom",
        category: "Tus preguntas",
        intensity: "casual",
        tags: [],
        locale: "es",
        deckTitle: "Tus preguntas",
        deckSlug: "",
      });
  const saved = favoriteIds(library)
    .map((id) => questions.get(id))
    .filter((q): q is SavedQuestion => Boolean(q));
  const collections = Object.entries(library.collections).filter(
    ([, value]) => !value.deleted,
  );
  function run(action: () => void, message: string) {
    try {
      action();
      setStatus(message);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "No se pudo guardar");
    }
  }
  async function perform(action: () => Promise<string>) {
    try {
      const message = await action();
      if (message) setStatus(message);
    } catch {
      setStatus("No se pudo completar. Inténtalo de nuevo.");
    }
  }
  function exportCopy() {
    try {
      const state = readLibrary();
      const raw = getLibraryError()
        ? rawLibraryBackup()
        : JSON.stringify(state, null, 2);
      if (!raw) throw new Error("No se pudo leer una copia de tus cartas.");
      const url = URL.createObjectURL(
        new Blob([raw], {
          type: "application/json",
        }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "pregunton-mis-cartas.json";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus("Copia exportada");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "No se pudo exportar");
    }
  }
  return (
    <section className="mx-auto max-w-4xl px-4 py-7 sm:px-6 sm:py-10">
      <header>
        <p className="text-sm font-bold text-coral">Tu pequeña colección</p>
        <h1 className="display-serif mt-2 text-4xl sm:text-5xl">Mis cartas</h1>
        <p className="mt-3 text-ink/70">
          {saved.length
            ? `${saved.length} ${saved.length === 1 ? "carta guardada" : "cartas guardadas"}`
            : "Cuando una pregunta te guste, toca el corazón."}
        </p>
      </header>
      <div className="mt-5">
        <AccountSummary />
      </div>
      <a className="quiet-action" href="#collections-title">
        Organizar en colecciones
      </a>
      {offline ? (
        <p className="text-sm text-ink/70">
          Aquí aparecen tus preguntas propias y las cartas de los mazos
          descargados.
        </p>
      ) : null}
      <div className="min-h-8 py-2 text-sm text-ink/80" role="status">
        {getLibraryError() || status}{" "}
        {undo ? (
          <button
            className="ml-2 min-h-11 font-bold underline"
            onClick={() =>
              run(() => {
                setFavorite(undo, true);
                setUndo(null);
              }, "Carta restaurada")
            }
          >
            Deshacer
          </button>
        ) : null}
      </div>

      {!saved.length ? (
        <div className="py-12">
          <HeartIcon className="h-8 w-8 text-coral" />
          <h2 className="display-serif mt-4 text-2xl">
            Una carta que querrás volver a leer
          </h2>
          <p className="mt-2 text-ink/70">
            Saca una pregunta y guarda las que te gusten.
          </p>
          <Link
            prefetch={false}
            className="paper-button paper-button-ink mt-5 inline-flex min-h-12 items-center rounded-xl px-5 font-bold"
            href="/mazos"
          >
            Elegir un mazo
          </Link>
        </div>
      ) : (
        <ol className="mt-7 grid gap-5 sm:grid-cols-2">
          {saved.map((question) => (
            <li
              key={question.id}
              className="paper-surface rounded-2xl p-5"
              style={getDeckThemeStyle(question.deckId)}
            >
              <p className="text-sm font-bold text-[color:var(--deck-ink)]">
                {question.deckTitle}
              </p>
              <p className="display-serif mt-3 text-2xl leading-tight">
                “{question.text}”
              </p>
              <div className="mt-5 flex items-center gap-2">
                <a
                  className="quiet-action mr-auto"
                  href={
                    offline
                      ? question.deckId === "custom"
                        ? `/sin-conexion#carta=${question.id}`
                        : `/sin-conexion#mazo=${question.deckSlug}&q=${question.id}`
                      : question.deckId === "custom"
                        ? `/mi-carta/${question.id}`
                        : questionHref(question.deckSlug, question.id)
                  }
                >
                  Abrir carta →
                </a>
                <ShareButton
                  className="reader-icon"
                  onShare={() =>
                    void perform(() =>
                      shareCard(
                        question.deckTitle,
                        question.shareText ?? question.text,
                        question.deckId === "custom"
                          ? null
                          : questionHref(question.deckSlug, question.id),
                      ),
                    )
                  }
                />
                <FavoriteButton
                  className="reader-icon"
                  active
                  onToggle={() =>
                    run(() => {
                      setFavorite(question.id, false);
                      setUndo(question.id);
                    }, "Carta quitada")
                  }
                />
              </div>
              <CardOptions>
                <button
                  className="quiet-action"
                  onClick={() =>
                    void perform(async () => {
                      await copyText(question.shareText ?? question.text);
                      return "Carta copiada";
                    })
                  }
                >
                  Copiar pregunta
                </button>
                <DownloadQuestionButton
                  question={question}
                  deckTitle={question.deckTitle}
                />
                <CollectionPicker
                  questionId={question.id}
                  onStatus={setStatus}
                />
              </CardOptions>
            </li>
          ))}
        </ol>
      )}
      <section
        aria-labelledby="collections-title"
        className="mt-2 border-y border-dashed border-ink/15 py-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="collections-title" className="display-serif text-2xl">
            Tus colecciones
          </h2>
          <a className="quiet-action" href="/sin-conexion">
            Mazos sin conexión
          </a>
        </div>
        {collections.length ? (
          <ul className="mt-3 space-y-2">
            {collections.map(([id, item]) => {
              const count = Object.values(library.members).filter(
                (member) =>
                  member.collectionId === id &&
                  member.active &&
                  questions.has(member.questionId),
              ).length;
              return (
                <li key={id}>
                  <a
                    className="collection-row"
                    href={
                      offline
                        ? `/sin-conexion#coleccion=${id}`
                        : `/coleccion/${id}`
                    }
                  >
                    <span className="font-bold">{item.name}</span>
                    <span className="text-sm text-ink/70">
                      {count} {count === 1 ? "carta" : "cartas"} →
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-2 text-sm leading-6 text-ink/70">
            Reúne preguntas para un viaje, una cena o una tarde juntos.
          </p>
        )}
        <form
          className="mt-4 flex flex-wrap items-end gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            run(() => {
              createCollection(name);
              setName("");
            }, "Colección creada. Añade cartas desde Más opciones.");
          }}
        >
          <label
            className="min-w-0 flex-1 text-sm font-bold"
            htmlFor="collection-name"
          >
            Nombre de la colección
            <input
              id="collection-name"
              className="paper-input mt-1 w-full"
              maxLength={60}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Para el viaje"
              required
            />
          </label>
          <button
            className="paper-button min-h-12 rounded-xl px-4 text-sm font-bold"
            disabled={!name.trim()}
          >
            Crear colección
          </button>
        </form>
      </section>
      <details className="mt-8 border-t border-dashed border-ink/15 pt-4">
        <summary className="quiet-action">
          Conservar una copia de mis cartas
        </summary>
        <p className="mt-2 text-sm leading-6 text-ink/70">
          Exporta tus cartas y colecciones. Al importar una copia se añaden las
          cartas sin borrar las que ya tienes.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button
            className="paper-button min-h-12 rounded-xl px-4"
            onClick={exportCopy}
          >
            Exportar copia
          </button>
          <label className="paper-button relative inline-flex min-h-12 cursor-pointer items-center rounded-xl px-4">
            Importar copia
            <input
              ref={input}
              type="file"
              accept="application/json,.json"
              className="absolute inset-0 w-full cursor-pointer opacity-0"
              aria-label="Importar copia de cartas"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                try {
                  if (file.size > 2000000)
                    throw new Error("La copia es demasiado grande.");
                  importLibrary(JSON.parse(await file.text()));
                  setStatus("Copia importada");
                } catch (error) {
                  setStatus(
                    error instanceof Error
                      ? error.message
                      : "No se pudo importar",
                  );
                }
                if (input.current) input.current.value = "";
              }}
            />
          </label>
        </div>
      </details>
    </section>
  );
}
