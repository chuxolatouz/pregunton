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
          <p className="paper-label inline-flex rotate-[-1deg] rounded-[0.75rem] px-3 py-2 text-sm font-black uppercase tracking-[0.14em] text-coral">Modo cartas</p>
          <h1 id="deck-mode-title" className="display-serif mt-3 text-4xl font-bold text-ink sm:text-6xl">
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

      <aside className="paper-surface rounded-[1.1rem] p-5">
        <h2 className="display-serif text-2xl font-bold text-ink">Favoritas de este mazo</h2>
        <p className="mt-2 text-sm leading-6 text-ink/65">
          Tienes {favoriteCount} pregunta{favoriteCount === 1 ? "" : "s"} guardada{favoriteCount === 1 ? "" : "s"} de este mazo en este dispositivo.
        </p>
        {deck.source ? (
          <div className="mt-4 rounded-[0.8rem] border border-dashed border-ink/15 bg-white/45 p-3 text-xs leading-5 text-ink/62">
            <p className="font-black text-ink/70">Referencia verificable</p>
            <a className="mt-1 inline-flex font-bold underline decoration-dashed underline-offset-4 hover:text-ink" href={deck.source.url} rel="noreferrer" target="_blank">
              {deck.source.label}
            </a>
            {deck.source.note ? <p className="mt-2">{deck.source.note}</p> : null}
          </div>
        ) : null}
        <div className="mt-5 space-y-3">
          {deck.questions
            .filter((item) => favorites.includes(item.id))
            .slice(0, 5)
            .map((item) => (
              <p className="rounded-[0.8rem] border border-dashed border-ink/15 bg-white/45 p-3 text-sm leading-6 text-ink/72" key={item.id}>
                {item.text}
              </p>
            ))}
          {favoriteCount === 0 ? (
            <p className="rounded-[0.8rem] border border-dashed border-ink/15 bg-white/45 p-3 text-sm leading-6 text-ink/60">
              Marca una pregunta con el corazón para volver a ella luego.
            </p>
          ) : null}
        </div>
      </aside>
    </section>
  );
}
