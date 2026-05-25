import type { Metadata } from "next";
import { DeckDiscovery } from "@/components/DeckDiscovery";
import { HeroSection } from "@/components/HeroSection";
import { decks, getDeckById, getDiscoveryDecks } from "@/data/decks";
import { defaultOgImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pregunton: preguntas para charlar, viajar y romper el hielo",
  description: "Elige un mazo de preguntas, saca una carta y empieza una conversación natural en segundos.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Pregunton: no es un quiz, es una excusa para conversar",
    description: "Preguntas para charlar, viajar, romper el hielo o matar el aburrimiento.",
    url: "/",
    images: [defaultOgImage]
  },
  twitter: {
    card: "summary_large_image",
    title: "Pregunton: no es un quiz, es una excusa para conversar",
    description: "Preguntas para charlar, viajar, romper el hielo o matar el aburrimiento.",
    images: [defaultOgImage.url]
  }
};

export default function HomePage() {
  const featuredDeck = getDeckById("charlar") ?? decks[0];
  const discoveryDecks = getDiscoveryDecks();

  return (
    <main>
      <HeroSection featuredDeck={featuredDeck} />
      <div id="mazos">
        <DeckDiscovery
          decks={discoveryDecks}
          defaultMode="momentos"
          eyebrow="Busca por momento"
          intro="Dinos qué está pasando ahora y te mostramos mazos que sí tienen sentido para ese momento."
          persistMode={false}
        />
      </div>
      <section className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6">
        <h2 className="display-serif text-3xl font-bold text-ink sm:text-4xl">
          Hecho para leer una pregunta en voz alta
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink/68">
          No hay respuestas correctas ni puntos. Solo una carta, una pregunta y un momento para escuchar algo que quizá no salía solo.
        </p>
      </section>
    </main>
  );
}
