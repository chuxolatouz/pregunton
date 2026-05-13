import Link from "next/link";
import type { Deck } from "@/data/decks";
import { getSeoPageByDeckId } from "@/data/decks";
import { deckThemeClass, getDeckTheme } from "@/lib/deckTheme";
import { cn } from "@/lib/utils";

export function DeckCard({ deck, compact = false }: { deck: Deck; compact?: boolean }) {
  const seo = getSeoPageByDeckId(deck.id);
  const theme = getDeckTheme(deck.id);

  return (
    <article
      className={cn(
        "flex h-full flex-col justify-between rounded-[1.4rem] border p-5 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-card",
        theme.card,
        compact ? "gap-4" : "gap-6"
      )}
    >
      <div>
        <p className={deckThemeClass(deck.id, "accent", "text-xs font-semibold uppercase tracking-[0.14em]")}>
          {deck.category}
        </p>
        <h3 className="mt-2 text-xl font-bold leading-tight text-ink">{deck.title}</h3>
        <p className="mt-3 text-sm leading-6 text-ink/68">{deck.description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link className={cn("rounded-full px-4 py-2 text-sm font-semibold", theme.button)} href={`/mazo/${deck.seoSlug}`}>
          Sacar pregunta
        </Link>
        {seo ? (
          <Link className="rounded-full bg-white/75 px-4 py-2 text-sm font-semibold text-ink ring-1 ring-ink/10 hover:bg-white" href={`/${seo.slug}`}>
            Ver lista
          </Link>
        ) : null}
      </div>
    </article>
  );
}
