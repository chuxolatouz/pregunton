"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

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
    <div className={cn("w-full max-w-[min(18rem,calc(100vw-3rem))] sm:max-w-md", className)}>
      <button
        aria-label="Sacar otra carta de ejemplo"
        className={cn(
          "paper-surface hero-paper-card hero-question-demo w-full overflow-hidden rounded-[1.2rem] px-4 py-5 text-left sm:rounded-[1.35rem] sm:px-8 sm:py-10",
          isShuffling && "is-shuffling"
        )}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            drawQuestion();
          }
        }}
        onClick={drawQuestion}
        type="button"
      >
        <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-coral sm:text-xs">Carta para empezar</p>
        <p className="display-serif mt-5 min-h-[7.5rem] text-xl font-bold leading-tight text-ink min-[380px]:text-[1.45rem] sm:mt-8 sm:min-h-[12rem] sm:text-4xl">
          &ldquo;{heroQuestions[questionIndex]}&rdquo;
        </p>
      </button>
      <p className="mt-3 text-center text-[0.68rem] font-black uppercase tracking-[0.16em] text-coral/85 sm:text-xs">
        Toca para sacar otra
      </p>
    </div>
  );
}
