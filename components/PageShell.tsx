"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { CardStackIcon, HeartIcon, HomeIcon, SparkIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const desktopLinks = [
  { href: "/mazos", label: "Mazos" },
  { href: "/mis-cartas", label: "Mis cartas" }
];

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MobileDock({ pathname }: { pathname: string }) {
  const links = [
    { href: "/", label: "Inicio", Icon: HomeIcon },
    { href: "/mazos", label: "Mazos", Icon: CardStackIcon },
    { href: "/mazo/preguntas-random", label: "Sacar", Icon: SparkIcon, primary: true },
    { href: "/mis-cartas", label: "Guardadas", Icon: HeartIcon }
  ];

  return (
    <nav aria-label="Navegación principal móvil" className="app-dock md:hidden">
      <div className="app-dock-inner">
        {links.map(({ href, label, Icon, primary }) => {
          const active = !primary && isCurrentPath(pathname, href);

          return (
            <Link
              aria-current={active ? "page" : undefined}
              className={cn("app-dock-link", active && "is-active", primary && "app-dock-link-primary")}
              href={href}
              key={href}
            >
              <span className="app-dock-icon"><Icon className="h-5 w-5" /></span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isImmersiveDeck = pathname?.startsWith("/mazo/");
  const isHome = pathname === "/";

  if (isImmersiveDeck) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="app-shell min-h-screen">
      <header className="app-header sticky top-0 z-40">
        <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl items-center justify-between px-4 sm:h-[4.75rem] sm:px-6">
        <Link aria-label="Ir al inicio de Pregunton" className="group inline-flex items-center font-semibold text-ink" href="/">
          <BrandLogo priority variant="compact" className="lg:hidden" imageClassName="h-9 w-auto transition-transform group-hover:rotate-[-1deg] sm:h-10" />
          <BrandLogo priority variant="horizontal" className="hidden lg:inline-flex" imageClassName="h-12 w-auto transition-transform group-hover:rotate-[-1deg]" />
        </Link>
        <p className="text-xs font-bold text-ink/48 md:hidden">Una pregunta basta</p>
        <nav aria-label="Principal" className="hidden items-center gap-1 text-sm text-ink/68 md:flex">
            {isHome ? <span className="mr-2 text-xs font-bold uppercase tracking-[0.12em] text-ink/42">Para conversar ahora</span> : null}
            {desktopLinks.map((link) => (
              <Link
                aria-current={isCurrentPath(pathname, link.href) ? "page" : undefined}
                className={cn("rounded-[0.85rem] px-3 py-2 font-bold transition hover:bg-white/55 hover:text-ink", isCurrentPath(pathname, link.href) && "bg-white/65 text-ink shadow-sm")}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
            <Link className="paper-button paper-button-ink ml-1 rounded-[0.9rem] px-4 py-2 font-black text-white" href="/mazo/preguntas-random">
              Sacar carta
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="mx-auto mt-12 max-w-6xl px-4 pb-28 pt-8 text-sm text-ink/60 sm:px-6 md:pb-10">
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
      <MobileDock pathname={pathname} />
    </div>
  );
}
