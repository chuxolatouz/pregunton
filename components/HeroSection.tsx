import { HeroQuestionDemo } from "@/components/HeroQuestionDemo";
import { PaperLink } from "@/components/Paper";
import { SparkIcon } from "@/components/icons";

export function HeroSection() {
  return (
    <section className="hero-layout mx-auto grid min-h-[calc(100svh-4.25rem)] max-w-6xl items-center gap-7 px-4 pb-28 pt-3 sm:min-h-[calc(100svh-7rem)] sm:px-6 sm:pb-12 sm:pt-7 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
      <div className="min-w-0 max-w-[22rem] sm:max-w-[35rem]">
        <p className="mb-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-coral sm:text-xs">Cartas para conversar</p>
        <h1 className="display-serif text-[2.8rem] font-semibold leading-[0.96] text-ink min-[380px]:text-5xl sm:text-7xl sm:leading-[0.92]">
          A veces una pregunta basta.
        </h1>
        <p className="mt-4 max-w-[32rem] text-base leading-7 text-ink/68 sm:mt-5 sm:text-xl sm:leading-9">
          Saca una carta para romper el silencio, empezar una charla o descubrir algo nuevo de alguien.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-7">
          <PaperLink className="gap-2 px-5 text-base sm:px-6" href="/mazo/preguntas-random" tone="ink">
            <SparkIcon className="h-4 w-4" />
            Sacar una carta
          </PaperLink>
          <PaperLink className="px-3 text-sm sm:px-4 sm:text-base" href="/mazos" tone="quiet">
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
