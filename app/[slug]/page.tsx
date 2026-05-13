import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { QuestionCardStatic } from "@/components/QuestionCard";
import { RelatedDecks } from "@/components/RelatedDecks";
import { SEOQuestionList } from "@/components/SEOQuestionList";
import { getDeckById, getSeoPage, seoPages } from "@/data/decks";
import { JsonLd } from "@/lib/JsonLd";
import { breadcrumbJsonLd, collectionJsonLd, faqJsonLd } from "@/lib/seo";

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
      locale: "es"
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

      <section className="mx-auto grid max-w-5xl gap-7 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="paper-label inline-flex rotate-[-1deg] rounded-[0.8rem] px-3 py-2 text-sm font-black uppercase tracking-[0.14em] text-coral">{page.primaryKeyword}</p>
          <h1 className="display-serif mt-4 text-5xl font-bold leading-tight text-ink sm:text-6xl">{page.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70">{page.intro}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link className="paper-button inline-flex justify-center rounded-[1rem] bg-ink px-6 py-3 text-base font-black text-white" href={`/mazo/${deck.seoSlug}`}>
              Abrir en modo cartas
            </Link>
            <a className="paper-button inline-flex justify-center rounded-[1rem] px-6 py-3 text-base font-black text-ink" href="#preguntas">
              Ver preguntas
            </a>
          </div>
        </div>
        <QuestionCardStatic deckId={deck.id} deckTitle={deck.title} question={deck.questions[0].text} />
      </section>

      <section className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <div className="paper-surface rounded-[1.1rem] p-5">
        <h2 className="display-serif text-3xl font-bold text-ink">Cómo usar este mazo</h2>
        <p className="mt-3 text-base leading-7 text-ink/68">
          Elige una pregunta que se sienta adecuada para el momento. Si quieres algo más rápido, abre el modo cartas y usa siguiente, anterior o aleatoria.
        </p>
        {deck.source ? (
          <div className="mt-4 rounded-[0.8rem] border border-dashed border-ink/15 bg-white/45 p-3 text-sm leading-6 text-ink/65">
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

      <section className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6">
        <h2 className="display-serif text-3xl font-bold text-ink">¿Quieres una pregunta ahora?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-ink/68">
          Abre este mismo mazo como cartas y úsalo en una conversación real, sin preparación.
        </p>
        <Link className="paper-button mt-5 inline-flex rounded-[1rem] bg-coral px-6 py-3 text-base font-black text-white" href={`/mazo/${deck.seoSlug}`}>
          Sacar pregunta
        </Link>
      </section>
    </main>
  );
}
