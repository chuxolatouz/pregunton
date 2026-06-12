import { ConfettiIcon, FlameIcon, HeartIcon, MoonIcon, PlaneIcon, SmileIcon } from "@/components/icons";
import { getDeckTheme } from "@/lib/deckTheme";
import { cn } from "@/lib/utils";

const deckIcons = {
  flame: FlameIcon,
  smile: SmileIcon,
  heart: HeartIcon,
  plane: PlaneIcon,
  moon: MoonIcon,
  confetti: ConfettiIcon
};

export function DeckThemeIcon({ deckId, className }: { deckId: string; className?: string }) {
  const theme = getDeckTheme(deckId);
  const Icon = deckIcons[theme.icon];

  return <Icon className={cn("h-6 w-6", className)} />;
}
