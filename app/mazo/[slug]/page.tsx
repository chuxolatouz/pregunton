import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuestionDeckClient } from "@/components/QuestionDeckClient";
import { getDeckBySlug, decks } from "@/data/decks";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return decks.map((deck) => ({ slug: deck.seoSlug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const deck = getDeckBySlug(slug);

  if (!deck) return {};

  return {
    title: `${deck.title} en modo cartas`,
    description: `${deck.description} Guarda, copia o comparte tus preguntas favoritas.`,
    alternates: {
      canonical: `/mazo/${deck.seoSlug}`
    },
    openGraph: {
      title: `${deck.title} en Pregunton`,
      description: deck.description,
      url: `/mazo/${deck.seoSlug}`,
      type: "website",
      locale: "es"
    }
  };
}

export default async function DeckModePage({ params }: PageProps) {
  const { slug } = await params;
  const deck = getDeckBySlug(slug);
  if (!deck) notFound();

  return (
    <main>
      <div className="mx-auto max-w-5xl px-4 pt-4 text-sm font-semibold text-ink/60 sm:px-6">
        <Link className="hover:text-ink" href={`/${deck.seoSlug}`}>
          Volver a la lista SEO
        </Link>
      </div>
      <QuestionDeckClient deck={deck} />
    </main>
  );
}
