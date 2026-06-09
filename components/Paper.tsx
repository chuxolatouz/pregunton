import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PaperButtonProps = ComponentPropsWithoutRef<"button"> & {
  tone?: "plain" | "ink" | "accent";
};

export function PaperButton({ className, tone = "plain", ...props }: PaperButtonProps) {
  return (
    <button
      className={cn(
        "paper-button inline-flex min-h-12 items-center justify-center rounded-[0.95rem] px-4 text-sm font-black",
        tone === "ink" && "paper-button-ink text-white",
        tone === "accent" && "bg-marigold text-ink",
        className
      )}
      {...props}
    />
  );
}

export function PaperBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("paper-label inline-flex w-fit items-center rounded-[0.7rem] px-3 py-1 text-xs font-black uppercase tracking-[0.14em]", className)}>
      {children}
    </span>
  );
}

type PaperLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  tone?: "plain" | "ink" | "quiet";
};

export function PaperLink({ className, tone = "plain", ...props }: PaperLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-[0.95rem] px-5 py-3 text-sm font-black transition",
        tone === "plain" && "paper-button text-ink",
        tone === "ink" && "paper-button paper-button-ink text-white",
        tone === "quiet" && "text-ink/68 underline decoration-dashed underline-offset-8 hover:text-ink focus-visible:text-ink",
        className
      )}
      {...props}
    />
  );
}

export function PaperSurface({
  children,
  className,
  stack = false,
  lift = false,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  stack?: boolean;
  lift?: boolean;
}) {
  return (
    <div className={cn("paper-surface", stack && "paper-stack", lift && "paper-lift", className)} {...props}>
      {children}
    </div>
  );
}

export function HeroQuestionCard({ className }: { className?: string }) {
  return (
    <PaperSurface
      aria-label="Carta de ejemplo"
      className={cn("w-full max-w-[18.5rem] rotate-[1.2deg] rounded-[1.2rem] px-4 py-5 min-[380px]:max-w-[20rem] sm:max-w-md sm:rounded-[1.35rem] sm:px-8 sm:py-10", className)}
      stack
    >
      <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-coral sm:text-xs">Carta para empezar</p>
      <p className="display-serif mt-5 text-xl font-bold leading-tight text-ink min-[380px]:text-2xl sm:mt-8 sm:text-4xl">
        &ldquo;¿Qué canción pondrías para cambiar el mood de este momento?&rdquo;
      </p>
    </PaperSurface>
  );
}
