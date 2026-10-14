"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Full navigations allow the service worker to serve the offline shell. */
import { useEffect, useState, useSyncExternalStore } from "react";
import type { Deck, Question } from "@/data/decks";
import {
  getOfflineSnapshot,
  getOfflineServer,
  offlineDeckIds,
  subscribeOffline,
} from "@/lib/offline";
import { useLibrary } from "@/lib/useLibrary";
import { QuestionDeckClient } from "./QuestionDeckClient";
import { CustomCardClient } from "./CustomCardClient";
import { SavedCardsClient } from "./SavedCardsClient";
import { OfflineButton } from "./OfflineButton";
import { questionHref } from "@/lib/questionLinks";
export function OfflineClient({ decks }: { decks: Deck[] }) {
  const raw = useSyncExternalStore(
    subscribeOffline,
    getOfflineSnapshot,
    getOfflineServer,
  );
  const ids = offlineDeckIds(raw);
  const library = useLibrary();
  const [card, setCard] = useState("");
  const [view, setView] = useState("");
  const [slug, setSlug] = useState("");
  const [q, setQ] = useState<string | undefined>(undefined);
  const [collectionId, setCollectionId] = useState("");
  useEffect(() => {
    function navigate(event: MouseEvent) {
      if (
        navigator.onLine ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor = (event.target as HTMLElement).closest("a");
      if (
        anchor &&
        anchor.origin === location.origin &&
        !anchor.download &&
        !anchor.target
      ) {
        event.preventDefault();
        location.assign(anchor.href);
      }
    }
    document.addEventListener("click", navigate, true);
    const readLocation = () => {
      const params = new URLSearchParams(
        window.location.hash.slice(1) || window.location.search,
      );
      setSlug(params.get("mazo") ?? "");
      setView(params.get("vista") ?? "");
      setCard(params.get("carta") ?? "");
      setQ(params.get("q") ?? undefined);
      setCollectionId(params.get("coleccion") ?? "");
    };
    const timeout = setTimeout(readLocation, 0);
    window.addEventListener("hashchange", readLocation);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("hashchange", readLocation);
      document.removeEventListener("click", navigate, true);
    };
  }, []);
  if (card) return <CustomCardClient id={card} />;
  if (view === "guardadas")
    return (
      <div>
        <a className="quiet-action mx-4 mt-4" href="/sin-conexion">
          ← Mazos sin conexión
        </a>
        <SavedCardsClient
          decks={decks.filter((deck) => ids.includes(deck.id))}
          offline
        />
      </div>
    );
  const selected = decks.find(
    (deck) => deck.seoSlug === slug && ids.includes(deck.id),
  );
  if (selected)
    return (
      <QuestionDeckClient
        key={`${selected.id}:${q}`}
        deck={selected}
        initialQuestionId={q}
        backHref="/sin-conexion"
      />
    );
  const collection = library.collections[collectionId];
  const custom: Question[] = Object.entries(library.custom)
    .filter(([, item]) => !item.deleted)
    .map(([id, item]) => ({
      id,
      text: item.text,
      deckId: "custom",
      category: "Tus preguntas",
      intensity: "casual",
      tags: [],
      locale: "es",
    }));
  const questions = [
    ...custom,
    ...decks
      .filter((deck) => ids.includes(deck.id))
      .flatMap((deck) => deck.questions),
  ].filter(
    (question) => library.members[`${collectionId}:${question.id}`]?.active,
  );
  if (collection && !collection.deleted && questions.length) {
    const deck: Deck = {
      id: `collection-${collectionId}`,
      title: collection.name,
      category: "Tu colección",
      description: "",
      tone: "cercano",
      seoSlug: "",
      intensity: "casual",
      tags: [],
      questions,
      questionCount: questions.length,
    };
    const paths: Record<string, string | null> = Object.fromEntries(
      decks.flatMap((d) =>
        d.questions.map((item) => [item.id, questionHref(d.seoSlug, item.id)]),
      ),
    );
    for (const q of custom) paths[q.id] = null;
    return (
      <QuestionDeckClient
        key={collectionId}
        deck={deck}
        collection
        questionPaths={paths}
        backHref="/sin-conexion"
      />
    );
  }
  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <a className="quiet-action" href="/sin-conexion#vista=guardadas">
        ← Mis cartas
      </a>
      <h1 className="display-serif mt-4 text-4xl">Mazos sin conexión</h1>
      <p className="mt-3 leading-7 text-ink/70">
        Guarda un mazo con conexión. Después podrás abrirlo desde aquí, incluso
        cuando no haya cobertura.
      </p>
      {slug || collectionId ? (
        <p className="mt-4" role="status">
          No hay cartas descargadas para esa selección. Elige uno de tus mazos
          disponibles.
        </p>
      ) : null}
      <div className="mt-5 border-y border-dashed border-ink/15 py-3">
        <h2 className="display-serif text-2xl">Tus colecciones</h2>
        <ul>
          {Object.entries(library.collections)
            .filter(([, item]) => !item.deleted)
            .map(([id, item]) => (
              <li key={id}>
                <a
                  className="quiet-action"
                  href={`/sin-conexion#coleccion=${id}`}
                >
                  {item.name} →
                </a>
              </li>
            ))}
        </ul>
      </div>
      <ul className="mt-7 space-y-5">
        {decks.map((deck) => (
          <li
            key={deck.id}
            className="border-b border-dashed border-ink/15 pb-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="display-serif text-2xl">{deck.title}</h2>
              {ids.includes(deck.id) ? (
                <a
                  className="quiet-action"
                  href={`/sin-conexion#mazo=${deck.seoSlug}`}
                >
                  Abrir mazo →
                </a>
              ) : null}
            </div>
            <OfflineButton deckId={deck.id} />
          </li>
        ))}
      </ul>
    </section>
  );
}
