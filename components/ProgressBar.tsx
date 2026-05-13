export function ProgressBar({ current, total }: { current: number; total: number }) {
  const percent = total > 0 ? (current / total) * 100 : 0;

  return (
    <div aria-label={`Pregunta ${current} de ${total}`} className="space-y-2" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={current}>
      <div className="flex items-center justify-between text-sm font-semibold text-ink/60">
        <span>
          {current} de {total}
        </span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ink/10">
        <div className="h-full rounded-full bg-moss transition-all duration-300" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
