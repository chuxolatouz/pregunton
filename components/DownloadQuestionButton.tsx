"use client";

import { useRef, useState } from "react";
import { PaperButton } from "@/components/Paper";
import { DownloadIcon } from "@/components/icons";
import type { QuestionImage } from "@/lib/questionImage";
import { cn } from "@/lib/utils";

export function DownloadQuestionButton({ question, deckTitle, className }: QuestionImage & { className?: string }) {
  const [isPreparing, setIsPreparing] = useState(false);
  const [status, setStatus] = useState("");
  const inProgress = useRef(false);

  async function download() {
    if (inProgress.current) return;
    inProgress.current = true;
    setIsPreparing(true);
    setStatus("Preparando imagen…");
    try {
      // Only load the renderer when the user asks to export a card.
      const { downloadQuestionImage } = await import("@/lib/questionImage");
      await downloadQuestionImage({ question, deckTitle });
      setStatus("Descarga iniciada");
    } catch {
      setStatus("No se pudo descargar. Inténtalo de nuevo.");
    } finally {
      inProgress.current = false;
      setIsPreparing(false);
    }
  }

  return (
    <span className="inline-flex flex-col items-center gap-1">
      <PaperButton
        aria-busy={isPreparing}
        aria-label="Descargar carta como imagen"
        className={cn("paper-note-button min-w-[11.5rem] gap-2 disabled:cursor-wait disabled:opacity-60", className)}
        disabled={isPreparing}
        onClick={download}
        title="Descargar carta como imagen PNG"
        type="button"
      >
        <DownloadIcon />
        {isPreparing ? "Preparando…" : "Descargar imagen"}
      </PaperButton>
      <span className="min-h-4 max-w-64 text-center text-xs font-medium text-ink/65" role="status">{status}</span>
    </span>
  );
}
