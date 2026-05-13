import Link from "next/link";
import type { Deck } from "@/data/decks";
import { QuestionCardStatic } from "@/components/QuestionCard";

export function HeroSection({ featuredDeck }: { featuredDeck: Deck }) {
  const featuredQuestion = featuredDeck.questions[0];

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-8 pt-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-14">
      <div>
        <h1 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-6xl">
          No es un quiz. Es una excusa para conversar.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-ink/70">
          Elige un mazo. Haz una pregunta. Escucha algo nuevo. Preguntas para charlar, viajar, romper el hielo o matar el aburrimiento.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-base font-bold text-white shadow-soft hover:bg-ink/90" href="/mazo/preguntas-para-charlar">
            Sacar una pregunta
          </Link>
          <Link className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-bold text-ink shadow-soft ring-1 ring-ink/10 hover:bg-paper" href="#mazos">
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
