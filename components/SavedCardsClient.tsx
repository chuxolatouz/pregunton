"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import type { Deck, Question } from "@/data/decks";
import { CopyButton, ShareButton } from "@/components/ShareButton";
import { HeartIcon } from "@/components/icons";

const storageKey = "pregunton:favorites";
const favoritesChangeEvent = "pregunton:favorites-change";
const emptyFavorites: string[] = [];
let cachedFavoritesRaw: string | null = null;
let cachedFavoritesSnapshot: string[] = emptyFavorites;

function readFavorites() {
  if (typeof window === "undefined") return emptyFavorites;

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      cachedFavoritesRaw = null;
      cachedFavoritesSnapshot = emptyFavorites;
      return cachedFavoritesSnapshot;
    }

    if (raw === cachedFavoritesRaw) {
      return cachedFavoritesSnapshot;
    }

    const parsed = JSON.parse(raw);
    cachedFavoritesRaw = raw;
    cachedFavoritesSnapshot = Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : emptyFavorites;

    return cachedFavoritesSnapshot;
  } catch {
    cachedFavoritesSnapshot = emptyFavorites;
    return cachedFavoritesSnapshot;
  }
}

function subscribeToFavorites(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(favoritesChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(favoritesChangeEvent, onStoreChange);
  };
}

function writeFavorites(nextFavorites: string[]) {
  const raw = JSON.stringify(nextFavorites);
  cachedFavoritesRaw = raw;
  cachedFavoritesSnapshot = nextFavorites;
  window.localStorage.setItem(storageKey, raw);
  window.dispatchEvent(new Event(favoritesChangeEvent));
}

function savedCountText(count: number) {
  if (count === 0) return "No tienes preguntas guardadas todavía.";
  if (count === 1) return "Tienes 1 pregunta guardada.";
  return `Tienes ${count} preguntas guardadas.`;
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

type SavedQuestion = Question & {
  deckTitle: string;
  deckSlug: string;
};

export function SavedCardsClient({ decks }: { decks: Deck[] }) {
  const favorites = useSyncExternalStore(subscribeToFavorites, readFavorites, () => emptyFavorites);

  const savedQuestions = useMemo(() => {
    const questionById = new Map<string, SavedQuestion>();

    for (const deck of decks) {
      for (const question of deck.questions) {
        questionById.set(question.id, {
          ...question,
          deckTitle: deck.title,
          deckSlug: deck.seoSlug
        });
      }
    }

    return favorites.map((id) => questionById.get(id)).filter(Boolean) as SavedQuestion[];
  }, [decks, favorites]);

  function removeFavorite(id: string) {
    writeFavorites(favorites.filter((favoriteId) => favoriteId !== id));
  }

  async function shareQuestion(question: SavedQuestion) {
    const text = question.shareText ?? question.text;

    if (navigator.share) {
      try {
        await navigator.share({
          title: question.deckTitle,
          text,
          url: `${window.location.origin}/mazo/${question.deckSlug}`
        });
        return;
      } catch {
        return;
      }
    }

    await copyText(text);
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="max-w-2xl">
        <p className="paper-label inline-flex rotate-[-1deg] rounded-[0.8rem] px-3 py-2 text-sm font-black uppercase tracking-[0.14em] text-coral">
          Cartas guardadas
        </p>
        <h1 className="display-serif mt-4 text-5xl font-bold leading-tight text-ink sm:text-6xl">Mis cartas</h1>
        <p className="mt-4 text-lg leading-8 text-ink/70">{savedCountText(savedQuestions.length)}</p>
      </div>

      {savedQuestions.length === 0 ? (
        <div className="paper-surface mt-8 rounded-[1.2rem] p-6">
          <p className="text-base leading-7 text-ink/70">
            Cuando una pregunta te guste, toca el corazón en modo cartas. Aquí aparecerán tus favoritas de este dispositivo.
          </p>
          <Link className="paper-button mt-5 inline-flex rounded-[1rem] bg-ink px-5 py-3 font-black text-white" href="/mazo/preguntas-para-charlar">
            Sacar carta
          </Link>
        </div>
      ) : (
        <ol className="mt-8 grid gap-4">
          {savedQuestions.map((question) => (
            <li className="paper-surface rounded-[1.1rem] p-5" key={question.id}>
              <p className="text-sm font-black text-coral">{question.deckTitle}</p>
              <p className="display-serif mt-3 text-2xl font-bold leading-tight text-ink">“{question.text}”</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link className="paper-button inline-flex min-h-12 items-center rounded-[0.95rem] px-4 text-sm font-black" href={`/mazo/${question.deckSlug}`}>
                  Abrir mazo
                </Link>
                <CopyButton onCopy={() => copyText(question.shareText ?? question.text)} />
                <ShareButton onShare={() => shareQuestion(question)} />
                <button
                  aria-label="Quitar de guardadas"
                  className="paper-button inline-flex h-12 w-12 items-center justify-center rounded-[0.95rem] px-0 text-coral"
                  onClick={() => removeFavorite(question.id)}
                  type="button"
                >
                  <HeartIcon filled />
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
