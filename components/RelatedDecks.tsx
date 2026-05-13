import Link from "next/link";
import { getSeoPage, getDeckById } from "@/data/decks";

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
      <h2 id="related-title" className="text-2xl font-black tracking-tight text-ink">
        Mazos relacionados
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {related.map(({ page, deck }) => (
          <Link className="rounded-[1.2rem] border border-ink/10 bg-white p-4 shadow-soft transition hover:-translate-y-1" href={`/${page.slug}`} key={page.slug}>
            <p className="text-sm font-bold text-coral">{deck.category}</p>
            <p className="mt-2 font-black leading-tight text-ink">{deck.title}</p>
            <p className="mt-2 text-sm leading-6 text-ink/62">{deck.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
