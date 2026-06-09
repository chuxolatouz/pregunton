import type { Metadata } from "next";
import Link from "next/link";
import { DeckCard } from "@/components/DeckCard";
import { HeroSection } from "@/components/HeroSection";
import { PaperLink, PaperSurface } from "@/components/Paper";
import { getDeckById, type Deck } from "@/data/decks";
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

const momentShortcuts = [
  {
    title: "Aburrimiento",
    description: "Una carta rápida para cambiar el ritmo.",
    deckId: "aburrido",
    className: "rotate-[-1deg] border-coral/25"
  },
  {
    title: "Amigos",
    description: "Para reírse, recordar y abrir historias.",
    deckId: "amigos",
    className: "rotate-[0.8deg] border-moss/25"
  },
  {
    title: "Pareja",
    description: "Algo cálido para hablar con calma.",
    deckId: "parejas",
    className: "rotate-[-0.4deg] border-rose/25"
  },
  {
    title: "Viaje",
    description: "Para esperas, rutas y ventanas.",
    deckId: "viajar",
    className: "rotate-[1deg] border-sky/25"
  },
  {
    title: "Profundo",
    description: "Una pregunta serena para escuchar mejor.",
    deckId: "profundas",
    className: "rotate-[-0.8deg] border-ink/20"
  },
  {
    title: "Risa",
    description: "Cartas ligeras para soltar la mesa.",
    deckId: "reirse",
    className: "rotate-[0.5deg] border-marigold/35"
  }
];

const featuredDeckIds = ["charlar", "romper-hielo", "aburrido", "viajar", "parejas", "profundas"];

const isDeck = (deck: Deck | undefined): deck is Deck => Boolean(deck);

export default function HomePage() {
  const featuredDecks = featuredDeckIds.map(getDeckById).filter(isDeck);

  return (
    <main>
      <HeroSection />

      <section aria-labelledby="como-funciona" className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="como-funciona" className="display-serif text-3xl font-bold text-ink sm:text-4xl">
            Cómo funciona
          </h2>
          <p className="mt-3 text-base leading-7 text-ink/66">
            No hay reglas raras. Solo una carta y una conversación posible.
          </p>
        </div>
        <ol className="mt-7 grid gap-3 sm:grid-cols-3">
          {["Saca una carta.", "Léela en voz alta.", "Deja que la conversación siga."].map((step, index) => (
            <li className="paper-surface rounded-[1rem] px-4 py-5 text-center text-base font-black text-ink" key={step}>
              <span className="display-serif mr-2 text-2xl text-coral">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="elige-momento" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 id="elige-momento" className="display-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Elige el momento
            </h2>
            <p className="mt-3 text-base leading-7 text-ink/66 sm:text-lg sm:leading-8">
              Si no sabes por dónde empezar, elige el contexto. Pregunton hace el resto.
            </p>
          </div>
          <PaperLink className="w-full sm:w-auto" href="/mazos" tone="plain">
            Ver biblioteca
          </PaperLink>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {momentShortcuts.map((shortcut) => {
            const deck = getDeckById(shortcut.deckId);

            if (!deck) {
              return null;
            }

            return (
              <Link
                aria-label={`Sacar carta del mazo ${deck.title}`}
                className={`paper-surface paper-lift rounded-[1.05rem] border px-5 py-5 ${shortcut.className}`}
                href={`/mazo/${deck.seoSlug}`}
                key={shortcut.title}
              >
                <span className="display-serif block text-2xl font-bold leading-tight text-ink">{shortcut.title}</span>
                <span className="mt-2 block text-sm leading-6 text-ink/64">{shortcut.description}</span>
                <span className="mt-4 inline-flex text-sm font-black text-coral">Sacar carta</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="mazos-para-empezar" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 id="mazos-para-empezar" className="display-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Seis mazos para empezar
            </h2>
            <p className="mt-3 text-base leading-7 text-ink/66 sm:text-lg sm:leading-8">
              Una muestra corta. La exploración completa vive en la biblioteca de mazos.
            </p>
          </div>
          <PaperLink className="w-full sm:w-auto" href="/mazos" tone="plain">
            Ver todos
          </PaperLink>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredDecks.slice(0, 6).map((deck) => (
            <DeckCard compact deck={deck} key={deck.id} />
          ))}
        </div>

        <PaperSurface className="mx-auto mt-10 max-w-2xl rounded-[1.05rem] px-5 py-5 text-center text-base leading-7 text-ink/66">
          No hay puntos ni respuestas correctas. Hay mazos para charlar, romper el hielo, viajar, reírse o entrar en una conversación más profunda.
        </PaperSurface>
      </section>
    </main>
  );
}
