"use client";
import { useRef, type ReactNode } from "react";
export function CardOptions({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details
      className="card-options"
      ref={ref}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          if (ref.current) {
            ref.current.open = false;
            ref.current.querySelector("summary")?.focus();
          }
        }
      }}
      onBlur={(event) => {
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget as Node)
        )
          event.currentTarget.open = false;
      }}
    >
      <summary className="quiet-action">Más opciones</summary>
      <div className="card-options-panel">{children}</div>
    </details>
  );
}
