import Link from "next/link";
import { getSeoPage, getDeckById } from "@/data/decks";
import { deckThemeClass } from "@/lib/deckTheme";

export function RelatedDecks({ slugs }: { slugs: string[] }) {
  const related = slugs
    .map((slug) => {
      const page = getSeoPage(slug);
      const deck = page ? getDeckById(page.deckId) : undefined;
      return page && deck ? { page, deck } : undefined;
    })
    .filter(Boolean) as Array<{
    page: NonNullable<ReturnType<typeof getSeoPage>>;
    deck: NonNullable<ReturnType<typeof getDeckById>>;
  }>;

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-title" className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h2 id="related-title" className="display-serif text-3xl font-bold text-ink">
        Mazos relacionados
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {related.map(({ page, deck }) => (
          <Link className="paper-surface paper-lift rounded-[1rem] p-4" href={`/${page.slug}`} key={page.slug}>
            <p className={deckThemeClass(deck.id, "accent", "text-sm font-black")}>{deck.category}</p>
            <p className="display-serif mt-2 text-xl font-bold leading-tight text-ink">{deck.title}</p>
            <p className="mt-2 text-sm leading-6 text-ink/62">{deck.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
