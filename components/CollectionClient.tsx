"use client";
import Link from "next/link";
import { useState } from "react";
import type { Deck, Question } from "@/data/decks";
import { useLibrary } from "@/lib/useLibrary";
import {
  setMembership,
  updateCollection,
  addCustomQuestion,
} from "@/lib/library";
import { questionHref } from "@/lib/questionLinks";
import { useAccount } from "./AccountProvider";
import { ShareCollection } from "./ShareCollection";
import { QuestionDeckClient } from "./QuestionDeckClient";
export function CollectionClient({ id, decks }: { id: string; decks: Deck[] }) {
  const library = useLibrary();
  const { user } = useAccount();
  const collection = library.collections[id];
  const [customText, setCustomText] = useState("");
  const [reading, setReading] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const custom: Question[] = Object.entries(library.custom)
    .filter(([, item]) => !item.deleted)
    .map(([key, item]) => ({
      id: key,
      text: item.text,
      deckId: "custom",
      category: "Tus preguntas",
      intensity: "casual",
      tags: [],
      locale: "es",
    }));
  const questions = [
    ...decks.flatMap((deck) => deck.questions),
    ...custom,
  ].filter((q) => library.members[`${id}:${q.id}`]?.active);
  function act(action: () => void, message: string) {
    try {
      action();
      setStatus(message);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "No se pudo guardar");
    }
  }
  async function removeCollection() {
    if (user) {
      try {
        const { getSupabase } = await import("@/lib/supabase");
        const { error } = await getSupabase()
          .from("shared_decks")
          .delete()
          .eq("owner_id", user.id)
          .eq("collection_id", id);
        if (error) throw error;
      } catch {
        setStatus(
          "No se pudo revocar el enlace. Vuelve a intentarlo con conexión.",
        );
        return;
      }
    }
    act(
      () => updateCollection(id, collection.name, true),
      "Colección eliminada",
    );
  }
  if (!collection || collection.deleted)
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="display-serif text-3xl">
          Esta colección no está en tus cartas
        </h1>
        <p className="mt-3 text-ink/70">
          Vuelve a Mis cartas para elegir o crear una colección.
        </p>
        {collection?.deleted ? (
          <button
            className="quiet-action mt-3"
            onClick={() =>
              act(
                () => updateCollection(id, collection.name),
                "Colección restaurada",
              )
            }
          >
            Deshacer eliminación
          </button>
        ) : null}
        <Link className="quiet-action mt-3" href="/mis-cartas">
          Volver a Mis cartas
        </Link>
      </main>
    );
  if (reading && questions.length) {
    const deck: Deck = {
      id: `collection-${id}`,
      title: collection.name,
      category: "Tu colección",
      tone: "cercano",
      description: "Preguntas elegidas por ti",
      intensity: "casual",
      tags: [],
      questionCount: questions.length,
      seoSlug: "",
      questions,
    };
    const paths: Record<string, string | null> = Object.fromEntries(
      decks.flatMap((d) =>
        d.questions.map((q) => [q.id, questionHref(d.seoSlug, q.id)]),
      ),
    );
    for (const q of custom) paths[q.id] = null;
    return (
      <main>
        <QuestionDeckClient
          key={id}
          deck={deck}
          backHref="/mis-cartas"
          collection
          questionPaths={paths}
        />
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link className="quiet-action" href="/mis-cartas">
        ← Mis cartas
      </Link>
      <h1 className="display-serif mt-5 text-4xl">{collection.name}</h1>
      <p className="mt-3 text-ink/70">
        {questions.length}{" "}
        {questions.length === 1 ? "carta elegida" : "cartas elegidas"} por ti
      </p>
      <p role="status" className="min-h-8 py-2 text-sm">
        {status}
      </p>
      {questions.length ? (
        <>
          <button
            className="paper-button paper-button-ink min-h-12 rounded-xl px-5 font-bold"
            onClick={() => setReading(true)}
          >
            Abrir como mazo
          </button>
          <ol className="mt-6 space-y-4">
            {questions.map((q) => (
              <li
                key={q.id}
                className="border-b border-dashed border-ink/15 pb-4"
              >
                <p className="display-serif text-2xl">{q.text}</p>
                <div className="mt-2 flex flex-wrap gap-4">
                  <Link
                    className="quiet-action"
                    href={
                      q.deckId === "custom"
                        ? `/mi-carta/${q.id}`
                        : questionHref(
                            decks.find((d) => d.id === q.deckId)!.seoSlug,
                            q.id,
                          )
                    }
                  >
                    Abrir carta
                  </Link>
                  <button
                    className="quiet-action"
                    onClick={() =>
                      act(
                        () => setMembership(id, q.id, false),
                        "Carta quitada de la colección",
                      )
                    }
                  >
                    Quitar de la colección
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <p className="py-5 leading-7">
          Añade cartas desde «Más opciones» en cualquier pregunta o en tus
          guardadas.{" "}
          <Link className="font-bold underline" href="/mazos">
            Elegir un mazo
          </Link>
        </p>
      )}
      <form
        className="mt-7 border-t border-dashed border-ink/15 pt-5"
        onSubmit={(event) => {
          event.preventDefault();
          act(() => {
            addCustomQuestion(id, customText);
            setCustomText("");
          }, "Pregunta añadida");
        }}
      >
        <label htmlFor="custom-question" className="block text-sm font-bold">
          Escribe una pregunta propia
          <textarea
            id="custom-question"
            className="paper-input mt-2 w-full"
            rows={3}
            maxLength={145}
            value={customText}
            onChange={(event) => setCustomText(event.target.value)}
            required
            placeholder="¿Qué lugar te gustaría descubrir juntos?"
          />
        </label>
        <p className="mt-1 text-xs text-ink/70">
          {customText.length}/145 · Léela en voz alta antes de guardarla.
        </p>
        <p className="display-serif mt-3 text-xl">
          {customText || "Tu pregunta aparecerá aquí."}
        </p>
        <button className="quiet-action mt-2" disabled={!customText.trim()}>
          Añadir pregunta
        </button>
      </form>
      <ShareCollection
        collectionId={id}
        title={collection.name}
        questions={questions}
      />
      <details className="mt-8">
        <summary className="quiet-action">Editar colección</summary>
        <form
          className="mt-3 flex flex-wrap gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            act(() => updateCollection(id, name), "Nombre actualizado");
          }}
        >
          <label htmlFor="rename" className="text-sm font-bold">
            Nuevo nombre
            <input
              id="rename"
              className="paper-input ml-2"
              placeholder={collection.name}
              maxLength={60}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <button className="quiet-action" disabled={!name.trim()}>
            Guardar nombre
          </button>
        </form>
        <button
          className="quiet-action mt-3"
          onClick={() => void removeCollection()}
        >
          Eliminar colección
        </button>
      </details>
    </main>
  );
}
