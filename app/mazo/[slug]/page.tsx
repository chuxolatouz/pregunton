import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuestionDeckClient } from "@/components/QuestionDeckClient";
import { getDeckBySlug, decks } from "@/data/decks";
import { defaultOgImage } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ q?: string }>;
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
      locale: "es",
      images: [defaultOgImage]
    },
    twitter: {
      card: "summary_large_image",
      title: `${deck.title} en Pregunton`,
      description: deck.description,
      images: [defaultOgImage.url]
    }
  };
}

export default async function DeckModePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const deck = getDeckBySlug(slug);
  if (!deck) notFound();

  return (
    <main>
      <QuestionDeckClient deck={deck} initialQuestionId={query?.q} />
    </main>
  );
}
