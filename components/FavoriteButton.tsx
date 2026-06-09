"use client";

import { HeartIcon } from "@/components/icons";
import { PaperButton } from "@/components/Paper";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  active,
  onToggle,
  className
}: {
  active: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <PaperButton
      aria-label={active ? "Quitar de favoritos" : "Guardar en favoritos"}
      aria-pressed={active}
      className={cn("paper-note-button h-12 w-12 rounded-[0.95rem] px-0 text-coral", className)}
      onClick={onToggle}
      type="button"
    >
      <HeartIcon filled={active} />
    </PaperButton>
  );
}
