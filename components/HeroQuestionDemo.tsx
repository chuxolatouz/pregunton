"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ShuffleIcon } from "@/components/icons";

const heroQuestions = [
  "¿Qué canción pondrías para cambiar el mood de este momento?",
  "¿Qué objeto de tu casa tendría más chismes si hablara?",
  "¿Qué plan barato puede cambiar por completo un día lento?",
  "¿Qué frase usarías como saludo oficial de tu casa?",
  "¿Qué comida pedirías para una noche sin reglas?",
  "¿Qué teoría absurda defenderías por cinco minutos?",
  "¿Qué personaje ficticio invitarías para animar la tarde?",
  "¿Qué pregunta rara harías sin pensarlo tanto?"
];

export function HeroQuestionDemo({ className }: { className?: string }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  function drawQuestion() {
    if (isShuffling) {
      return;
    }

    setIsShuffling(true);
    window.setTimeout(() => {
      setQuestionIndex((current) => (current + 1) % heroQuestions.length);
      setIsShuffling(false);
    }, 180);
  }

  return (
    <div className={cn("paper-stack w-full max-w-[min(20rem,calc(100vw-2.5rem))] rounded-[1.45rem] sm:max-w-md", className)}>
      <button
        aria-label="Sacar otra carta de ejemplo"
        className={cn(
          "paper-surface hero-paper-card hero-question-demo w-full overflow-hidden rounded-[1.4rem] px-5 py-5 text-left sm:rounded-[1.6rem] sm:px-8 sm:py-9",
          isShuffling && "is-shuffling"
        )}
        onClick={drawQuestion}
        type="button"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.66rem] font-black uppercase tracking-[0.16em] text-coral sm:text-xs">Carta para empezar</p>
          <span className="font-mono text-[0.65rem] font-bold text-ink/38">{String(questionIndex + 1).padStart(2, "0")} / {String(heroQuestions.length).padStart(2, "0")}</span>
        </div>
        <p aria-live="polite" className="display-serif mt-5 min-h-[7rem] text-[1.55rem] font-semibold leading-[1.06] text-ink sm:mt-8 sm:min-h-[11rem] sm:text-[2.45rem]">
          &ldquo;{heroQuestions[questionIndex]}&rdquo;
        </p>
        <span className="mt-4 flex items-center justify-between border-t border-dashed border-ink/15 pt-3 text-[0.65rem] font-black uppercase tracking-[0.14em] text-ink/45">
          Toca para mezclar
          <ShuffleIcon className="h-4 w-4 text-coral" />
        </span>
      </button>
    </div>
  );
}
