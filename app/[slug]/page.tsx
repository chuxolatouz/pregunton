import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DeckThemeIcon } from "@/components/DeckThemeIcon";
import { FAQSection } from "@/components/FAQSection";
import { QuestionCardStatic } from "@/components/QuestionCard";
import { RelatedDecks } from "@/components/RelatedDecks";
import { SEOQuestionList } from "@/components/SEOQuestionList";
import { getDeckById, getSeoPage, seoPages } from "@/data/decks";
import { JsonLd } from "@/lib/JsonLd";
import { breadcrumbJsonLd, collectionJsonLd, defaultOgImage, faqJsonLd } from "@/lib/seo";
import { getDeckThemeStyle } from "@/lib/deckTheme";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);

  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords],
    alternates: {
      canonical: `/${page.slug}`
    },
    openGraph: {
      title: page.ogTitle,
      description: page.ogDescription,
      url: `/${page.slug}`,
      type: "website",
      locale: "es",
      images: [defaultOgImage]
    },
    twitter: {
      card: "summary_large_image",
      title: page.ogTitle,
      description: page.ogDescription,
      images: [defaultOgImage.url]
    }
  };
}

export default async function SeoLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  const deck = getDeckById(page.deckId);
  if (!deck) notFound();

  const faqSchema = faqJsonLd(page.faq);

  return (
    <main>
      <JsonLd data={collectionJsonLd(page, deck)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", url: "/" },
          { name: page.h1, url: `/${page.slug}` }
        ])}
      />
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
      <Breadcrumbs current={page.h1} />

      <section className="mx-auto grid max-w-5xl gap-7 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center" style={getDeckThemeStyle(deck.id)}>
        <div>
          <p className="paper-label inline-flex rotate-[-1deg] items-center gap-2 rounded-[0.8rem] border-[color:var(--deck-border)] bg-[color:var(--deck-paper-soft)] px-3 py-2 text-sm font-black uppercase tracking-[0.14em] text-[color:var(--deck-ink)]">
            <DeckThemeIcon className="h-4 w-4 text-[color:var(--deck-accent)]" deckId={deck.id} />
            {page.primaryKeyword}
          </p>
          <h1 className="display-serif mt-4 text-4xl font-bold leading-tight text-ink sm:text-6xl">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">{page.intro}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link className="paper-button paper-button-ink inline-flex justify-center rounded-[1rem] px-6 py-3 text-base font-black text-white" href={`/mazo/${deck.seoSlug}`}>
              Abrir en modo cartas
            </Link>
            <a className="paper-button paper-note-button inline-flex justify-center rounded-[1rem] border-[color:var(--deck-border)] px-6 py-3 text-base font-black text-[color:var(--deck-ink)]" href="#preguntas">
              Ver preguntas
            </a>
          </div>
        </div>
        <QuestionCardStatic deckId={deck.id} deckTitle={deck.title} question={deck.questions[0].text} />
      </section>

      <section className="mx-auto max-w-4xl px-4 py-6 sm:px-6" style={getDeckThemeStyle(deck.id)}>
        <div className="paper-surface rounded-[1.1rem] border-[color:var(--deck-border)] p-5">
          <div className="flex items-start gap-4">
            <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-[0.95rem] border border-[color:var(--deck-border)] bg-[color:var(--deck-paper-soft)] text-[color:var(--deck-accent)]">
              <DeckThemeIcon deckId={deck.id} />
            </span>
            <div>
              <h2 className="display-serif text-3xl font-bold text-ink">Cómo usar este mazo</h2>
              <p className="mt-3 text-base leading-7 text-ink/68">
                Elige una pregunta que se sienta adecuada para el momento. Si quieres algo más rápido, abre el modo cartas y usa siguiente, anterior o aleatoria.
              </p>
            </div>
          </div>
          {deck.source ? (
            <div className="mt-4 rounded-[0.8rem] border border-dashed border-[color:var(--deck-border)] bg-white/45 p-3 text-sm leading-6 text-ink/65">
              <p className="font-black text-ink/75">Referencia verificable</p>
              <a className="font-bold underline decoration-dashed underline-offset-4 hover:text-ink" href={deck.source.url} rel="noreferrer" target="_blank">
                {deck.source.label}
              </a>
              {deck.source.note ? <p className="mt-2">{deck.source.note}</p> : null}
            </div>
          ) : null}
        </div>
      </section>

      <div id="preguntas">
        <SEOQuestionList deck={deck} title={page.h2} />
      </div>

      <RelatedDecks slugs={page.related} />
      <FAQSection items={page.faq} />

      <section className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6" style={getDeckThemeStyle(deck.id)}>
        <h2 className="display-serif text-3xl font-bold text-ink">¿Quieres una pregunta ahora?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink/68">
          Abre este mismo mazo como cartas y úsalo en una conversación real, sin preparación.
        </p>
        <Link className="paper-button paper-note-button mt-5 inline-flex rounded-[1rem] border-[color:var(--deck-border)] bg-[color:var(--deck-paper-soft)] px-6 py-3 text-base font-black text-[color:var(--deck-ink)]" href={`/mazo/${deck.seoSlug}`}>
          Sacar pregunta
        </Link>
      </section>
    </main>
  );
}
