"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { SearchBar } from "@/components/cardapio/search-bar";
import { CatalogProductRow } from "@/components/catalog/catalog-product-row";
import {
  searchUnifiedCatalog,
  UNIFIED_CATALOG_CATEGORIES,
  UNIFIED_CATALOG_NAV,
  type UnifiedCatalogProduct,
} from "@/lib/unified-catalog";
import { cn } from "@/lib/utils";

const ProductDetailModal = dynamic(
  () =>
    import("@/components/catalog/product-detail-modal").then(
      (module) => module.ProductDetailModal
    ),
  { loading: () => null }
);

const SCROLL_OFFSET = 126;
const CAKE_SIZES = [
  { id: "pp", label: "PP" },
  { id: "p", label: "Pequeno" },
  { id: "m", label: "Médio" },
  { id: "g", label: "Grande" },
] as const;

type ContinuousCatalogProps = {
  showIntro?: boolean;
  initialCategory?: string;
};

export function ContinuousCatalog({
  showIntro = false,
  initialCategory,
}: ContinuousCatalogProps) {
  const catalogRef = useRef<HTMLElement>(null);
  const scrollingToRef = useRef<string | null>(null);
  const initialScrollDoneRef = useRef(false);
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(
    initialCategory ?? UNIFIED_CATALOG_NAV[0].id
  );
  const [selectedCakeSize, setSelectedCakeSize] = useState("pp");
  const [modalSelection, setModalSelection] = useState<{
    product: UnifiedCatalogProduct;
    initialVariantId?: string;
  } | null>(null);
  const isSearching = query.trim().length > 0;

  const filteredProducts = useMemo(() => searchUnifiedCatalog(query), [query]);

  const productsByCategory = useMemo(() => {
    const groups = new Map<string, UnifiedCatalogProduct[]>();
    for (const category of UNIFIED_CATALOG_CATEGORIES) {
      groups.set(
        category.id,
        filteredProducts.filter((product) => product.categoryId === category.id)
      );
    }
    return groups;
  }, [filteredProducts]);

  const selectProduct = useCallback(
    (product: UnifiedCatalogProduct, initialVariantId?: string) => {
      setModalSelection({ product, initialVariantId });
    },
    []
  );

  const scrollToCategory = useCallback(
    (id: string) => {
      if (isSearching) setQuery("");

      window.setTimeout(
        () => {
          const target = document.getElementById(id);
          if (!target) return;
          scrollingToRef.current = id;
          setActiveId(id);
          const top =
            target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
          window.scrollTo({ top, behavior: "smooth" });
          window.history.replaceState(null, "", `#${id}`);
          window.setTimeout(() => {
            if (scrollingToRef.current === id) scrollingToRef.current = null;
          }, 800);
        },
        isSearching ? 40 : 0
      );
    },
    [isSearching]
  );

  useEffect(() => {
    if (isSearching) return;
    const root = catalogRef.current;
    if (!root) return;

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-continuous-catalog-section]")
    );
    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingToRef.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.getAttribute("data-continuous-catalog-section");
        if (id) setActiveId(id);
      },
      {
        rootMargin: `-${SCROLL_OFFSET}px 0px -52% 0px`,
        threshold: [0.1, 0.3, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isSearching]);

  useEffect(() => {
    if (initialScrollDoneRef.current) return;
    initialScrollDoneRef.current = true;
    const targetId =
      initialCategory ?? window.location.hash.replace("#", "");
    if (!UNIFIED_CATALOG_NAV.some((item) => item.id === targetId)) return;
    window.setTimeout(() => scrollToCategory(targetId), 120);
  }, [initialCategory, scrollToCategory]);

  return (
    <>
      <section
        id="catalogo"
        ref={catalogRef}
        className="section-surface-1 relative min-h-screen"
      >
        {showIntro ? (
          <div className="border-b border-primary/10 bg-surface-0/80">
            <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:max-w-5xl lg:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-dark">
                Cardápio
              </p>
              <h1 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                Escolha, personalize e peça
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                Todos os produtos em um único fluxo, da cafeteria aos bolos artesanais.
              </p>
            </div>
          </div>
        ) : null}

        <div className="sticky top-16 z-40 border-b border-primary/10 bg-surface-1/95 backdrop-blur-xl">
          <nav
            aria-label="Categorias do catálogo"
            className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"
          >
            {UNIFIED_CATALOG_NAV.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToCategory(item.id)}
                  className={cn(
                    "relative shrink-0 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors active:scale-[0.97]",
                    isActive
                      ? "text-primary-dark"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="continuous-catalog-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 lg:max-w-5xl lg:px-8">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Buscar produto, sabor ou categoria…"
          />
        </div>

        <div className="mx-auto max-w-3xl px-4 pb-28 sm:px-6 lg:max-w-5xl lg:px-8">
          {isSearching ? (
            <section className="py-3">
              <p className="mb-3 text-sm text-muted">
                {filteredProducts.length === 0
                  ? `Nenhum resultado para “${query.trim()}”.`
                  : `${filteredProducts.length} resultado${filteredProducts.length === 1 ? "" : "s"} para “${query.trim()}”.`}
              </p>
              {filteredProducts.map((product, index) => (
                <CatalogProductRow
                  key={product.id}
                  product={product}
                  index={index}
                  onSelect={selectProduct}
                />
              ))}
            </section>
          ) : (
            UNIFIED_CATALOG_CATEGORIES.map((category) => {
              const products = productsByCategory.get(category.id) ?? [];
              if (products.length === 0) return null;

              return (
                <section
                  key={category.id}
                  id={category.slug}
                  data-continuous-catalog-section={category.id}
                  className="scroll-mt-32 border-b border-primary/8 py-7 last:border-b-0 sm:py-9"
                >
                  <header className="mb-3">
                    <h2 className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
                      {category.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted">{category.description}</p>
                  </header>
                  {category.id === "bolos" ? (
                    <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {CAKE_SIZES.map((size) => (
                        <button
                          key={size.id}
                          type="button"
                          onClick={() => setSelectedCakeSize(size.id)}
                          className={cn(
                            "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition active:scale-95",
                            selectedCakeSize === size.id
                              ? "border-primary bg-primary text-white"
                              : "border-primary/15 bg-surface-0 text-muted hover:border-primary/35"
                          )}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                  {products
                    .filter(
                      (product) =>
                        category.id !== "bolos" ||
                        product.variants.some(
                          (variant) => variant.id === selectedCakeSize
                        )
                    )
                    .map((product, index) => (
                    <CatalogProductRow
                      key={product.id}
                      product={product}
                      index={index}
                      preferredVariantId={
                        category.id === "bolos" ? selectedCakeSize : undefined
                      }
                      onSelect={selectProduct}
                    />
                    ))}
                </section>
              );
            })
          )}
        </div>
      </section>

      <AnimatePresence>
        {modalSelection ? (
          <ProductDetailModal
            key={`${modalSelection.product.id}-${modalSelection.initialVariantId ?? "default"}`}
            product={modalSelection.product}
            initialVariantId={modalSelection.initialVariantId}
            onClose={() => setModalSelection(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
