"use client";

import { CopyIcon, ShareIcon } from "@/components/icons";
import { PaperButton } from "@/components/Paper";
import { cn } from "@/lib/utils";

export function CopyButton({ className, onCopy }: { className?: string; onCopy: () => void }) {
  return (
    <PaperButton
      aria-label="Copiar pregunta"
      className={cn("paper-note-button h-12 w-12 rounded-[0.95rem] px-0", className)}
      onClick={onCopy}
      type="button"
    >
      <CopyIcon />
    </PaperButton>
  );
}

export function ShareButton({ className, onShare }: { className?: string; onShare: () => void }) {
  return (
    <PaperButton
      aria-label="Compartir pregunta"
      className={cn("paper-note-button h-12 w-12 rounded-[0.95rem] px-0", className)}
      onClick={onShare}
      type="button"
    >
      <ShareIcon />
    </PaperButton>
  );
}
