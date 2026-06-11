import type { Metadata } from "next";
import { DeckCard } from "@/components/DeckCard";
import { HeroSection } from "@/components/HeroSection";
import { PaperLink } from "@/components/Paper";
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

const featuredDeckIds = ["aburrido", "charlar", "parejas", "viajar", "profundas", "romper-hielo"];

const isDeck = (deck: Deck | undefined): deck is Deck => Boolean(deck);

function DrawCardIllustration() {
  return (
    <svg aria-hidden="true" className="mx-auto h-24 w-24 text-coral" fill="none" viewBox="0 0 120 120">
      <rect className="text-[#fff8e5]" fill="currentColor" height="72" rx="14" transform="rotate(-7 41 22)" width="52" x="41" y="22" />
      <rect height="72" rx="14" stroke="#262116" strokeWidth="2" transform="rotate(-7 41 22)" width="52" x="41" y="22" />
      <path d="m62 48 4 9 9 4-9 4-4 9-4-9-9-4 9-4 4-9Z" stroke="#D85A30" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function ReadCardIllustration() {
  return (
    <svg aria-hidden="true" className="mx-auto h-24 w-24 text-coral" fill="none" viewBox="0 0 120 120">
      <rect className="text-[#fff8e5]" fill="currentColor" height="70" rx="14" transform="rotate(4 34 24)" width="58" x="34" y="24" />
      <rect height="70" rx="14" stroke="#262116" strokeWidth="2" transform="rotate(4 34 24)" width="58" x="34" y="24" />
      <path d="M48 51h29M47 62h31M47 73h22" stroke="#D85A30" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function ConversationIllustration() {
  return (
    <svg aria-hidden="true" className="mx-auto h-24 w-24 text-coral" fill="none" viewBox="0 0 120 120">
      <path d="M31 38c0-9 8-16 18-16h16c10 0 18 7 18 16s-8 16-18 16H53L39 65l4-12c-7-2-12-8-12-15Z" fill="#fff8e5" stroke="#262116" strokeLinejoin="round" strokeWidth="2" />
      <path d="M44 72c0-8 7-15 17-15h15c9 0 16 7 16 15s-7 15-16 15H64L52 96l3-11c-7-2-11-7-11-13Z" fill="#F5C4B3" stroke="#262116" strokeLinejoin="round" strokeWidth="2" />
      <path d="M47 39h20M59 72h18" stroke="#D85A30" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

const steps = [
  {
    title: "Saca una carta",
    description: "Elige un momento o entra directo a un mazo.",
    Illustration: DrawCardIllustration
  },
  {
    title: "Léela en voz alta",
    description: "Una pregunta corta funciona mejor cuando se comparte.",
    Illustration: ReadCardIllustration
  },
  {
    title: "Deja que la conversación siga",
    description: "No hay turnos estrictos ni respuestas correctas.",
    Illustration: ConversationIllustration
  }
];

export default function HomePage() {
  const featuredDecks = featuredDeckIds.map(getDeckById).filter(isDeck);

  return (
    <main>
      <HeroSection />

      <section aria-labelledby="como-funciona" className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="como-funciona" className="display-serif text-3xl font-bold text-ink sm:text-4xl">
            Cómo funciona
          </h2>
          <p className="mt-3 text-base leading-7 text-ink/66">
            No hay reglas raras. Solo una carta y una conversación posible.
          </p>
        </div>
        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          {steps.map(({ title, description, Illustration }, index) => (
            <li className="paper-surface rounded-[1.15rem] px-5 py-6 text-center" key={title}>
              <Illustration />
              <h3 className="mt-2 text-base font-black text-ink">
                <span className="display-serif mr-2 text-2xl text-coral">{index + 1}.</span>
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink/62">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="elige-momento" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="max-w-2xl">
            <h2 id="elige-momento" className="display-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">
              Elige el momento
            </h2>
            <p className="mt-3 text-base leading-7 text-ink/66 sm:text-lg sm:leading-8">
              Si no sabes por dónde empezar, elige el contexto. Pregunton hace el resto.
            </p>
          </div>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDecks.map((deck) => (
            <DeckCard compact deck={deck} key={deck.id} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <PaperLink className="w-full sm:w-auto" href="/mazos" tone="plain">
            Ver todos los mazos
          </PaperLink>
        </div>
      </section>

      <section aria-labelledby="cierre" className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 id="cierre" className="display-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Sin puntos. Sin respuestas correctas.
          </h2>
          <p className="mt-3 text-base leading-7 text-ink/66 sm:text-lg sm:leading-8">
            Solo mazos para charlar, romper el hielo, viajar, reírse o entrar en una conversación más profunda.
          </p>
          <PaperLink className="mt-7 w-full sm:w-auto" href="/mazo/preguntas-random" tone="ink">
            Sacar una carta
          </PaperLink>
        </div>
      </section>
    </main>
  );
}
