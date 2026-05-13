"use client";

import { HeartIcon } from "@/components/icons";
import { PaperButton } from "@/components/Paper";

export function FavoriteButton({
  active,
  onToggle
}: {
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <PaperButton
      aria-label={active ? "Quitar de favoritos" : "Guardar en favoritos"}
      aria-pressed={active}
      className="h-12 w-12 rounded-[0.95rem] px-0 text-coral"
      onClick={onToggle}
      type="button"
    >
      <HeartIcon filled={active} />
    </PaperButton>
  );
}
