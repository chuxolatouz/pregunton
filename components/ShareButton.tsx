"use client";

import { CopyIcon, ShareIcon } from "@/components/icons";
import { PaperButton } from "@/components/Paper";

export function CopyButton({ onCopy }: { onCopy: () => void }) {
  return (
    <PaperButton
      aria-label="Copiar pregunta"
      className="paper-note-button h-12 w-12 rounded-[0.95rem] px-0"
      onClick={onCopy}
      type="button"
    >
      <CopyIcon />
    </PaperButton>
  );
}

export function ShareButton({ onShare }: { onShare: () => void }) {
  return (
    <PaperButton
      aria-label="Compartir pregunta"
      className="paper-note-button h-12 w-12 rounded-[0.95rem] px-0"
      onClick={onShare}
      type="button"
    >
      <ShareIcon />
    </PaperButton>
  );
}
