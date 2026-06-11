import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="20"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m15 18-6-6 6-6" />
    </IconBase>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  );
}

export function ShuffleIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m16 3 4 4-4 4" />
      <path d="M4 7h3c2 0 3.2.8 4.4 2.5" />
      <path d="M20 7h-3" />
      <path d="m16 13 4 4-4 4" />
      <path d="M4 17h3c2.3 0 3.5-1.1 5-4" />
      <path d="M20 17h-3" />
    </IconBase>
  );
}

export function HeartIcon({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      height="20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="20"
      {...props}
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect height="14" rx="2" width="14" x="8" y="8" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </IconBase>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 10.6 6.8-4.2" />
      <path d="m8.6 13.4 6.8 4.2" />
    </IconBase>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />
      <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
    </IconBase>
  );
}

export function FlameIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 22c3.7 0 6.5-2.6 6.5-6.3 0-2.6-1.4-4.7-3.6-6.5.1 1.5-.5 2.5-1.7 3.2.1-3.4-1.7-6.2-4.4-8.4.2 3.2-1.4 5-2.7 6.7-1 1.3-1.6 2.7-1.6 4.8C4.5 19.2 7.9 22 12 22Z" />
      <path d="M12.1 18.8c1.5 0 2.6-1 2.6-2.5 0-1.2-.6-2.1-1.7-3-.1 1-.6 1.7-1.4 2.1 0-1.5-.7-2.8-1.9-3.8.1 1.5-.7 2.5-1.2 3.4-.4.6-.6 1.1-.6 1.8 0 1.2 1.3 2 4.2 2Z" />
    </IconBase>
  );
}

export function SmileIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.6 10h.1" />
      <path d="M15.3 10h.1" />
      <path d="M8.8 14.2c1.7 1.6 4.7 1.6 6.4 0" />
    </IconBase>
  );
}

export function PlaneIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M21 3 9.8 14.2" />
      <path d="m21 3-7.1 18-4.1-6.8L3 10.1 21 3Z" />
    </IconBase>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M19.6 14.3A7.7 7.7 0 0 1 9.7 4.4 8.3 8.3 0 1 0 19.6 14.3Z" />
    </IconBase>
  );
}

export function ConfettiIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m4 20 5.2-15.2 10 10L4 20Z" />
      <path d="m8.4 7.3 8.3 8.3" />
      <path d="M14 4.5h.1" />
      <path d="M18.5 6.5 20 5" />
      <path d="M19.5 10.5h1.8" />
      <path d="M11.5 3.2 11 1.8" />
    </IconBase>
  );
}
