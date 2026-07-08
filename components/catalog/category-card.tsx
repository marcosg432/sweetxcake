import Link from "next/link";
import Image from "next/image";
import { getCategoryImage } from "@/lib/images";

type CategoryCardProps = {
  slug: string;
  name: string;
  emoji: string;
  description: string;
  showImage?: boolean;
};

export function CategoryCard({ slug, name, emoji, description, showImage = true }: CategoryCardProps) {
  return (
    <Link
      href={`/categorias/${slug}`}
      className="group overflow-hidden rounded-2xl border border-primary/10 bg-background transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-brand-hover"
    >
      {showImage ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={getCategoryImage(slug)}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      ) : null}
      <div className="p-5">
        <span className="text-2xl">{emoji}</span>
        <h3 className="mt-3 font-medium text-foreground transition-colors group-hover:text-primary">
          {name}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-muted">{description}</p>
      </div>
    </Link>
  );
}
