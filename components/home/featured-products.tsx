import Link from "next/link";
import Image from "next/image";
import { FEATURED_PRODUCTS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export function FeaturedProducts() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl text-foreground sm:text-4xl">Em destaque</h2>
            <p className="mt-3 text-muted">Os favoritos dos nossos clientes.</p>
          </div>
          <Link href="/cardapio" className="hidden text-sm text-primary hover:underline sm:block">
            Ver todos
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/produtos/${product.slug}`}
              className="group overflow-hidden rounded-2xl border border-primary/5 bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-brand-hover"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-primary">{product.category}</p>
                <h3 className="mt-2 font-medium text-foreground">{product.name}</h3>
                <p className="mt-2 text-sm font-medium text-primary">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
