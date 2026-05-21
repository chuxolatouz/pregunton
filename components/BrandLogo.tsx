import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoVariant = "horizontal" | "compact" | "mark" | "stamp";

const brandLogoConfig: Record<BrandLogoVariant, { src: string; width: number; height: number; className: string }> = {
  horizontal: {
    src: "/brand/pregunton-imagotipo.svg",
    width: 820,
    height: 256,
    className: "h-12 w-auto"
  },
  compact: {
    src: "/brand/pregunton-imagotipo-compacto.svg",
    width: 512,
    height: 160,
    className: "h-10 w-auto"
  },
  mark: {
    src: "/brand/pregunton-isotipo.svg",
    width: 256,
    height: 256,
    className: "h-10 w-10"
  },
  stamp: {
    src: "/brand/pregunton-isotipo.svg",
    width: 256,
    height: 256,
    className: "h-12 w-12 rotate-[-4deg]"
  }
};

export function BrandLogo({
  variant = "horizontal",
  decorative = false,
  priority = false,
  className,
  imageClassName
}: {
  variant?: BrandLogoVariant;
  decorative?: boolean;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  const config = brandLogoConfig[variant];

  return (
    <span className={cn("inline-flex shrink-0 items-center", className)} aria-hidden={decorative || undefined}>
      <Image
        alt={decorative ? "" : "Pregunton"}
        className={cn(config.className, imageClassName)}
        height={config.height}
        priority={priority}
        src={config.src}
        unoptimized
        width={config.width}
      />
    </span>
  );
}
