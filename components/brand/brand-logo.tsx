import Image from "next/image";
import { cn } from "@/lib/utils";
import { IMAGES } from "@/lib/images";

type BrandLogoProps = {
  size?: "xs" | "sm" | "md" | "lg";
  tone?: "solid" | "soft" | "ghost";
  className?: string;
  priority?: boolean;
  alt?: string;
};

const SIZE_MAP = {
  xs: { box: "h-7 w-7", px: 28 },
  sm: { box: "h-10 w-10", px: 40 },
  md: { box: "h-14 w-14", px: 56 },
  lg: { box: "h-20 w-20", px: 80 },
} as const;

const TONE_MAP = {
  solid: "opacity-100",
  soft: "opacity-65",
  ghost: "opacity-[0.11]",
} as const;

export function BrandLogo({
  size = "md",
  tone = "solid",
  className,
  priority = false,
  alt = "Sweet Cheesecake",
}: BrandLogoProps) {
  const dims = SIZE_MAP[size];

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full",
        dims.box,
        TONE_MAP[tone],
        className
      )}
    >
      <Image
        src={IMAGES.brand.logo}
        alt={alt}
        width={dims.px}
        height={dims.px}
        priority={priority}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

/** Atmospheric watermark — large, barely visible, never competing with content. */
export function BrandWatermark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute select-none",
        "h-44 w-44 opacity-[0.09] sm:h-56 sm:w-56",
        className
      )}
    >
      <Image
        src={IMAGES.brand.logo}
        alt=""
        fill
        sizes="224px"
        className="object-contain"
      />
    </div>
  );
}

/** Quiet visual pause between editorial blocks. */
export function BrandSignature({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden>
      <span className="h-px w-10 bg-primary/15" />
      <BrandLogo size="xs" tone="soft" />
      <span className="h-px w-10 bg-primary/15" />
    </div>
  );
}
