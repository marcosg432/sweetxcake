"use client";

import type { CatalogCategory, CatalogProduct } from "@/lib/cardapio";
import { ProductCard } from "@/components/cardapio/product-card";

type CategorySectionProps = {
  category: CatalogCategory;
  products: CatalogProduct[];
};

export function CategorySection({ category, products }: CategorySectionProps) {
  if (products.length === 0) return null;

  return (
    <section
      id={category.slug}
      data-catalog-section={category.id}
      className="scroll-mt-36 border-b border-primary/8 py-8 last:border-b-0 sm:scroll-mt-40 sm:py-10"
    >
      <header className="mb-2">
        <h2 className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
          {category.title}
        </h2>
        <p className="mt-1.5 text-sm text-muted">{category.description}</p>
      </header>

      <div>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
