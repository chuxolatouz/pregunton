import Link from "next/link";
import type { Deck } from "@/data/decks";
import { getSeoPageByDeckId } from "@/data/decks";
import { getDeckTheme, getDeckThemeStyle } from "@/lib/deckTheme";
import { cn } from "@/lib/utils";
import { PaperBadge } from "@/components/Paper";
import { ConfettiIcon, FlameIcon, HeartIcon, MoonIcon, PlaneIcon, SmileIcon } from "@/components/icons";

const deckIcons = {
  flame: FlameIcon,
  smile: SmileIcon,
  heart: HeartIcon,
  plane: PlaneIcon,
  moon: MoonIcon,
  confetti: ConfettiIcon
};

export function DeckCard({ deck, compact = false }: { deck: Deck; compact?: boolean }) {
  const seo = getSeoPageByDeckId(deck.id);
  const theme = getDeckTheme(deck.id);
  const Icon = deckIcons[theme.icon];

  return (
    <article
      className={cn(
        "deck-stack-card h-full rounded-[1.2rem]",
        compact ? "min-h-[17rem]" : "min-h-[18rem]"
      )}
      style={getDeckThemeStyle(deck.id)}
    >
      <div className={cn("paper-surface deck-stack-front flex h-full flex-col justify-between rounded-[1.2rem] p-5", theme.card, compact ? "gap-4" : "gap-6")}>
        <div>
          <div className="flex items-start justify-between gap-4">
            <PaperBadge className="border-[color:var(--deck-border)] bg-[color:var(--deck-paper-soft)] text-[color:var(--deck-ink)]">{deck.category}</PaperBadge>
            <span
              aria-hidden="true"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-[0.95rem] border border-[color:var(--deck-border)] bg-[color:var(--deck-paper-soft)] text-[color:var(--deck-accent)]"
            >
              <Icon className="h-6 w-6" />
            </span>
          </div>
          <h3 className="display-serif mt-3 text-2xl font-bold leading-tight text-ink">{deck.title}</h3>
          <p className="mt-3 text-sm leading-6 text-ink/68">{deck.description}</p>
          {deck.source ? (
            <a className="mt-3 inline-flex text-xs font-bold text-ink/55 underline decoration-dashed underline-offset-4 hover:text-ink" href={deck.source.url} rel="noreferrer" target="_blank">
              Referencia: {deck.source.label}
            </a>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link className={cn("paper-button rounded-[0.85rem] px-4 py-2 text-sm font-black", theme.button)} href={`/mazo/${deck.seoSlug}`}>
            Sacar carta
          </Link>
          {seo ? (
            <Link className="text-sm font-black text-[color:var(--deck-ink)] underline decoration-dashed underline-offset-8 transition hover:text-ink focus-visible:text-ink" href={`/${seo.slug}`}>
              Ver lista
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
