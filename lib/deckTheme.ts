import { cn } from "@/lib/utils";

type DeckTheme = {
  card: string;
  accent: string;
  soft: string;
  button: string;
};

const themes: Record<string, DeckTheme> = {
  charlar: {
    card: "border-moss/18",
    accent: "text-moss",
    soft: "bg-moss/[0.08] border-moss/20",
    button: "paper-note-button border-moss/25 text-ink"
  },
  aburrido: {
    card: "border-marigold/24",
    accent: "text-marigold",
    soft: "bg-marigold/[0.14] border-marigold/25",
    button: "paper-note-button paper-note-button-random text-ink"
  },
  viajar: {
    card: "border-sky/22",
    accent: "text-sky",
    soft: "bg-sky/[0.12] border-sky/25",
    button: "paper-note-button border-sky/25 text-ink"
  },
  roadtrip: {
    card: "border-coral/22",
    accent: "text-coral",
    soft: "bg-coral/10 border-coral/20",
    button: "paper-note-button border-coral/25 text-ink"
  },
  amigos: {
    card: "border-lavender/22",
    accent: "text-lavender",
    soft: "bg-lavender/10 border-lavender/20",
    button: "paper-note-button border-lavender/25 text-ink"
  },
  parejas: {
    card: "border-coral/22",
    accent: "text-coral",
    soft: "bg-coral/[0.12] border-coral/20",
    button: "paper-note-button border-coral/25 text-ink"
  },
  "36-preguntas-enamorarse": {
    card: "border-coral/20",
    accent: "text-coral",
    soft: "bg-[#fff3e6] border-coral/20",
    button: "paper-note-button border-coral/25 text-ink"
  },
  "primera-cita": {
    card: "border-coral/20",
    accent: "text-coral",
    soft: "bg-coral/10 border-coral/20",
    button: "paper-note-button border-coral/25 text-ink"
  },
  "romper-hielo": {
    card: "border-moss/20",
    accent: "text-moss",
    soft: "bg-moss/[0.08] border-moss/20",
    button: "paper-note-button border-moss/25 text-ink"
  },
  profundas: {
    card: "border-ink/12",
    accent: "text-ink",
    soft: "bg-ink/[0.04] border-ink/10",
    button: "paper-note-button paper-note-button-next text-ink"
  },
  random: {
    card: "border-marigold/24",
    accent: "text-marigold",
    soft: "bg-marigold/[0.14] border-marigold/25",
    button: "paper-note-button paper-note-button-random text-ink"
  }
};

const fallback: DeckTheme = {
  card: "border-ink/10",
  accent: "text-coral",
  soft: "bg-paper border-ink/10",
  button: "paper-note-button paper-note-button-next text-ink"
};

export function getDeckTheme(deckId: string) {
  return themes[deckId] ?? fallback;
}

export function deckThemeClass(deckId: string, key: keyof DeckTheme, extra?: string) {
  return cn(getDeckTheme(deckId)[key], extra);
}
