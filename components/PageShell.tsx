import Link from "next/link";
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link className="group inline-flex items-center gap-2 font-semibold text-ink" href="/">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm text-white shadow-soft transition-transform group-hover:-rotate-6">
            P
          </span>
          <span>Pregunton</span>
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-3 text-sm font-medium text-ink/70">
          <Link className="rounded-full px-3 py-2 hover:bg-white focus-visible:bg-white" href="/preguntas-para-charlar">
            Preguntas
          </Link>
          <Link className="rounded-full bg-ink px-4 py-2 text-white shadow-soft hover:bg-ink/90" href="/mazo/preguntas-para-charlar">
            Sacar carta
          </Link>
        </nav>
      </header>
      {children}
      <footer className="mx-auto mt-12 max-w-6xl px-4 pb-10 pt-8 text-sm text-ink/60 sm:px-6">
        <div className="border-t border-ink/10 pt-6">
          <p>Pregunton es una excusa simple para conversar mejor. Sin puntos, sin respuestas correctas.</p>
        </div>
      </footer>
    </div>
  );
}
