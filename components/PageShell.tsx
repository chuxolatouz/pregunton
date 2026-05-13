import Link from "next/link";
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link className="group inline-flex items-center gap-2 font-semibold text-ink" href="/">
          <span className="paper-surface grid h-10 w-10 rotate-[-3deg] place-items-center rounded-[0.8rem] text-sm font-black text-ink transition-transform group-hover:-rotate-6">
            P
          </span>
          <span className="display-serif text-xl font-bold">Pregunton</span>
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-3 text-sm font-medium text-ink/70">
          <Link className="rounded-[0.8rem] px-3 py-2 font-bold hover:bg-white/50 focus-visible:bg-white" href="/preguntas-para-charlar">
            Preguntas
          </Link>
          <Link className="paper-button rounded-[0.9rem] bg-ink px-4 py-2 font-black text-white" href="/mazo/preguntas-para-charlar">
            Sacar carta
          </Link>
        </nav>
      </header>
      {children}
      <footer className="mx-auto mt-12 max-w-6xl px-4 pb-10 pt-8 text-sm text-ink/60 sm:px-6">
        <div className="border-t border-dashed border-ink/15 pt-6">
          <p>Pregunton es una excusa simple para conversar mejor. Sin puntos, sin respuestas correctas.</p>
        </div>
      </footer>
    </div>
  );
}
