"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type TouchEvent } from "react";
import type { Deck } from "@/data/decks";
import { ArrowLeftIcon, ArrowRightIcon, ShuffleIcon } from "@/components/icons";
import { BrandLogo } from "@/components/BrandLogo";
import { FavoriteButton } from "@/components/FavoriteButton";
import { QuestionCard } from "@/components/QuestionCard";
import { CopyButton, ShareButton } from "@/components/ShareButton";

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

function getServerFavoritesSnapshot() {
  return emptyFavorites;
}

function writeFavorites(nextFavorites: string[]) {
  const raw = JSON.stringify(nextFavorites);
  cachedFavoritesRaw = raw;
  cachedFavoritesSnapshot = nextFavorites;
  window.localStorage.setItem(storageKey, raw);
  window.dispatchEvent(new Event(favoritesChangeEvent));
}

function useLocalFavorites() {
  return useSyncExternalStore(subscribeToFavorites, readFavorites, getServerFavoritesSnapshot);
}

export function QuestionDeckClient({
  deck,
  initialQuestionId,
  backHref
}: {
  deck: Deck;
  initialQuestionId?: string;
  backHref: string;
}) {
  const initialIndex = Math.max(
    0,
    initialQuestionId ? deck.questions.findIndex((item) => item.id === initialQuestionId) : 0
  );
  const [index, setIndex] = useState(initialIndex);
  const [status, setStatus] = useState("");
  const touchStartX = useRef<number | null>(null);
  const favorites = useLocalFavorites();

  const question = deck.questions[index];
  const isFavorite = favorites.includes(question.id);

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
    showStatus(isFavorite ? "Carta quitada" : "Carta guardada");
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
      showStatus("Carta copiada");
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

  function onTouchStart(event: TouchEvent<HTMLElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: TouchEvent<HTMLElement>) {
    if (touchStartX.current === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < 48) return;
    if (distance < 0) {
      goNext();
    } else {
      goPrevious();
    }
  }

  return (
    <section
      aria-labelledby="deck-mode-title"
      className="relative isolate flex min-h-[100dvh] overflow-hidden px-4 py-4 sm:px-6 sm:py-6"
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_10%,rgba(255,253,247,0.92),transparent_30rem),linear-gradient(180deg,#f9f2e7,#f4ead8)]" />

      <div className="mx-auto flex min-h-[calc(100dvh-2rem)] w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between gap-3">
          <Link className="rounded-full bg-white/45 px-3 py-2 text-sm font-black text-ink/68 shadow-sm backdrop-blur hover:text-ink" href={backHref}>
            Volver
          </Link>
          <div className="text-center">
            <h1 id="deck-mode-title" className="inline-flex items-center justify-center gap-2 text-sm font-black text-ink/72">
              <BrandLogo decorative variant="mark" imageClassName="h-8 w-8" />
              {deck.title}
            </h1>
            <p className="mt-1 text-xs font-bold text-ink/42">{index + 1} / {deck.questions.length}</p>
          </div>
          <Link className="rounded-full bg-white/45 px-3 py-2 text-sm font-black text-ink/68 shadow-sm backdrop-blur hover:text-ink" href="/mis-cartas">
            Guardadas
          </Link>
        </header>

        <div className="relative flex flex-1 items-center justify-center py-5 sm:py-8">
          <button
            aria-label="Pregunta anterior"
            className="paper-button deck-control-button absolute left-0 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-[1rem] px-0 lg:inline-flex"
            onClick={goPrevious}
            type="button"
          >
            <ArrowLeftIcon />
          </button>

          <QuestionCard
            deckId={deck.id}
            deckTitle={deck.category}
            footer={`Carta ${index + 1} de ${deck.questions.length}`}
            question={question.text}
            status={status}
          />

          <button
            aria-label="Siguiente pregunta"
            className="paper-button deck-control-button deck-control-button-next absolute right-0 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-[1rem] px-0 lg:inline-flex"
            onClick={goNext}
            type="button"
          >
            <ArrowRightIcon />
          </button>
        </div>

        <div className="pb-1">
          <div className="mx-auto mb-3 flex w-fit items-center gap-1.5" aria-hidden="true">
            {deck.questions.slice(0, 7).map((item, dotIndex) => (
              <span
                className={dotIndex === index % 7 ? "h-1.5 w-5 rounded-full bg-ink/50" : "h-1.5 w-1.5 rounded-full bg-ink/18"}
                key={item.id}
              />
            ))}
          </div>
          <div className="deck-control-row mx-auto flex items-center justify-center gap-2 p-1.5">
            <button
              aria-label="Pregunta anterior"
              className="paper-button deck-control-button inline-flex items-center justify-center px-0"
              onClick={goPrevious}
              type="button"
            >
              <ArrowLeftIcon />
            </button>
            <FavoriteButton active={isFavorite} className="deck-control-button min-h-11 h-11 w-11 rounded-[1rem]" onToggle={toggleFavorite} />
            <button
              aria-label="Pregunta aleatoria"
              className="paper-button deck-control-button deck-control-button-random inline-flex items-center justify-center px-0"
              onClick={goRandom}
              type="button"
            >
              <ShuffleIcon className="h-4 w-4" />
            </button>
            <CopyButton className="deck-control-button min-h-11 h-11 w-11 rounded-[1rem]" onCopy={copyQuestion} />
            <ShareButton className="deck-control-button min-h-11 h-11 w-11 rounded-[1rem]" onShare={shareQuestion} />
            <button
              aria-label="Siguiente pregunta"
              className="paper-button deck-control-button deck-control-button-next inline-flex items-center justify-center px-0"
              onClick={goNext}
              type="button"
            >
              <ArrowRightIcon />
            </button>
          </div>
          <p className="mt-3 text-center text-xs font-semibold text-ink/42 sm:hidden">Desliza para cambiar de carta</p>
        </div>
      </div>
    </section>
  );
}
