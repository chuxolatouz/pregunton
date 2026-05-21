import type { MetadataRoute } from "next";
import { decks, seoPages } from "@/data/decks";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/mazos"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85
    },
    ...seoPages.map((page) => ({
      url: absoluteUrl(`/${page.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9
    })),
    ...decks.map((deck) => ({
      url: absoluteUrl(`/mazo/${deck.seoSlug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
