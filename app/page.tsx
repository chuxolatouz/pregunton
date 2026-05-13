import type { Metadata } from "next";
import { CategoryGrid } from "@/components/CategoryGrid";
import { HeroSection } from "@/components/HeroSection";
import { decks, getDeckById } from "@/data/decks";

export const metadata: Metadata = {
  title: "Pregunton: preguntas para charlar, viajar y romper el hielo",
  description: "Elige un mazo de preguntas, saca una carta y empieza una conversación natural en segundos.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Pregunton: no es un quiz, es una excusa para conversar",
    description: "Preguntas para charlar, viajar, romper el hielo o matar el aburrimiento.",
    url: "/"
  }
};

export default function HomePage() {
  const featuredDeck = getDeckById("charlar") ?? decks[0];

  return (
    <main>
      <HeroSection featuredDeck={featuredDeck} />
      <div id="mazos">
        <CategoryGrid decks={decks} />
      </div>
      <section className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6">
        <h2 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">
          Hecho para leer una pregunta en voz alta
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink/68">
          No hay respuestas correctas ni puntos. Solo una carta, una pregunta y un momento para escuchar algo que quizá no salía solo.
        </p>
      </section>
    </main>
  );
}
