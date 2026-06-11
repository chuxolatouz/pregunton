"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/BrandLogo";

export function PageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isImmersiveDeck = pathname?.startsWith("/mazo/");
  const isHome = pathname === "/";

  if (isImmersiveDeck) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link aria-label="Ir al inicio de Pregunton" className="group inline-flex items-center font-semibold text-ink" href="/">
          <BrandLogo priority variant="mark" className="sm:hidden" imageClassName="transition-transform group-hover:-rotate-6" />
          <BrandLogo priority variant="compact" className="hidden sm:inline-flex lg:hidden" imageClassName="h-11 w-auto transition-transform group-hover:rotate-[-1deg]" />
          <BrandLogo priority variant="horizontal" className="hidden lg:inline-flex" imageClassName="h-12 w-auto transition-transform group-hover:rotate-[-1deg]" />
        </Link>
        {!isHome ? (
          <nav aria-label="Principal" className="flex items-center gap-1.5 text-xs font-medium text-ink/70 sm:gap-3 sm:text-sm">
            <Link className="hidden rounded-[0.8rem] px-3 py-2 font-bold hover:bg-white/50 focus-visible:bg-white sm:inline-flex" href="/mazos">
              Mazos
            </Link>
            <Link className="rounded-[0.8rem] px-2 py-2 font-bold hover:bg-white/50 focus-visible:bg-white sm:px-3" href="/mis-cartas">
              Mis cartas
            </Link>
            <Link className="paper-button paper-button-ink rounded-[0.9rem] px-3 py-2 font-black text-white sm:px-4" href="/mazo/preguntas-para-charlar">
              Sacar carta
            </Link>
          </nav>
        ) : null}
      </header>
      {children}
      <footer className="mx-auto mt-12 max-w-6xl px-4 pb-10 pt-8 text-sm text-ink/60 sm:px-6">
        <div className="grid gap-6 border-t border-dashed border-ink/15 pt-6 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <BrandLogo variant="compact" imageClassName="h-10 w-auto opacity-90" />
            <p className="mt-3 max-w-xl">Pregunton es una excusa simple para conversar mejor. Sin puntos, sin respuestas correctas.</p>
          </div>
          <nav aria-label="Enlaces del pie" className="flex flex-wrap gap-x-4 gap-y-2 font-bold text-ink/70 sm:justify-end">
            <Link className="underline decoration-dashed underline-offset-4 hover:text-ink focus-visible:text-ink" href="/mazos">
              Mazos
            </Link>
            <Link className="underline decoration-dashed underline-offset-4 hover:text-ink focus-visible:text-ink" href="/preguntas-random">
              Random
            </Link>
            <Link className="underline decoration-dashed underline-offset-4 hover:text-ink focus-visible:text-ink" href="/preguntas-para-parejas">
              Parejas
            </Link>
            <Link className="underline decoration-dashed underline-offset-4 hover:text-ink focus-visible:text-ink" href="/preguntas-para-amigos">
              Amigos
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
