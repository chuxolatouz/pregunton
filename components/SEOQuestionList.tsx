import type { Deck } from "@/data/decks";
import { deckThemeClass, getDeckThemeStyle } from "@/lib/deckTheme";

export function SEOQuestionList({ deck, title }: { deck: Deck; title: string }) {
  return (
    <section aria-labelledby="question-list-title" className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h2 id="question-list-title" className="display-serif text-3xl font-bold text-ink sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-ink/68">
        Puedes leerlas en orden, elegir una al azar o abrir este mazo en modo cartas.
      </p>
      <ol className="mt-6 grid gap-3">
        {deck.questions.map((question, index) => (
          <li className="paper-surface rounded-[0.9rem] p-4" key={question.id} style={getDeckThemeStyle(deck.id)}>
            <span className={deckThemeClass(deck.id, "accent", "mr-2 font-mono text-sm font-black")}>{String(index + 1).padStart(2, "0")}.</span>
            <span className="text-base leading-7 text-ink">{question.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
