import Link from "next/link";
import type { Deck } from "@/data/decks";
import { getSeoPageByDeckId } from "@/data/decks";
import { deckThemeClass, getDeckTheme } from "@/lib/deckTheme";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/BrandLogo";
import { PaperBadge } from "@/components/Paper";

export function DeckCard({ deck, compact = false }: { deck: Deck; compact?: boolean }) {
  const seo = getSeoPageByDeckId(deck.id);
  const theme = getDeckTheme(deck.id);

  return (
    <article
      className={cn(
        "paper-surface paper-stack paper-lift flex h-full flex-col justify-between rounded-[1.15rem] p-5",
        theme.card,
        compact ? "gap-4" : "gap-6"
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <PaperBadge className={deckThemeClass(deck.id, "accent")}>{deck.category}</PaperBadge>
          <BrandLogo decorative variant="stamp" imageClassName="h-10 w-10 opacity-65" />
        </div>
        <h3 className="display-serif mt-3 text-2xl font-bold leading-tight text-ink">{deck.title}</h3>
        <p className="mt-3 text-sm leading-6 text-ink/68">{deck.description}</p>
        {deck.source ? (
          <a className="mt-3 inline-flex text-xs font-bold text-ink/55 underline decoration-dashed underline-offset-4 hover:text-ink" href={deck.source.url} rel="noreferrer" target="_blank">
            Referencia: {deck.source.label}
          </a>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        <Link className={cn("paper-button rounded-[0.85rem] px-4 py-2 text-sm font-black", theme.button)} href={`/mazo/${deck.seoSlug}`}>
          Sacar pregunta
        </Link>
        {seo ? (
          <Link className="paper-button rounded-[0.85rem] px-4 py-2 text-sm font-black text-ink" href={`/${seo.slug}`}>
            Ver lista
          </Link>
        ) : null}
      </div>
    </article>
  );
}
