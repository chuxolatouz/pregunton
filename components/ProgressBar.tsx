export function ProgressBar({ current, total }: { current: number; total: number }) {
  const percent = total > 0 ? (current / total) * 100 : 0;
  const marks = Array.from({ length: Math.min(total, 20) }, (_, index) => index + 1);

  return (
    <div aria-label={`Pregunta ${current} de ${total}`} className="space-y-2" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={current}>
      <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.14em] text-ink/50">
        <span>
          Carta {current}
        </span>
        <span>{total} preguntas</span>
      </div>
      <div className="flex items-center gap-1" aria-hidden="true">
        {marks.map((mark) => (
          <span
            className={mark <= current ? "h-2 flex-1 rounded-full bg-ink/70" : "h-2 flex-1 rounded-full bg-ink/12"}
            key={mark}
          />
        ))}
      </div>
      <span className="sr-only">{Math.round(percent)}% del mazo visto</span>
    </div>
  );
}
