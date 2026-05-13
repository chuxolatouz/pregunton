"use client";

import { ArrowLeftIcon, ArrowRightIcon, ShuffleIcon } from "@/components/icons";

export function QuestionControls({
  onPrevious,
  onNext,
  onRandom
}: {
  onPrevious: () => void;
  onNext: () => void;
  onRandom: () => void;
}) {
  return (
    <div className="grid grid-cols-[1fr_1.2fr_1fr] gap-3">
      <button
        aria-label="Pregunta anterior"
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-4 text-ink shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-0.5"
        onClick={onPrevious}
        type="button"
      >
        <ArrowLeftIcon />
      </button>
      <button
        aria-label="Pregunta aleatoria"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-marigold px-4 text-sm font-black text-ink shadow-soft transition hover:-translate-y-0.5"
        onClick={onRandom}
        type="button"
      >
        <ShuffleIcon className="h-4 w-4" />
        Random
      </button>
      <button
        aria-label="Siguiente pregunta"
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-4 text-white shadow-soft transition hover:-translate-y-0.5"
        onClick={onNext}
        type="button"
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
}
