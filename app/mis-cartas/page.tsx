import type { Metadata } from "next";
import { SavedCardsClient } from "@/components/SavedCardsClient";
import { decks } from "@/data/decks";
import { defaultOgImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mis cartas guardadas",
  description: "Tus preguntas guardadas en Pregunton para volver a leerlas o compartirlas.",
  alternates: {
    canonical: "/mis-cartas"
  },
  openGraph: {
    title: "Mis cartas guardadas en Pregunton",
    description: "Preguntas favoritas guardadas en este dispositivo.",
    url: "/mis-cartas",
    type: "website",
    locale: "es",
    images: [defaultOgImage]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mis cartas guardadas en Pregunton",
    description: "Preguntas favoritas guardadas en este dispositivo.",
    images: [defaultOgImage.url]
  }
};

export default function SavedCardsPage() {
  return (
    <main>
      <SavedCardsClient decks={decks} />
    </main>
  );
}
