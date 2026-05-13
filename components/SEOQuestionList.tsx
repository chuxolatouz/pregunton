import type { Deck } from "@/data/decks";

export function SEOQuestionList({ deck, title }: { deck: Deck; title: string }) {
  return (
    <section aria-labelledby="question-list-title" className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h2 id="question-list-title" className="text-2xl font-black tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-ink/68">
        Puedes leerlas en orden, elegir una al azar o abrir este mazo en modo cartas.
      </p>
      <ol className="mt-6 grid gap-3">
        {deck.questions.map((question, index) => (
          <li className="rounded-[1.2rem] border border-ink/10 bg-white p-4 shadow-soft" key={question.id}>
            <span className="mr-2 text-sm font-black text-coral">{index + 1}.</span>
            <span className="text-base leading-7 text-ink">{question.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
