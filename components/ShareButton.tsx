"use client";

import { CopyIcon, ShareIcon } from "@/components/icons";

export function CopyButton({ onCopy }: { onCopy: () => void }) {
  return (
    <button
      aria-label="Copiar pregunta"
      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-0.5"
      onClick={onCopy}
      type="button"
    >
      <CopyIcon />
    </button>
  );
}

export function ShareButton({ onShare }: { onShare: () => void }) {
  return (
    <button
      aria-label="Compartir pregunta"
      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-0.5"
      onClick={onShare}
      type="button"
    >
      <ShareIcon />
    </button>
  );
}
