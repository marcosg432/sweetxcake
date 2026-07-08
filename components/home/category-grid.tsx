import { CATEGORIES } from "@/lib/constants";
import { CategoryCard } from "@/components/catalog/category-card";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl text-foreground sm:text-4xl">Categorias</h2>
        <p className="mt-3 text-muted">Organize sua escolha com elegância e praticidade.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.slug} {...category} />
        ))}
      </div>
    </section>
  );
}
