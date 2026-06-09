"use client";

import { ArrowLeftIcon, ArrowRightIcon, ShuffleIcon } from "@/components/icons";
import { PaperButton } from "@/components/Paper";

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
      <PaperButton
        aria-label="Pregunta anterior"
        className="paper-note-button px-4"
        onClick={onPrevious}
        type="button"
      >
        <ArrowLeftIcon />
      </PaperButton>
      <PaperButton
        aria-label="Pregunta aleatoria"
        className="paper-note-button paper-note-button-random gap-2"
        onClick={onRandom}
        type="button"
      >
        <ShuffleIcon className="h-4 w-4" />
        Random
      </PaperButton>
      <PaperButton
        aria-label="Siguiente pregunta"
        className="paper-note-button paper-note-button-next px-4"
        onClick={onNext}
        type="button"
      >
        <ArrowRightIcon />
      </PaperButton>
    </div>
  );
}
