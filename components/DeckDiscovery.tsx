"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import {
  deckCategoryGroups,
  discoveryModes,
  momentGroups,
  toneGroups,
  type DiscoveryAccent,
  type DiscoveryGroup,
  type DiscoveryModeId,
} from "@/data/deckDiscovery";
import { getDeckThemeStyle } from "@/lib/deckTheme";
import { cn } from "@/lib/utils";
import { DeckThemeIcon } from "@/components/DeckThemeIcon";
import { ShuffleIcon } from "@/components/icons";

export type DiscoveryDeck = {
  id: string;
  title: string;
  description: string;
  category: string;
  tone: string;
  seoSlug: string;
  questionCount: number;
  questionIds: string[];
  seoPageSlug?: string;
};

type DeckDiscoveryProps = {
  decks: DiscoveryDeck[];
  defaultMode?: DiscoveryModeId;
  eyebrow?: string;
  intro?: string;
  persistMode?: boolean;
};

const storageKey = "pregunton:discovery-mode";

const groupSets: Record<DiscoveryModeId, DiscoveryGroup[]> = {
  momentos: momentGroups,
  intensidad: toneGroups,
  mesa: deckCategoryGroups,
};

const accentClasses: Record<
  DiscoveryAccent,
  { text: string; border: string; bg: string; button: string; wash: string }
> = {
  coral: {
    text: "text-coral",
    border: "border-coral/25",
    bg: "bg-coral/10",
    button: "bg-coral text-white hover:bg-coral/90",
    wash: "from-coral/[0.12]",
  },
  marigold: {
    text: "text-marigold",
    border: "border-marigold/30",
    bg: "bg-marigold/[0.15]",
    button: "bg-marigold text-ink hover:bg-marigold/90",
    wash: "from-marigold/[0.18]",
  },
  moss: {
    text: "text-moss",
    border: "border-moss/25",
    bg: "bg-moss/10",
    button: "bg-moss text-white hover:bg-moss/90",
    wash: "from-moss/[0.12]",
  },
  sky: {
    text: "text-sky",
    border: "border-sky/30",
    bg: "bg-sky/[0.14]",
    button: "bg-sky text-ink hover:bg-sky/90",
    wash: "from-sky/[0.16]",
  },
  lavender: {
    text: "text-lavender",
    border: "border-lavender/30",
    bg: "bg-lavender/[0.12]",
    button: "bg-lavender text-white hover:bg-lavender/90",
    wash: "from-lavender/[0.14]",
  },
  ink: {
    text: "text-ink",
    border: "border-ink/15",
    bg: "bg-ink/[0.04]",
    button: "paper-button-ink text-white",
    wash: "from-ink/[0.07]",
  },
};

function pickRandom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function RandomQuestionButton({
  decks,
  deckIds,
  children,
  className,
  variant = "dark",
}: {
  decks: DiscoveryDeck[];
  deckIds?: string[];
  children: string;
  className?: string;
  variant?: "dark" | "plain";
}) {
  const router = useRouter();
  const candidates = decks.filter(
    (deck) => !deckIds || deckIds.includes(deck.id),
  );

  function openRandomQuestion() {
    if (!candidates.length) return;

    const deck = pickRandom(candidates);
    const questionId = pickRandom(deck.questionIds);
    router.push(`/mazo/${deck.seoSlug}${questionId ? `?q=${questionId}` : ""}`);
  }

  return (
    <button
      className={cn(
        "paper-button inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.95rem] px-4 text-sm font-black",
        variant === "dark" ? "paper-button-ink text-white" : "text-ink",
        className,
      )}
      disabled={!candidates.length}
      onClick={openRandomQuestion}
      type="button"
    >
      <ShuffleIcon className="h-4 w-4" />
      {children}
    </button>
  );
}

function ModeToggle({
  mode,
  onChange,
}: {
  mode: DiscoveryModeId;
  onChange: (mode: DiscoveryModeId) => void;
}) {
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const currentIndex = discoveryModes.findIndex((item) => item.id === mode);
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex =
      (currentIndex + direction + discoveryModes.length) %
      discoveryModes.length;
    const nextMode = discoveryModes[nextIndex];
    onChange(nextMode.id);
    document.getElementById(`discovery-tab-${nextMode.id}`)?.focus();
  }

  return (
    <div
      aria-label="Modo de descubrimiento"
      className="flex w-full gap-1 overflow-x-auto rounded-[1rem] border border-ink/10 bg-white/40 p-1 shadow-sm sm:w-auto"
      onKeyDown={onKeyDown}
      role="tablist"
    >
      {discoveryModes.map((item) => {
        const selected = mode === item.id;

        return (
          <button
            aria-selected={selected}
            aria-controls={`discovery-panel-${item.id}`}
            className={cn(
              "min-h-11 shrink-0 rounded-[0.8rem] px-4 text-sm font-black text-ink/66 transition hover:bg-white/70 hover:text-ink",
              selected && "paper-surface rotate-[-0.5deg] text-ink shadow-sm",
            )}
            key={item.id}
            id={`discovery-tab-${item.id}`}
            onClick={() => onChange(item.id)}
            role="tab"
            tabIndex={selected ? 0 : -1}
            type="button"
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function DeckPill({
  deck,
  className,
}: {
  deck: DiscoveryDeck;
  className?: string;
}) {
  return (
    <Link
      className={cn(
        "group relative inline-flex min-h-10 items-center gap-2 rounded-[0.75rem] border border-[color:var(--deck-border)] bg-white/60 px-3 py-2 text-sm font-black text-[color:var(--deck-ink)] shadow-sm transition hover:-translate-y-0.5 hover:bg-white",
        className,
      )}
      href={`/mazo/${deck.seoSlug}`}
      style={getDeckThemeStyle(deck.id)}
    >
      <span className="absolute inset-x-2 -bottom-1 -z-10 h-3 rotate-[-1.5deg] rounded-[0.7rem] border border-[color:var(--deck-border)] bg-[color:var(--deck-paper)]" />
      <DeckThemeIcon
        className="h-4 w-4 text-[color:var(--deck-accent)]"
        deckId={deck.id}
      />
      {deck.title.replace("Preguntas ", "")}
    </Link>
  );
}

function DeckStackLink({
  deck,
  index,
}: {
  deck: DiscoveryDeck;
  index: number;
}) {
  const rotation = [
    "rotate-[-1deg]",
    "rotate-[0.6deg]",
    "rotate-[-0.4deg]",
    "rotate-[1deg]",
  ][index % 4];

  return (
    <article
      className={cn(
        "deck-stack-card min-h-[14.5rem] rounded-[1.15rem]",
        rotation,
      )}
      style={getDeckThemeStyle(deck.id)}
    >
      <div className="paper-surface deck-stack-front flex h-full flex-col justify-between rounded-[1.15rem] border-[color:var(--deck-border)] p-4">
        <div>
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[color:var(--deck-ink)]">
              {deck.category}
            </p>
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-[0.8rem] border border-[color:var(--deck-border)] bg-[color:var(--deck-paper-soft)] text-[color:var(--deck-accent)]"
            >
              <DeckThemeIcon className="h-5 w-5" deckId={deck.id} />
            </span>
          </div>
          <h3 className="display-serif mt-2 text-2xl font-bold leading-tight text-ink">
            {deck.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-ink/66">
            {deck.description}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            className="paper-button paper-note-button rounded-[0.85rem] border-[color:var(--deck-border)] px-4 py-2 text-sm font-black text-[color:var(--deck-ink)]"
            href={`/mazo/${deck.seoSlug}`}
          >
            Sacar carta
          </Link>
          {deck.seoPageSlug ? (
            <Link
              className="rounded-[0.85rem] px-3 py-2 text-sm font-black text-[color:var(--deck-ink)] underline decoration-dashed underline-offset-8 hover:text-ink"
              href={`/${deck.seoPageSlug}`}
            >
              Ver lista
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function IntensityMarks({
  level,
  accent,
}: {
  level?: number;
  accent: DiscoveryAccent;
}) {
  if (!level) return null;

  return (
    <div
      aria-label={`Intensidad ${level} de 5`}
      className="flex items-center gap-1.5"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          className={cn(
            "h-2.5 w-5 rounded-full border border-ink/10 bg-white/60",
            index < level && accentClasses[accent].bg,
          )}
          key={index}
        />
      ))}
    </div>
  );
}

function DiscoveryGroupCard({
  decks,
  group,
  mode,
}: {
  decks: DiscoveryDeck[];
  group: DiscoveryGroup;
  mode: DiscoveryModeId;
}) {
  const [expanded, setExpanded] = useState(false);
  const groupDecks = group.deckIds
    .map((id) => decks.find((deck) => deck.id === id))
    .filter((deck): deck is DiscoveryDeck => Boolean(deck));
  const isMesa = mode === "mesa";
  const themeDeckId = groupDecks[0]?.id ?? "random";

  if (isMesa) {
    return (
      <section
        aria-labelledby={`${group.id}-title`}
        className="py-3"
        style={getDeckThemeStyle(themeDeckId)}
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="paper-label inline-flex rotate-[-1deg] rounded-[0.7rem] border-[color:var(--deck-border)] bg-[color:var(--deck-paper-soft)] px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-[color:var(--deck-ink)]">
              {groupDecks.length} mazos
            </p>
            <h3
              id={`${group.id}-title`}
              className="display-serif mt-3 text-3xl font-bold text-ink"
            >
              {group.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/65">
              {group.description}
            </p>
          </div>
          <RandomQuestionButton
            className="border-[color:var(--deck-border)] bg-[color:var(--deck-paper-soft)] text-[color:var(--deck-ink)]"
            deckIds={group.deckIds}
            decks={decks}
            variant="plain"
          >
            {group.cta}
          </RandomQuestionButton>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groupDecks.map((deck, index) => (
            <DeckStackLink deck={deck} index={index} key={deck.id} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <article
      className="paper-surface paper-lift overflow-hidden rounded-[1.1rem] border border-[color:var(--deck-border)] p-4 sm:p-5"
      style={getDeckThemeStyle(themeDeckId)}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[color:var(--deck-paper-soft)] to-transparent" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="hidden text-xs font-black uppercase tracking-[0.14em] text-[color:var(--deck-accent)] sm:block">
              {mode === "momentos" ? "Momento" : "Tono"}
            </p>
            <h3 className="display-serif mt-2 text-3xl font-bold leading-tight text-ink">
              {group.title}
            </h3>
          </div>
          <span
            aria-hidden="true"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-[0.95rem] border border-[color:var(--deck-border)] bg-[color:var(--deck-paper-soft)] text-[color:var(--deck-accent)]"
          >
            <DeckThemeIcon deckId={themeDeckId} />
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-ink/68">
          {group.description}
        </p>
        <div className="mt-4">
          <IntensityMarks accent={group.accent} level={group.intensityLevel} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {groupDecks.map((deck, index) => (
            <DeckPill
              className={
                index >= 3 && !expanded ? "hidden sm:inline-flex" : undefined
              }
              deck={deck}
              key={deck.id}
            />
          ))}
          {groupDecks.length > 3 ? (
            <button
              type="button"
              aria-expanded={expanded}
              className="quiet-action sm:hidden"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Ver menos" : `Ver los ${groupDecks.length} mazos`}
            </button>
          ) : null}
        </div>
        <RandomQuestionButton
          className="mt-6 w-full border-[color:var(--deck-border)] bg-[color:var(--deck-paper-soft)] text-[color:var(--deck-ink)] sm:w-auto"
          deckIds={group.deckIds}
          decks={decks}
          variant="plain"
        >
          {group.cta}
        </RandomQuestionButton>
      </div>
    </article>
  );
}

export function DeckDiscovery({
  decks,
  defaultMode = "momentos",
  persistMode = true,
}: DeckDiscoveryProps) {
  const [mode, setMode] = useState<DiscoveryModeId>(defaultMode);
  const [search, setSearch] = useState("");
  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const matchedDecks = decks.filter((deck) =>
    normalize(
      `${deck.title} ${deck.category} ${deck.description} ${deck.tone}`,
    ).includes(normalize(search.trim())),
  );
  const selectedMode =
    discoveryModes.find((item) => item.id === mode) ?? discoveryModes[0];
  const selectedGroups = groupSets[selectedMode.id];

  useEffect(() => {
    if (!persistMode) return;

    try {
      const storedMode = window.localStorage.getItem(storageKey);
      if (
        storedMode === "momentos" ||
        storedMode === "intensidad" ||
        storedMode === "mesa"
      ) {
        window.setTimeout(() => setMode(storedMode), 0);
      }
    } catch {
      // localStorage is an enhancement; the default mode still works.
    }
  }, [persistMode]);

  function changeMode(nextMode: DiscoveryModeId) {
    setMode(nextMode);
    if (!persistMode) return;

    try {
      window.localStorage.setItem(storageKey, nextMode);
    } catch {
      // Ignore storage failures and keep the in-page state.
    }
  }

  const activeDeckIds = useMemo(
    () => new Set(selectedGroups.flatMap((group) => group.deckIds)),
    [selectedGroups],
  );
  const activeDeckCount = decks.filter((deck) =>
    activeDeckIds.has(deck.id),
  ).length;

  return (
    <section
      aria-labelledby="deck-discovery-title"
      className="mx-auto max-w-6xl px-4 pb-10 sm:px-6"
    >
      <h2 id="deck-discovery-title" className="sr-only">
        {selectedMode.heading}
      </h2>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 flex-1 gap-2">
          <label
            className="min-w-0 flex-1 text-sm font-bold"
            htmlFor="deck-search"
          >
            Buscar un mazo
            <input
              id="deck-search"
              type="search"
              className="paper-input mt-1 w-full"
              placeholder="Amigos, pareja, viaje…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          {search ? (
            <button
              className="quiet-action self-end"
              onClick={() => setSearch("")}
            >
              Limpiar
            </button>
          ) : null}
        </div>
        <RandomQuestionButton
          className="hidden shrink-0 sm:inline-flex"
          decks={decks}
        >
          Sacar una carta
        </RandomQuestionButton>
      </div>
      {!search.trim() ? (
        <div className="mb-4">
          <ModeToggle mode={mode} onChange={changeMode} />
        </div>
      ) : null}
      <p className="mb-4 text-sm text-ink/70" role="status">
        {search.trim()
          ? `${matchedDecks.length} mazos encontrados`
          : `${activeDeckCount} mazos · elige uno para sacar una carta`}
      </p>
      {search.trim() ? (
        matchedDecks.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {matchedDecks.map((deck, index) => (
              <DeckStackLink deck={deck} index={index} key={deck.id} />
            ))}
          </div>
        ) : (
          <div className="py-8">
            <p className="display-serif text-2xl">No encontramos ese mazo</p>
            <p className="mt-2 text-ink/70">
              Prueba con amigos, viaje o una cita.
            </p>
            <button className="quiet-action mt-3" onClick={() => setSearch("")}>
              Ver todos los mazos
            </button>
          </div>
        )
      ) : (
        <div
          aria-labelledby={`discovery-tab-${selectedMode.id}`}
          className={cn(
            mode === "mesa" ? "space-y-9" : "grid gap-4 md:grid-cols-2",
          )}
          id={`discovery-panel-${selectedMode.id}`}
          role="tabpanel"
        >
          {selectedGroups.map((group) => (
            <DiscoveryGroupCard
              decks={decks}
              group={group}
              key={group.id}
              mode={selectedMode.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}
