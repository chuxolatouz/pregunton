"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import type { Deck } from "@/data/decks";
import { getDeckThemeStyle } from "@/lib/deckTheme";
import { ArrowLeftIcon, ArrowRightIcon, HeartIcon } from "@/components/icons";
import { DeckThemeIcon } from "@/components/DeckThemeIcon";
import { FavoriteButton } from "@/components/FavoriteButton";
import { QuestionCard } from "@/components/QuestionCard";
import { ShareButton } from "@/components/ShareButton";
import { DownloadQuestionButton } from "@/components/DownloadQuestionButton";
import { CardOptions } from "./CardOptions";
import { CollectionPicker } from "./CollectionPicker";
import { useLibrary } from "@/lib/useLibrary";
import {
  changeLibrary,
  getLibraryScope,
  readLibrary,
  setFavorite,
  saveSharedQuestion,
} from "@/lib/library";
import { questionHref, copyText, shareCard } from "@/lib/questionLinks";
import { restoreSession, shuffled, type DeckSession } from "@/lib/deckSession";
import { OfflineButton } from "./OfflineButton";

export function QuestionDeckClient({
  deck,
  initialQuestionId,
  backHref,
  collection = false,
  questionPaths,
}: {
  deck: Deck;
  initialQuestionId?: string;
  backHref: string;
  collection?: boolean;
  questionPaths?: Record<string, string | null>;
}) {
  const ids = deck.questions.map((question) => question.id);
  const [session, setSession] = useState<DeckSession>(() =>
    restoreSession(ids, undefined, initialQuestionId),
  );
  const [status, setStatus] = useState(
    initialQuestionId && !ids.includes(initialQuestionId)
      ? "Esa carta ya no está en el mazo. Te mostramos la primera."
      : "",
  );
  const library = useLibrary();
  const scope = getLibraryScope();
  const touch = useRef<{ x: number; y: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const question =
    deck.questions.find((item) => item.id === session.order[session.cursor]) ??
    deck.questions[0];
  const favorite = library.favorites[question.id]?.active ?? false;
  const last = session.cursor >= session.order.length - 1;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const saved = readLibrary().progress[deck.id];
      const restored = restoreSession(
        deck.questions.map((q) => q.id),
        saved,
        initialQuestionId,
      );
      setSession(restored);
      if (
        !saved ||
        saved.cursor !== restored.cursor ||
        JSON.stringify(saved.order) !== JSON.stringify(restored.order)
      ) {
        try {
          changeLibrary((state, stamp) => ({
            ...state,
            progress: {
              ...state.progress,
              [deck.id]: {
                ...stamp,
                ...restored,
                questionId: restored.order[restored.cursor],
              },
            },
          }));
        } catch {
          setStatus(
            "Puedes seguir leyendo, pero no se pudo guardar el progreso.",
          );
        }
      }
    }, 0);
    return () => {
      clearTimeout(timeout);
      clearTimeout(timer.current);
    };
  }, [deck.id, deck.questions, initialQuestionId, scope]);

  function notify(message: string) {
    clearTimeout(timer.current);
    setStatus(message);
    timer.current = setTimeout(() => setStatus(""), 5000);
  }
  function commit(next: DeckSession) {
    setSession(next);
    try {
      changeLibrary((state, stamp) => ({
        ...state,
        progress: {
          ...state.progress,
          [deck.id]: { ...stamp, ...next, questionId: next.order[next.cursor] },
        },
      }));
    } catch {
      notify("Puedes seguir leyendo, pero no se pudo guardar el progreso.");
    }
  }
  function next() {
    if (!last) commit({ ...session, cursor: session.cursor + 1 });
    else notify("Has leído todo el mazo. Puedes mezclar de nuevo.");
  }
  function previous() {
    if (session.cursor > 0) commit({ ...session, cursor: session.cursor - 1 });
  }
  function mix() {
    const first =
      ids.length > 1
        ? ids.filter((id) => id !== question.id)[
            Math.floor(Math.random() * (ids.length - 1))
          ]
        : ids[0];
    commit({ order: shuffled(ids, first), cursor: 0 });
    notify("Mazo mezclado. Cada carta aparecerá una vez.");
  }
  useEffect(() => {
    function keyboard(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (
        target.closest(
          "input, textarea, select, [contenteditable], details[open]",
        ) ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      )
        return;
      if (
        event.key === "ArrowRight" &&
        session.cursor < session.order.length - 1
      ) {
        event.preventDefault();
        const cursor = session.cursor + 1;
        setSession({ ...session, cursor });
        try {
          changeLibrary((state, stamp) => ({
            ...state,
            progress: {
              ...state.progress,
              [deck.id]: {
                ...stamp,
                ...session,
                cursor,
                questionId: session.order[cursor],
              },
            },
          }));
        } catch {
          setStatus(
            "Puedes seguir leyendo, pero no se pudo guardar el progreso.",
          );
        }
      }
      if (event.key === "ArrowLeft" && session.cursor > 0) {
        event.preventDefault();
        const cursor = session.cursor - 1;
        setSession({ ...session, cursor });
        try {
          changeLibrary((state, stamp) => ({
            ...state,
            progress: {
              ...state.progress,
              [deck.id]: {
                ...stamp,
                ...session,
                cursor,
                questionId: session.order[cursor],
              },
            },
          }));
        } catch {
          setStatus(
            "Puedes seguir leyendo, pero no se pudo guardar el progreso.",
          );
        }
      }
    }
    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, [session, deck.id]);

  async function action(run: () => Promise<string> | string) {
    try {
      const message = await run();
      if (message) notify(message);
    } catch (error) {
      notify(
        error instanceof DOMException
          ? "No se pudo copiar o compartir. Inténtalo de nuevo."
          : error instanceof Error
            ? error.message
            : "No se pudo completar. Inténtalo de nuevo.",
      );
    }
  }
  function swipe(event: TouchEvent<HTMLDivElement>) {
    if (!touch.current) return;
    const end = event.changedTouches[0];
    const dx = end.clientX - touch.current.x;
    const dy = end.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) next();
      else previous();
    }
  }
  return (
    <section
      aria-labelledby="deck-mode-title"
      className="deck-mode-shell deck-reader"
      style={getDeckThemeStyle(collection ? "charlar" : deck.id)}
    >
      <div className="deck-reader-inner">
        <header className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
          <Link
            prefetch={false}
            aria-label="Volver"
            className="deck-top-link"
            href={backHref}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
          <div className="text-center">
            <h1
              id="deck-mode-title"
              className="flex items-center justify-center gap-2 text-sm font-bold"
            >
              <DeckThemeIcon
                className="hidden h-5 w-5 sm:block"
                deckId={collection ? "charlar" : deck.id}
              />
              {deck.title}
            </h1>
            <p className="mt-1 text-xs text-ink/70">
              {session.cursor + 1} / {ids.length}
            </p>
          </div>
          <Link
            prefetch={false}
            aria-label="Ver Mis cartas"
            className="deck-top-link"
            href="/mis-cartas"
          >
            <HeartIcon className="h-4 w-4" />
          </Link>
        </header>
        <div
          className="deck-reader-card"
          onTouchStart={(event) => {
            touch.current = {
              x: event.touches[0].clientX,
              y: event.touches[0].clientY,
            };
          }}
          onTouchEnd={swipe}
          onTouchCancel={() => {
            touch.current = null;
          }}
        >
          <div className="deck-question-stack">
            <QuestionCard
              deckId={collection ? "charlar" : deck.id}
              deckTitle={deck.category}
              question={question.text}
              footer={`Carta ${session.cursor + 1} de ${ids.length}`}
            />
          </div>
        </div>
        <div className="reader-actions">
          <div className="flex items-center justify-center gap-2">
            <button
              aria-label="Pregunta anterior"
              disabled={session.cursor === 0}
              className="paper-button reader-icon disabled:opacity-40"
              onClick={previous}
            >
              <ArrowLeftIcon />
            </button>
            <FavoriteButton
              className="reader-icon"
              active={favorite}
              onToggle={() =>
                void action(() => {
                  if (question.deckId === "custom")
                    saveSharedQuestion(question.id, question.text, !favorite);
                  else setFavorite(question.id, !favorite);
                  return favorite ? "Carta quitada" : "Carta guardada";
                })
              }
            />
            <button
              className="paper-button paper-button-ink min-h-12 flex-1 rounded-2xl px-4 text-sm font-bold"
              onClick={last ? mix : next}
            >
              {last ? "Mezclar de nuevo" : "Otra pregunta"}
              <ArrowRightIcon className="ml-2 inline h-4 w-4" />
            </button>
            <ShareButton
              className="reader-icon"
              onShare={() =>
                void action(() =>
                  shareCard(
                    deck.title,
                    question.shareText ?? question.text,
                    questionPaths && question.id in questionPaths
                      ? questionPaths[question.id]
                      : questionHref(deck.seoSlug, question.id),
                  ),
                )
              }
            />
          </div>
          <div className="mt-2 flex items-center justify-center gap-4">
            <CardOptions>
              <button className="quiet-action" onClick={mix}>
                Mezclar el mazo
              </button>
              <button
                className="quiet-action"
                onClick={() =>
                  void action(async () => {
                    await copyText(question.shareText ?? question.text);
                    return "Carta copiada";
                  })
                }
              >
                Copiar pregunta
              </button>
              <DownloadQuestionButton
                question={question}
                deckTitle={deck.title}
              />
              <CollectionPicker questionId={question.id} onStatus={notify} />
              {!collection ? <OfflineButton deckId={deck.id} /> : null}
            </CardOptions>
          </div>
          <p className="reader-status" role="status" aria-live="polite">
            {status || "\u00a0"}
          </p>
        </div>
      </div>
    </section>
  );
}
