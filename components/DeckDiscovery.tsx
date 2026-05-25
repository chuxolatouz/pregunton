"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  deckCategoryGroups,
  discoveryModes,
  momentGroups,
  toneGroups,
  type DiscoveryAccent,
  type DiscoveryGroup,
  type DiscoveryModeId
} from "@/data/deckDiscovery";
import { cn } from "@/lib/utils";
import { ShuffleIcon, SparkIcon } from "@/components/icons";

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
  mesa: deckCategoryGroups
};

const accentClasses: Record<DiscoveryAccent, { text: string; border: string; bg: string; button: string; wash: string }> = {
  coral: {
    text: "text-coral",
    border: "border-coral/25",
    bg: "bg-coral/10",
    button: "bg-coral text-white hover:bg-coral/90",
    wash: "from-coral/[0.12]"
  },
  marigold: {
    text: "text-marigold",
    border: "border-marigold/30",
    bg: "bg-marigold/[0.15]",
    button: "bg-marigold text-ink hover:bg-marigold/90",
    wash: "from-marigold/[0.18]"
  },
  moss: {
    text: "text-moss",
    border: "border-moss/25",
    bg: "bg-moss/10",
    button: "bg-moss text-white hover:bg-moss/90",
    wash: "from-moss/[0.12]"
  },
  sky: {
    text: "text-sky",
    border: "border-sky/30",
    bg: "bg-sky/[0.14]",
    button: "bg-sky text-ink hover:bg-sky/90",
    wash: "from-sky/[0.16]"
  },
  lavender: {
    text: "text-lavender",
    border: "border-lavender/30",
    bg: "bg-lavender/[0.12]",
    button: "bg-lavender text-white hover:bg-lavender/90",
    wash: "from-lavender/[0.14]"
  },
  ink: {
    text: "text-ink",
    border: "border-ink/15",
    bg: "bg-ink/[0.04]",
    button: "bg-ink text-white hover:bg-ink/90",
    wash: "from-ink/[0.07]"
  }
};

function pickRandom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function RandomQuestionButton({
  decks,
  deckIds,
  children,
  className,
  variant = "dark"
}: {
  decks: DiscoveryDeck[];
  deckIds?: string[];
  children: string;
  className?: string;
  variant?: "dark" | "plain";
}) {
  const router = useRouter();
  const candidates = decks.filter((deck) => !deckIds || deckIds.includes(deck.id));

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
        variant === "dark" ? "bg-ink text-white" : "text-ink",
        className
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

function ModeToggle({ mode, onChange }: { mode: DiscoveryModeId; onChange: (mode: DiscoveryModeId) => void }) {
  return (
    <div aria-label="Modo de descubrimiento" className="flex w-full gap-1 overflow-x-auto rounded-[1rem] border border-ink/10 bg-white/40 p-1 shadow-sm sm:w-auto" role="tablist">
      {discoveryModes.map((item) => {
        const selected = mode === item.id;

        return (
          <button
            aria-selected={selected}
            className={cn(
              "min-h-11 shrink-0 rounded-[0.8rem] px-4 text-sm font-black text-ink/66 transition hover:bg-white/70 hover:text-ink",
              selected && "paper-surface rotate-[-0.5deg] text-ink shadow-sm"
            )}
            key={item.id}
            onClick={() => onChange(item.id)}
            role="tab"
            type="button"
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function DeckPill({ deck }: { deck: DiscoveryDeck }) {
  return (
    <Link
      className="group relative inline-flex min-h-10 items-center rounded-[0.75rem] border border-ink/12 bg-white/58 px-3 py-2 text-sm font-black text-ink shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
      href={`/mazo/${deck.seoSlug}`}
    >
      <span className="absolute inset-x-2 -bottom-1 -z-10 h-3 rotate-[-1.5deg] rounded-[0.7rem] border border-ink/10 bg-[#eadbc2]" />
      {deck.title.replace("Preguntas ", "")}
    </Link>
  );
}

function DeckStackLink({ deck, index }: { deck: DiscoveryDeck; index: number }) {
  const rotation = ["rotate-[-1deg]", "rotate-[0.6deg]", "rotate-[-0.4deg]", "rotate-[1deg]"][index % 4];

  return (
    <article className={cn("paper-surface paper-stack paper-lift flex min-h-[13.5rem] flex-col justify-between rounded-[1.05rem] p-4", rotation)}>
      <div>
        <p className="text-xs font-black uppercase tracking-[0.14em] text-ink/45">{deck.category}</p>
        <h3 className="display-serif mt-2 text-2xl font-bold leading-tight text-ink">{deck.title}</h3>
        <p className="mt-2 text-sm leading-6 text-ink/66">{deck.description}</p>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link className="paper-button rounded-[0.85rem] bg-ink px-4 py-2 text-sm font-black text-white" href={`/mazo/${deck.seoSlug}`}>
          Sacar carta
        </Link>
        {deck.seoPageSlug ? (
          <Link className="rounded-[0.85rem] px-3 py-2 text-sm font-black text-ink/62 hover:bg-white/55 hover:text-ink" href={`/${deck.seoPageSlug}`}>
            Ver lista
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function IntensityMarks({ level, accent }: { level?: number; accent: DiscoveryAccent }) {
  if (!level) return null;

  return (
    <div aria-label={`Intensidad ${level} de 5`} className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <span className={cn("h-2.5 w-5 rounded-full border border-ink/10 bg-white/60", index < level && accentClasses[accent].bg)} key={index} />
      ))}
    </div>
  );
}

function DiscoveryGroupCard({ decks, group, mode }: { decks: DiscoveryDeck[]; group: DiscoveryGroup; mode: DiscoveryModeId }) {
  const accent = accentClasses[group.accent];
  const groupDecks = group.deckIds.map((id) => decks.find((deck) => deck.id === id)).filter((deck): deck is DiscoveryDeck => Boolean(deck));
  const isMesa = mode === "mesa";

  if (isMesa) {
    return (
      <section aria-labelledby={`${group.id}-title`} className="py-3">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={cn("paper-label inline-flex rotate-[-1deg] rounded-[0.7rem] px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em]", accent.text)}>
              {groupDecks.length} mazos
            </p>
            <h3 id={`${group.id}-title`} className="display-serif mt-3 text-3xl font-bold text-ink">
              {group.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/65">{group.description}</p>
          </div>
          <RandomQuestionButton className={accent.button} deckIds={group.deckIds} decks={decks} variant="plain">
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
    <article className={cn("paper-surface paper-lift overflow-hidden rounded-[1.1rem] border p-5", accent.border)}>
      <div className={cn("pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent", accent.wash)} />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={cn("text-xs font-black uppercase tracking-[0.14em]", accent.text)}>{mode === "momentos" ? "Momento" : "Tono"}</p>
            <h3 className="display-serif mt-2 text-3xl font-bold leading-tight text-ink">{group.title}</h3>
          </div>
          <SparkIcon className={cn("mt-1 h-6 w-6", accent.text)} />
        </div>
        <p className="mt-3 text-sm leading-6 text-ink/68">{group.description}</p>
        <div className="mt-4">
          <IntensityMarks accent={group.accent} level={group.intensityLevel} />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {groupDecks.map((deck) => (
            <DeckPill deck={deck} key={deck.id} />
          ))}
        </div>
        <RandomQuestionButton className={cn("mt-6 w-full sm:w-auto", accent.button)} deckIds={group.deckIds} decks={decks} variant="plain">
          {group.cta}
        </RandomQuestionButton>
      </div>
    </article>
  );
}

export function DeckDiscovery({ decks, defaultMode = "momentos", eyebrow = "Elige cómo quieres buscar", intro, persistMode = true }: DeckDiscoveryProps) {
  const [mode, setMode] = useState<DiscoveryModeId>(defaultMode);
  const selectedMode = discoveryModes.find((item) => item.id === mode) ?? discoveryModes[0];
  const selectedGroups = groupSets[selectedMode.id];

  useEffect(() => {
    if (!persistMode) return;

    try {
      const storedMode = window.localStorage.getItem(storageKey);
      if (storedMode === "momentos" || storedMode === "intensidad" || storedMode === "mesa") {
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

  const activeDeckIds = useMemo(() => new Set(selectedGroups.flatMap((group) => group.deckIds)), [selectedGroups]);
  const activeDeckCount = decks.filter((deck) => activeDeckIds.has(deck.id)).length;

  return (
    <section aria-labelledby="deck-discovery-title" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="paper-label inline-flex rotate-[-1deg] rounded-[0.8rem] px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-coral">{eyebrow}</p>
          <h2 id="deck-discovery-title" className="display-serif mt-4 text-4xl font-bold leading-tight text-ink sm:text-5xl">
            {selectedMode.heading}
          </h2>
          <p className="mt-3 text-base leading-7 text-ink/68">{intro ?? selectedMode.description}</p>
        </div>
        <div className="flex min-w-0 flex-col gap-3 sm:items-start lg:items-end">
          <ModeToggle mode={mode} onChange={changeMode} />
          <RandomQuestionButton className="w-full shrink-0 sm:w-auto" decks={decks}>
            Sácame una carta random
          </RandomQuestionButton>
        </div>
      </div>

      <div aria-live="polite" className="mb-5 text-sm font-bold text-ink/48">
        {activeDeckCount} mazos disponibles en esta vista
      </div>

      <div className={cn(mode === "mesa" ? "space-y-9" : "grid gap-4 md:grid-cols-2")}>
        {selectedGroups.map((group) => (
          <DiscoveryGroupCard decks={decks} group={group} key={group.id} mode={selectedMode.id} />
        ))}
      </div>
    </section>
  );
}
