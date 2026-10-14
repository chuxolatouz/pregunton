"use client";
import { useId } from "react";
import { useLibrary } from "@/lib/useLibrary";
import { setMembership } from "@/lib/library";
export function CollectionPicker({
  questionId,
  onStatus,
}: {
  questionId: string;
  onStatus: (message: string) => void;
}) {
  const library = useLibrary();
  const id = useId();
  const collections = Object.entries(library.collections).filter(
    ([, collection]) => !collection.deleted,
  );
  if (!collections.length)
    return (
      <p className="text-sm text-ink/70">
        Crea una colección en Mis cartas para reunir preguntas.
      </p>
    );
  return (
    <label htmlFor={id} className="block text-sm font-bold">
      Añadir a una colección
      <select
        id={id}
        className="paper-input mt-2 w-full"
        value=""
        onChange={(event) => {
          const collectionId = event.target.value;
          if (!collectionId) return;
          try {
            if (library.members[`${collectionId}:${questionId}`]?.active)
              onStatus("Esta carta ya está en la colección");
            else {
              setMembership(collectionId, questionId, true);
              onStatus("Carta añadida a la colección");
            }
          } catch (error) {
            onStatus(
              error instanceof Error ? error.message : "No se pudo guardar",
            );
          }
        }}
      >
        <option value="">Elige una colección</option>
        {collections.map(([key, collection]) => (
          <option key={key} value={key}>
            {collection.name}
          </option>
        ))}
      </select>
    </label>
  );
}
