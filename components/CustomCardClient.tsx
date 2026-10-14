"use client";
import Link from "next/link";
import { useLibrary } from "@/lib/useLibrary";
import { QuestionDeckClient } from "./QuestionDeckClient";
import type { Deck } from "@/data/decks";
export function CustomCardClient({ id }: { id: string }) {
  const library = useLibrary();
  const item = library.custom[id];
  if (!item || item.deleted)
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="display-serif text-3xl">
          Esta carta no está en este dispositivo
        </h1>
        <Link prefetch={false} className="quiet-action mt-4" href="/mis-cartas">
          Volver a Mis cartas
        </Link>
      </main>
    );
  const deck: Deck = {
    id: `one-${id}`,
    title: "Tus preguntas",
    category: "Carta propia",
    description: "",
    seoSlug: "",
    intensity: "casual",
    tags: [],
    tone: "cercano",
    questionCount: 1,
    questions: [
      {
        id,
        text: item.text,
        deckId: "custom",
        category: "Carta propia",
        intensity: "casual",
        tags: [],
        locale: "es",
      },
    ],
  };
  return (
    <main>
      <QuestionDeckClient
        deck={deck}
        collection
        questionPaths={{ [id]: null }}
        backHref="/mis-cartas"
      />
    </main>
  );
}
