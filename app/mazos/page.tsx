import type { Metadata } from "next";
import { DeckDiscovery } from "@/components/DeckDiscovery";
import { getDiscoveryDecks } from "@/data/decks";
import { defaultOgImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mazos de preguntas para conversar",
  description: "Explora mazos de preguntas por momento, intensidad o categoría y saca una carta para empezar a conversar.",
  alternates: {
    canonical: "/mazos"
  },
  openGraph: {
    title: "Mazos de Pregunton para cada conversación",
    description: "Busca preguntas por momento, tono o mesa de mazos.",
    url: "/mazos",
    type: "website",
    locale: "es",
    images: [defaultOgImage]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mazos de Pregunton para cada conversación",
    description: "Busca preguntas por momento, tono o mesa de mazos.",
    images: [defaultOgImage.url]
  }
};

export default function MazosPage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pb-2 pt-8 sm:px-6">
        <p className="paper-label inline-flex rotate-[-1deg] rounded-[0.8rem] px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-coral">
          Biblioteca de mazos
        </p>
        <h1 className="display-serif mt-4 max-w-4xl text-4xl font-bold leading-tight text-ink sm:text-6xl">
          Elige el mazo por momento, tono o mesa completa
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
          La misma colección vista de tres formas: para decidir rápido, ajustar la intensidad o explorar todos los mazos como cartas sobre la mesa.
        </p>
      </section>
      <DeckDiscovery decks={getDiscoveryDecks()} defaultMode="momentos" />
    </main>
  );
}

