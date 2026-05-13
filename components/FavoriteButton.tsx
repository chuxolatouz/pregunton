"use client";

import { HeartIcon } from "@/components/icons";

export function FavoriteButton({
  active,
  onToggle
}: {
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      aria-label={active ? "Quitar de favoritos" : "Guardar en favoritos"}
      aria-pressed={active}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-coral shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-0.5"
      onClick={onToggle}
      type="button"
    >
      <HeartIcon filled={active} />
    </button>
  );
}
