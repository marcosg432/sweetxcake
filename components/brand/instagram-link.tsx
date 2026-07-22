import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

/** Instagram glyph — Lucide no longer exports brand icons. */
export function InstagramIcon({ className, strokeWidth = 1.75 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-4 w-4", className)}
      aria-hidden
    >
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="12"
        cy="12"
        r="4.25"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle cx="17.35" cy="6.65" r="1.1" fill="currentColor" />
    </svg>
  );
}

type InstagramIconButtonProps = {
  className?: string;
  label?: string;
};

/** Compact circular control — matches cart/menu icon language in the header. */
export function InstagramIconButton({
  className,
  label = "Abrir Instagram da Sweet Cheesecake",
}: InstagramIconButtonProps) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition-all hover:border-primary hover:bg-primary/5 hover:scale-105",
        className
      )}
    >
      <InstagramIcon className="h-4 w-4" />
    </a>
  );
}

type InstagramTextLinkProps = {
  className?: string;
  showHandle?: boolean;
};

/** Inline text + icon for footers and editorial blocks. */
export function InstagramTextLink({ className, showHandle = true }: InstagramTextLinkProps) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary",
        className
      )}
    >
      <InstagramIcon className="h-4 w-4 shrink-0 text-primary" />
      {showHandle ? <span>{INSTAGRAM_HANDLE}</span> : <span>Instagram</span>}
    </a>
  );
}
