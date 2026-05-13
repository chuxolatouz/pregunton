import type { SeoPage } from "@/data/decks";
import type { Deck } from "@/data/decks";
import { absoluteUrl } from "@/lib/utils";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pregunton",
    url: absoluteUrl("/"),
    inLanguage: "es",
    description: "Mazos de preguntas para conversar, viajar, romper el hielo y pasar el rato."
  };
}

export function collectionJsonLd(page: SeoPage, deck: Deck) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.h1,
    description: page.description,
    url: absoluteUrl(`/${page.slug}`),
    inLanguage: "es",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: deck.questions.map((question, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: question.text
      }))
    }
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url)
    }))
  };
}

export function faqJsonLd(items?: Array<{ question: string; answer: string }>) {
  if (!items?.length) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
