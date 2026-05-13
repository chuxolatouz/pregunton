export function FAQSection({ items }: { items?: Array<{ question: string; answer: string }> }) {
  if (!items?.length) return null;

  return (
    <section aria-labelledby="faq-title" className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h2 id="faq-title" className="text-2xl font-black tracking-tight text-ink">
        Preguntas frecuentes
      </h2>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <details className="rounded-[1.2rem] border border-ink/10 bg-white p-4 shadow-soft" key={item.question}>
            <summary className="cursor-pointer text-base font-bold text-ink">{item.question}</summary>
            <p className="mt-3 text-sm leading-6 text-ink/68">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
