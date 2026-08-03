import Link from "next/link";

const CATALOG_LINKS = [
  { label: "Lanches", href: "/cardapio#salgados" },
  { label: "Bebidas", href: "/cardapio#bebidas" },
  { label: "Sobremesas", href: "/cardapio#sobremesas" },
  { label: "Sweets", href: "/cardapio#sweets" },
  { label: "Presentes", href: "/cardapio#presentes" },
  { label: "Bolos", href: "/categorias/bolos" },
] as const;

export function HomeCatalogMenu() {
  return (
    <div className="sticky top-16 z-40 border-b border-primary/10 bg-surface-1/95 backdrop-blur-xl">
      <nav
        aria-label="Acesso rápido às categorias do cardápio"
        className="mx-auto flex max-w-5xl justify-start gap-1 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:justify-center sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {CATALOG_LINKS.map((item, index) => (
          <Link
            key={item.label}
            href={item.href}
            className={`relative shrink-0 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors active:scale-[0.97] ${
              index === 0
                ? "text-primary-dark"
                : "text-muted hover:text-foreground"
            }`}
          >
            {item.label}
            {index === 0 ? (
              <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" />
            ) : null}
          </Link>
        ))}
      </nav>
    </div>
  );
}
