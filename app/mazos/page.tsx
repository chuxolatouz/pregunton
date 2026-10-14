import type { Metadata } from "next";
import { DeckDiscovery } from "@/components/DeckDiscovery";
import { getDiscoveryDecks } from "@/data/decks";
import { defaultOgImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mazos de preguntas para conversar",
  description:
    "Explora mazos de preguntas por momento, intensidad o categoría y saca una carta para empezar a conversar.",
  alternates: {
    canonical: "/mazos",
  },
  openGraph: {
    title: "Mazos de Pregunton para cada conversación",
    description: "Busca preguntas por momento, tono o mesa de mazos.",
    url: "/mazos",
    type: "website",
    locale: "es",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mazos de Pregunton para cada conversación",
    description: "Busca preguntas por momento, tono o mesa de mazos.",
    images: [defaultOgImage.url],
  },
};

export default function MazosPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pb-5 pt-6 sm:px-6 sm:pb-7 sm:pt-9">
        <h1 className="display-serif text-4xl font-semibold sm:text-5xl">
          Elige un mazo
        </h1>
        <p className="mt-2 text-ink/70">Una pregunta para este momento.</p>
      </section>
      <DeckDiscovery decks={getDiscoveryDecks()} defaultMode="momentos" />
    </main>
  );
}
