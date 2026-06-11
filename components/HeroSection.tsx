import { HeroQuestionDemo } from "@/components/HeroQuestionDemo";
import { PaperLink } from "@/components/Paper";

export function HeroSection() {
  return (
    <section className="mx-auto grid min-h-[calc(100svh-8rem)] max-w-6xl items-center gap-7 px-4 pb-10 pt-4 sm:min-h-[calc(100svh-6.5rem)] sm:px-6 sm:pt-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
      <div className="min-w-0 max-w-[20rem] sm:max-w-[34rem]">
        <h1 className="display-serif text-4xl font-bold leading-[0.98] text-ink min-[380px]:text-5xl sm:text-7xl sm:leading-[0.94]">
          A veces una pregunta basta.
        </h1>
        <p className="mt-4 max-w-[32rem] text-base leading-7 text-ink/72 sm:mt-5 sm:text-xl sm:leading-9">
          Saca una carta para romper el silencio, empezar una charla o descubrir algo nuevo de alguien.
        </p>
        <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row">
          <PaperLink className="px-6 text-base" href="/mazo/preguntas-random" tone="ink">
            Sacar una carta
          </PaperLink>
          <PaperLink className="px-4 text-base" href="/mazos" tone="quiet">
            Ver mazos
          </PaperLink>
        </div>
      </div>
      <div className="flex min-w-0 justify-center pb-5 sm:justify-center lg:justify-end lg:pb-0">
        <HeroQuestionDemo />
      </div>
    </section>
  );
}
