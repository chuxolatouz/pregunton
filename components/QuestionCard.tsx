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
  status
}: {
  question: string;
  deckTitle: string;
  deckId: string;
  status?: string;
}) {
  return (
    <article className="paper-surface paper-stack paper-lift min-h-[330px] rounded-[1.45rem] p-6 sm:min-h-[390px] sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <PaperBadge className={deckThemeClass(deckId, "accent")}>{deckTitle}</PaperBadge>
        <p className="min-h-4 text-xs font-semibold text-moss" aria-live="polite" role="status">
          {status}
        </p>
      </div>
      <div className="flex min-h-[225px] items-center">
        <p className="display-serif text-3xl font-bold leading-tight text-ink sm:text-5xl">“{question}”</p>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-dashed border-ink/15 pt-4 text-xs font-bold uppercase tracking-[0.14em] text-ink/42">
        <span>Pregunta para leer</span>
        <span>Pregunton</span>
      </div>
    </article>
  );
}
