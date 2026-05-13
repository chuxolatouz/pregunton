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
        tone === "ink" && "bg-ink text-white",
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
