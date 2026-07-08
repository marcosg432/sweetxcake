import Image from "next/image";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  aspect?: "banner" | "square";
  className?: string;
};

export function PageHero({
  src,
  alt,
  title,
  subtitle,
  aspect = "banner",
  className,
}: PageHeroProps) {
  return (
    <section className={cn("bg-background", className)}>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div
          className={cn(
            "relative overflow-hidden rounded-3xl",
            aspect === "banner" ? "aspect-[16/7] sm:aspect-[21/8]" : "aspect-square max-w-2xl"
          )}
        >
          <Image src={src} alt={alt} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <h1 className="font-display text-3xl text-foreground sm:text-4xl lg:text-5xl">{title}</h1>
            {subtitle ? <p className="mt-3 max-w-2xl text-sm text-muted sm:text-base">{subtitle}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
