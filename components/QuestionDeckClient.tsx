"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { Deck } from "@/data/decks";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ProgressBar } from "@/components/ProgressBar";
import { QuestionCard } from "@/components/QuestionCard";
import { QuestionControls } from "@/components/QuestionControls";
import { CopyButton, ShareButton } from "@/components/ShareButton";

const storageKey = "pregunton:favorites";
const favoritesChangeEvent = "pregunton:favorites-change";

function readFavorites() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
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

function getServerFavoritesSnapshot() {
  return [];
}

function writeFavorites(nextFavorites: string[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(nextFavorites));
  window.dispatchEvent(new Event(favoritesChangeEvent));
}

function useLocalFavorites() {
  return useSyncExternalStore(subscribeToFavorites, readFavorites, getServerFavoritesSnapshot);
}

export function QuestionDeckClient({ deck }: { deck: Deck }) {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("");
  const favorites = useLocalFavorites();

  const question = deck.questions[index];
  const isFavorite = favorites.includes(question.id);

  const favoriteCount = useMemo(
    () => deck.questions.filter((item) => favorites.includes(item.id)).length,
    [deck.questions, favorites]
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        setIndex((value) => (value + 1) % deck.questions.length);
      }

      if (event.key === "ArrowLeft") {
        setIndex((value) => (value - 1 + deck.questions.length) % deck.questions.length);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [deck.questions.length]);

  function showStatus(message: string) {
    setStatus(message);
    window.setTimeout(() => setStatus(""), 1800);
  }

  function goNext() {
    setIndex((value) => (value + 1) % deck.questions.length);
  }

  function goPrevious() {
    setIndex((value) => (value - 1 + deck.questions.length) % deck.questions.length);
  }

  function goRandom() {
    if (deck.questions.length <= 1) return;

    let nextIndex = Math.floor(Math.random() * deck.questions.length);
    if (nextIndex === index) {
      nextIndex = (nextIndex + 1) % deck.questions.length;
    }
    setIndex(nextIndex);
  }

  function toggleFavorite() {
    const nextFavorites = isFavorite
      ? favorites.filter((id) => id !== question.id)
      : [...favorites, question.id];

    writeFavorites(nextFavorites);
    showStatus(isFavorite ? "Quitada" : "Guardada");
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

  async function copyQuestion() {
    try {
      await copyText(question.shareText ?? question.text);
      showStatus("Copiada");
    } catch {
      showStatus("No se pudo copiar");
    }
  }

  async function shareQuestion() {
    const shareData = {
      title: deck.title,
      text: question.shareText ?? question.text,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showStatus("Lista para compartir");
        return;
      } catch {
        return;
      }
    }

    await copyQuestion();
  }

  return (
    <section aria-labelledby="deck-mode-title" className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_320px] lg:items-start">
      <div className="space-y-5">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-coral">Modo cartas</p>
          <h1 id="deck-mode-title" className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-5xl">
            {deck.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-ink/68">{deck.description}</p>
        </div>
        <ProgressBar current={index + 1} total={deck.questions.length} />
        <QuestionCard deckId={deck.id} deckTitle={deck.category} question={question.text} status={status} />
        <QuestionControls onNext={goNext} onPrevious={goPrevious} onRandom={goRandom} />
        <div className="flex items-center justify-center gap-3">
          <FavoriteButton active={isFavorite} onToggle={toggleFavorite} />
          <CopyButton onCopy={copyQuestion} />
          <ShareButton onShare={shareQuestion} />
        </div>
      </div>

      <aside className="rounded-[1.5rem] border border-ink/10 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-black text-ink">Favoritas de este mazo</h2>
        <p className="mt-2 text-sm leading-6 text-ink/65">
          Tienes {favoriteCount} pregunta{favoriteCount === 1 ? "" : "s"} guardada{favoriteCount === 1 ? "" : "s"} de este mazo en este dispositivo.
        </p>
        <div className="mt-5 space-y-3">
          {deck.questions
            .filter((item) => favorites.includes(item.id))
            .slice(0, 5)
            .map((item) => (
              <p className="rounded-2xl bg-paper p-3 text-sm leading-6 text-ink/72" key={item.id}>
                {item.text}
              </p>
            ))}
          {favoriteCount === 0 ? (
            <p className="rounded-2xl bg-paper p-3 text-sm leading-6 text-ink/60">
              Marca una pregunta con el corazón para volver a ella luego.
            </p>
          ) : null}
        </div>
      </aside>
    </section>
  );
}
