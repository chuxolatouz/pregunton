import Link from "next/link";
import type { Deck } from "@/data/decks";
import { QuestionCardStatic } from "@/components/QuestionCard";

export function HeroSection({ featuredDeck }: { featuredDeck: Deck }) {
  const featuredQuestion = featuredDeck.questions[0];

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-8 pt-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-14">
      <div>
        <p className="paper-label mb-4 inline-flex rotate-[-1deg] rounded-[0.8rem] px-3 py-2 text-sm font-black uppercase tracking-[0.14em] text-coral">
          Mazo de conversación
        </p>
        <h1 className="display-serif max-w-3xl text-5xl font-bold leading-[0.98] text-ink sm:text-7xl">
          No es un quiz. Es una excusa para conversar.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-ink/70">
          Elige un mazo. Haz una pregunta. Escucha algo nuevo. Preguntas para charlar, viajar, romper el hielo o matar el aburrimiento.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link className="paper-button inline-flex items-center justify-center rounded-[1rem] bg-ink px-6 py-3 text-base font-black text-white" href="/mazo/preguntas-para-charlar">
            Sacar una pregunta
          </Link>
          <Link className="paper-button inline-flex items-center justify-center rounded-[1rem] px-6 py-3 text-base font-black text-ink" href="#mazos">
            Ver mazos
          </Link>
        </div>
      </div>
      <div className="lg:pl-6">
        <QuestionCardStatic deckId={featuredDeck.id} deckTitle={featuredDeck.title} question={featuredQuestion.text} />
      </div>
    </section>
  );
}
