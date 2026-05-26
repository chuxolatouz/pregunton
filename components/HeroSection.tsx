import Link from "next/link";

export function HeroSection() {
  return (
    <section className="mx-auto grid min-h-[calc(100svh-5.5rem)] max-w-6xl items-center gap-10 px-4 pb-14 pt-8 sm:px-6 lg:grid-cols-[0.96fr_1.04fr] lg:gap-14 lg:pb-18">
      <div className="max-w-xl">
        <h1 className="display-serif text-5xl font-bold leading-[0.98] text-ink sm:text-7xl sm:leading-[0.94]">
          A veces una pregunta basta.
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink/72 sm:text-xl sm:leading-9">
          Saca una carta para romper el silencio, empezar una charla o descubrir algo nuevo de alguien.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link className="paper-button inline-flex min-h-12 items-center justify-center rounded-[1rem] bg-ink px-6 py-3 text-base font-black text-white" href="/mazo/preguntas-random">
            Sacar una carta
          </Link>
          <Link className="inline-flex min-h-12 items-center justify-center rounded-[1rem] px-4 py-3 text-base font-black text-ink/70 underline decoration-dashed underline-offset-8 transition hover:text-ink focus-visible:text-ink" href="/mazos">
            Ver mazos
          </Link>
        </div>
      </div>
      <div className="flex justify-center lg:justify-end">
        <article className="paper-surface paper-stack w-full max-w-md rotate-[1.4deg] rounded-[1.35rem] px-6 py-8 shadow-none sm:px-8 sm:py-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-coral">
            Carta para empezar
          </p>
          <p className="display-serif mt-8 text-3xl font-bold leading-tight text-ink sm:text-4xl">
            “¿Qué canción pondrías para cambiar el mood de este momento?”
          </p>
        </article>
      </div>
    </section>
  );
}
