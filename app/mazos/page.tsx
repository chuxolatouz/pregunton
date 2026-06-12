import type { Metadata } from "next";
import { DeckThemeIcon } from "@/components/DeckThemeIcon";
import { DeckDiscovery } from "@/components/DeckDiscovery";
import { getDiscoveryDecks } from "@/data/decks";
import { getDeckThemeStyle } from "@/lib/deckTheme";
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
      <section className="mx-auto grid max-w-6xl gap-7 px-4 pb-6 pt-8 sm:px-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
        <div>
          <p className="paper-label inline-flex rotate-[-1deg] rounded-[0.8rem] px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-coral">
            Biblioteca de mazos
          </p>
          <h1 className="display-serif mt-4 max-w-4xl text-4xl font-bold leading-tight text-ink sm:text-6xl">
            Elige el mazo por momento, tono o mesa completa
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">
            La misma colección vista de tres formas: para decidir rápido, ajustar la intensidad o explorar todos los mazos como cartas sobre la mesa.
          </p>
        </div>
        <div className="relative hidden min-h-48 lg:block" aria-hidden="true">
          {[
            { deckId: "aburrido", className: "left-12 top-8 rotate-[-7deg]" },
            { deckId: "parejas", className: "left-36 top-0 rotate-[5deg]" },
            { deckId: "viajar", className: "left-60 top-10 rotate-[10deg]" }
          ].map((item) => (
            <div
              className={`paper-surface absolute grid h-36 w-28 place-items-center rounded-[1.1rem] border-[color:var(--deck-border)] bg-[color:var(--deck-paper-soft)] text-[color:var(--deck-accent)] shadow-soft ${item.className}`}
              key={item.deckId}
              style={getDeckThemeStyle(item.deckId)}
            >
              <DeckThemeIcon className="h-9 w-9" deckId={item.deckId} />
            </div>
          ))}
        </div>
      </section>
      <DeckDiscovery decks={getDiscoveryDecks()} defaultMode="momentos" />
    </main>
  );
}
