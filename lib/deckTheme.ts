import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type DeckTheme = {
  slug: string;
  name: string;
  accentColor: string;
  accentInk: string;
  paperColor: string;
  icon: "flame" | "smile" | "heart" | "plane" | "moon" | "confetti";
  card: string;
  accent: string;
  soft: string;
  button: string;
  stackRotation: {
    front: string;
    back: string;
  };
};

const themes: Record<string, DeckTheme> = {
  charlar: {
    slug: "charlar",
    name: "Charlar",
    accentColor: "#BA7517",
    accentInk: "#70400A",
    paperColor: "#FAC775",
    icon: "smile",
    card: "border-[color:var(--deck-border)]",
    accent: "text-[color:var(--deck-accent)]",
    soft: "bg-[color:var(--deck-paper-soft)] border-[color:var(--deck-border)]",
    button: "paper-note-button border-[color:var(--deck-border)] text-[color:var(--deck-ink)]",
    stackRotation: { front: "-1.8deg", back: "1.2deg" }
  },
  aburrido: {
    slug: "aburrido",
    name: "Aburrimiento",
    accentColor: "#D85A30",
    accentInk: "#803019",
    paperColor: "#F5C4B3",
    icon: "flame",
    card: "border-[color:var(--deck-border)]",
    accent: "text-[color:var(--deck-accent)]",
    soft: "bg-[color:var(--deck-paper-soft)] border-[color:var(--deck-border)]",
    button: "paper-note-button paper-note-button-random text-[color:var(--deck-ink)]",
    stackRotation: { front: "1.6deg", back: "-1.1deg" }
  },
  viajar: {
    slug: "viajar",
    name: "Viaje",
    accentColor: "#0F6E56",
    accentInk: "#084130",
    paperColor: "#9FE1CB",
    icon: "plane",
    card: "border-[color:var(--deck-border)]",
    accent: "text-[color:var(--deck-accent)]",
    soft: "bg-[color:var(--deck-paper-soft)] border-[color:var(--deck-border)]",
    button: "paper-note-button border-[color:var(--deck-border)] text-[color:var(--deck-ink)]",
    stackRotation: { front: "-1.2deg", back: "2deg" }
  },
  roadtrip: {
    slug: "roadtrip",
    name: "Roadtrip",
    accentColor: "#0F6E56",
    accentInk: "#084130",
    paperColor: "#9FE1CB",
    icon: "plane",
    card: "border-[color:var(--deck-border)]",
    accent: "text-[color:var(--deck-accent)]",
    soft: "bg-[color:var(--deck-paper-soft)] border-[color:var(--deck-border)]",
    button: "paper-note-button border-[color:var(--deck-border)] text-[color:var(--deck-ink)]",
    stackRotation: { front: "1.1deg", back: "-2deg" }
  },
  amigos: {
    slug: "amigos",
    name: "Amigos",
    accentColor: "#BA7517",
    accentInk: "#70400A",
    paperColor: "#FAC775",
    icon: "smile",
    card: "border-[color:var(--deck-border)]",
    accent: "text-[color:var(--deck-accent)]",
    soft: "bg-[color:var(--deck-paper-soft)] border-[color:var(--deck-border)]",
    button: "paper-note-button border-[color:var(--deck-border)] text-[color:var(--deck-ink)]",
    stackRotation: { front: "2deg", back: "-1.4deg" }
  },
  parejas: {
    slug: "parejas",
    name: "Pareja",
    accentColor: "#D4537E",
    accentInk: "#7F2846",
    paperColor: "#F4C0D1",
    icon: "heart",
    card: "border-[color:var(--deck-border)]",
    accent: "text-[color:var(--deck-accent)]",
    soft: "bg-[color:var(--deck-paper-soft)] border-[color:var(--deck-border)]",
    button: "paper-note-button border-[color:var(--deck-border)] text-[color:var(--deck-ink)]",
    stackRotation: { front: "-2deg", back: "1deg" }
  },
  "36-preguntas-enamorarse": {
    slug: "36-preguntas-enamorarse",
    name: "Pareja",
    accentColor: "#D4537E",
    accentInk: "#7F2846",
    paperColor: "#F4C0D1",
    icon: "heart",
    card: "border-[color:var(--deck-border)]",
    accent: "text-[color:var(--deck-accent)]",
    soft: "bg-[color:var(--deck-paper-soft)] border-[color:var(--deck-border)]",
    button: "paper-note-button border-[color:var(--deck-border)] text-[color:var(--deck-ink)]",
    stackRotation: { front: "1.4deg", back: "-1.7deg" }
  },
  "primera-cita": {
    slug: "primera-cita",
    name: "Citas",
    accentColor: "#D4537E",
    accentInk: "#7F2846",
    paperColor: "#F4C0D1",
    icon: "heart",
    card: "border-[color:var(--deck-border)]",
    accent: "text-[color:var(--deck-accent)]",
    soft: "bg-[color:var(--deck-paper-soft)] border-[color:var(--deck-border)]",
    button: "paper-note-button border-[color:var(--deck-border)] text-[color:var(--deck-ink)]",
    stackRotation: { front: "-1.6deg", back: "1.9deg" }
  },
  "romper-hielo": {
    slug: "romper-hielo",
    name: "Romper el hielo",
    accentColor: "#185FA5",
    accentInk: "#0D3B69",
    paperColor: "#B5D4F4",
    icon: "confetti",
    card: "border-[color:var(--deck-border)]",
    accent: "text-[color:var(--deck-accent)]",
    soft: "bg-[color:var(--deck-paper-soft)] border-[color:var(--deck-border)]",
    button: "paper-note-button border-[color:var(--deck-border)] text-[color:var(--deck-ink)]",
    stackRotation: { front: "1.9deg", back: "-1.2deg" }
  },
  profundas: {
    slug: "profundas",
    name: "Profundo",
    accentColor: "#534AB7",
    accentInk: "#302A75",
    paperColor: "#CECBF6",
    icon: "moon",
    card: "border-[color:var(--deck-border)]",
    accent: "text-[color:var(--deck-accent)]",
    soft: "bg-[color:var(--deck-paper-soft)] border-[color:var(--deck-border)]",
    button: "paper-note-button paper-note-button-next text-[color:var(--deck-ink)]",
    stackRotation: { front: "-1.1deg", back: "1.7deg" }
  },
  random: {
    slug: "random",
    name: "Random",
    accentColor: "#D85A30",
    accentInk: "#803019",
    paperColor: "#F5C4B3",
    icon: "flame",
    card: "border-[color:var(--deck-border)]",
    accent: "text-[color:var(--deck-accent)]",
    soft: "bg-[color:var(--deck-paper-soft)] border-[color:var(--deck-border)]",
    button: "paper-note-button paper-note-button-random text-[color:var(--deck-ink)]",
    stackRotation: { front: "1.7deg", back: "-1.5deg" }
  },
  reirse: {
    slug: "reirse",
    name: "Risa",
    accentColor: "#185FA5",
    accentInk: "#0D3B69",
    paperColor: "#B5D4F4",
    icon: "confetti",
    card: "border-[color:var(--deck-border)]",
    accent: "text-[color:var(--deck-accent)]",
    soft: "bg-[color:var(--deck-paper-soft)] border-[color:var(--deck-border)]",
    button: "paper-note-button border-[color:var(--deck-border)] text-[color:var(--deck-ink)]",
    stackRotation: { front: "-1.9deg", back: "1.3deg" }
  }
};

const fallback: DeckTheme = {
  slug: "default",
  name: "Mazo",
  accentColor: "#D85A30",
  accentInk: "#803019",
  paperColor: "#F5C4B3",
  icon: "flame",
  card: "border-[color:var(--deck-border)]",
  accent: "text-[color:var(--deck-accent)]",
  soft: "bg-[color:var(--deck-paper-soft)] border-[color:var(--deck-border)]",
  button: "paper-note-button paper-note-button-next text-[color:var(--deck-ink)]",
  stackRotation: { front: "-1.4deg", back: "1.4deg" }
};

const themeAliases: Record<string, keyof typeof themes> = {
  "noche-aburrida": "aburrido",
  "viaje-pareja": "parejas",
  "viaje-amigos": "viajar",
  playa: "viajar",
  "conocer-alguien": "romper-hielo",
  whatsapp: "romper-hielo",
  cena: "charlar",
  familia: "charlar",
  hermanos: "amigos",
  "companeros-trabajo": "romper-hielo",
  "team-building": "romper-hielo",
  filosoficas: "profundas",
  journaling: "profundas"
};

export function getDeckTheme(deckId: string) {
  return themes[deckId] ?? themes[themeAliases[deckId]] ?? fallback;
}

export function getDeckThemeStyle(deckId: string) {
  const theme = getDeckTheme(deckId);

  return {
    "--deck-accent": theme.accentColor,
    "--deck-ink": theme.accentInk,
    "--deck-paper": theme.paperColor,
    "--deck-paper-soft": `${theme.paperColor}66`,
    "--deck-border": `${theme.accentColor}33`,
    "--deck-stack-front": theme.stackRotation.front,
    "--deck-stack-back": theme.stackRotation.back
  } as CSSProperties;
}

export function deckThemeClass(deckId: string, key: "card" | "accent" | "soft" | "button", extra?: string) {
  return cn(getDeckTheme(deckId)[key], extra);
}
