import { cn } from "@/lib/utils";

type DeckTheme = {
  card: string;
  accent: string;
  soft: string;
  button: string;
};

const themes: Record<string, DeckTheme> = {
  charlar: {
    card: "border-moss/25 bg-moss/[0.08]",
    accent: "text-moss",
    soft: "bg-moss/[0.08] border-moss/20",
    button: "bg-moss text-white hover:bg-moss/90"
  },
  aburrido: {
    card: "border-marigold/35 bg-marigold/[0.14]",
    accent: "text-marigold",
    soft: "bg-marigold/[0.14] border-marigold/25",
    button: "bg-marigold text-ink hover:bg-marigold/90"
  },
  viajar: {
    card: "border-sky/35 bg-sky/[0.12]",
    accent: "text-sky",
    soft: "bg-sky/[0.12] border-sky/25",
    button: "bg-sky text-ink hover:bg-sky/90"
  },
  roadtrip: {
    card: "border-coral/35 bg-coral/10",
    accent: "text-coral",
    soft: "bg-coral/10 border-coral/20",
    button: "bg-coral text-white hover:bg-coral/90"
  },
  amigos: {
    card: "border-lavender/35 bg-lavender/10",
    accent: "text-lavender",
    soft: "bg-lavender/10 border-lavender/20",
    button: "bg-lavender text-white hover:bg-lavender/90"
  },
  parejas: {
    card: "border-coral/35 bg-coral/[0.12]",
    accent: "text-coral",
    soft: "bg-coral/[0.12] border-coral/20",
    button: "bg-coral text-white hover:bg-coral/90"
  },
  "36-preguntas-enamorarse": {
    card: "border-coral/30 bg-[#fff3e6]",
    accent: "text-coral",
    soft: "bg-[#fff3e6] border-coral/20",
    button: "bg-coral text-white hover:bg-coral/90"
  },
  "primera-cita": {
    card: "border-coral/30 bg-white",
    accent: "text-coral",
    soft: "bg-coral/10 border-coral/20",
    button: "bg-coral text-white hover:bg-coral/90"
  },
  "romper-hielo": {
    card: "border-moss/30 bg-white",
    accent: "text-moss",
    soft: "bg-moss/[0.08] border-moss/20",
    button: "bg-moss text-white hover:bg-moss/90"
  },
  profundas: {
    card: "border-ink/15 bg-white",
    accent: "text-ink",
    soft: "bg-ink/[0.04] border-ink/10",
    button: "bg-ink text-white hover:bg-ink/90"
  },
  random: {
    card: "border-marigold/40 bg-white",
    accent: "text-marigold",
    soft: "bg-marigold/[0.14] border-marigold/25",
    button: "bg-marigold text-ink hover:bg-marigold/90"
  }
};

const fallback: DeckTheme = {
  card: "border-ink/10 bg-white",
  accent: "text-coral",
  soft: "bg-paper border-ink/10",
  button: "bg-ink text-white hover:bg-ink/90"
};

export function getDeckTheme(deckId: string) {
  return themes[deckId] ?? fallback;
}

export function deckThemeClass(deckId: string, key: keyof DeckTheme, extra?: string) {
  return cn(getDeckTheme(deckId)[key], extra);
}
