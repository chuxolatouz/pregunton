import { cn } from "@/lib/utils";
import { deckThemeClass } from "@/lib/deckTheme";
import { PaperBadge } from "@/components/Paper";

export function QuestionCardStatic({
  question,
  deckTitle,
  deckId,
  className
}: {
  question: string;
  deckTitle: string;
  deckId?: string;
  className?: string;
}) {
  return (
    <article className={cn("paper-surface paper-stack paper-lift relative overflow-hidden rounded-[1.35rem] p-7 sm:rotate-[-1deg]", className)}>
      <div className={cn("absolute right-5 top-5 h-16 w-16 rounded-full border border-dashed opacity-70", deckId ? deckThemeClass(deckId, "soft") : "border-coral/30")} />
      <PaperBadge className={deckId ? deckThemeClass(deckId, "accent") : "text-coral"}>
        {deckTitle}
      </PaperBadge>
      <p className="display-serif mt-10 text-3xl font-bold leading-tight text-ink sm:text-4xl">“{question}”</p>
      <p className="mt-8 border-t border-dashed border-ink/15 pt-4 text-sm font-semibold text-ink/55">Léela en voz alta. La conversación empieza ahí.</p>
    </article>
  );
}

export function QuestionCard({
  question,
  deckTitle,
  deckId,
  status,
  footer
}: {
  question: string;
  deckTitle: string;
  deckId: string;
  status?: string;
  footer?: string;
}) {
  return (
    <article className="paper-surface paper-stack relative flex min-h-[50dvh] w-full max-w-3xl flex-col justify-between overflow-hidden rounded-[1.65rem] px-6 py-7 shadow-2xl sm:min-h-[56dvh] sm:px-10 sm:py-9">
      <div className="pointer-events-none absolute right-6 top-6 h-20 w-20 rounded-full border border-dashed border-ink/10" />
      <div className="relative z-10 flex items-center justify-between gap-4">
        <PaperBadge className={deckThemeClass(deckId, "accent")}>{deckTitle}</PaperBadge>
        <p className="min-h-4 text-xs font-black text-moss" aria-live="polite" role="status">
          {status}
        </p>
      </div>
      <div className="relative z-10 flex flex-1 items-center py-8 text-center sm:py-10">
        <p className="display-serif mx-auto max-w-2xl text-[clamp(2rem,7vw,4.35rem)] font-bold leading-[1.02] text-ink">
          “{question}”
        </p>
      </div>
      <div className="relative z-10 flex items-center justify-between border-t border-dashed border-ink/15 pt-4 text-xs font-bold uppercase tracking-[0.14em] text-ink/42">
        <span>{footer ?? "Pregunta para leer"}</span>
        <span>Pregunton</span>
      </div>
    </article>
  );
}
