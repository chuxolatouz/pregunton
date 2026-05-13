export function FAQSection({ items }: { items?: Array<{ question: string; answer: string }> }) {
  if (!items?.length) return null;

  return (
    <section aria-labelledby="faq-title" className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h2 id="faq-title" className="display-serif text-3xl font-bold text-ink">
        Preguntas frecuentes
      </h2>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <details className="paper-surface rounded-[1rem] p-4" key={item.question}>
            <summary className="cursor-pointer text-base font-bold text-ink">{item.question}</summary>
            <p className="mt-3 text-sm leading-6 text-ink/68">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
