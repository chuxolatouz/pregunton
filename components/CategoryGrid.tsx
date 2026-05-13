import type { Deck } from "@/data/decks";
import { DeckCard } from "@/components/DeckCard";

export function CategoryGrid({ decks, title = "Elige un mazo" }: { decks: Deck[]; title?: string }) {
  return (
    <section aria-labelledby="deck-grid-title" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 id="deck-grid-title" className="display-serif text-3xl font-bold text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/65">
            Cada mazo tiene una energía distinta. Puedes leer la lista completa o entrar directo al modo cartas.
          </p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {decks.map((deck) => (
          <DeckCard deck={deck} key={deck.id} />
        ))}
      </div>
    </section>
  );
}
