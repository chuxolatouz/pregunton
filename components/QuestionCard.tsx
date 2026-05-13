import { cn } from "@/lib/utils";
import { deckThemeClass } from "@/lib/deckTheme";

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
    <article className={cn("relative overflow-hidden rounded-[2rem] border border-ink/10 bg-white p-7 shadow-card", className)}>
      <div className={cn("absolute right-5 top-5 h-16 w-16 rounded-full border", deckId ? deckThemeClass(deckId, "soft") : "border-coral/30")} />
      <p className={cn("text-sm font-bold uppercase tracking-[0.16em]", deckId ? deckThemeClass(deckId, "accent") : "text-coral")}>
        {deckTitle}
      </p>
      <p className="mt-10 text-3xl font-black leading-tight tracking-tight text-ink sm:text-4xl">“{question}”</p>
      <p className="mt-8 text-sm font-semibold text-ink/55">Léela en voz alta. La conversación empieza ahí.</p>
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
    <article className={cn("min-h-[310px] rounded-[2rem] border bg-white p-6 shadow-card sm:min-h-[360px] sm:p-8", deckThemeClass(deckId, "soft"))}>
      <div className="flex items-center justify-between gap-4">
        <p className={deckThemeClass(deckId, "accent", "text-xs font-bold uppercase tracking-[0.16em]")}>{deckTitle}</p>
        <p className="min-h-4 text-xs font-semibold text-moss" aria-live="polite" role="status">
          {status}
        </p>
      </div>
      <div className="flex min-h-[210px] items-center">
        <p className="text-3xl font-black leading-tight tracking-tight text-ink sm:text-5xl">“{question}”</p>
      </div>
    </article>
  );
}
