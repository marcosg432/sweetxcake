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
  const categoryNavRef = useRef<HTMLElement>(null);
  const categoryButtonRefs = useRef(new Map<string, HTMLButtonElement>());
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

  const revealCategoryInNav = useCallback((id: string) => {
    const nav = categoryNavRef.current;
    const item = categoryButtonRefs.current.get(id);
    if (!nav || !item) return;

    const maxScroll = nav.scrollWidth - nav.clientWidth;
    const left = Math.max(0, Math.min(item.offsetLeft - 16, maxScroll));
    nav.scrollTo({ left, behavior: "smooth" });
  }, []);

  const scrollToCategory = useCallback(
    (id: string) => {
      if (isSearching) setQuery("");
      revealCategoryInNav(id);

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
    [isSearching, revealCategoryInNav]
  );

  useEffect(() => {
    revealCategoryInNav(activeId);
  }, [activeId, revealCategoryInNav]);

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
            ref={categoryNavRef}
            aria-label="Categorias do catálogo"
            className="mx-auto flex max-w-5xl snap-x snap-mandatory gap-1 overflow-x-auto scroll-smooth px-4 py-2.5 [scrollbar-width:none] sm:px-6 lg:px-8 [&::-webkit-scrollbar]:hidden"
          >
            {UNIFIED_CATALOG_NAV.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    if (node) categoryButtonRefs.current.set(item.id, node);
                    else categoryButtonRefs.current.delete(item.id);
                  }}
                  type="button"
                  onClick={() => scrollToCategory(item.id)}
                  className={cn(
                    "relative shrink-0 snap-start rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors active:scale-[0.97]",
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
              const visibleProducts = products.filter(
                (product) =>
                  category.id !== "bolos" ||
                  product.variants.some(
                    (variant) => variant.id === selectedCakeSize
                  )
              );
              const productGroups = visibleProducts.reduce(
                (groups, product) => {
                  const group = product.group ?? "";
                  const entries = groups.get(group) ?? [];
                  entries.push(product);
                  groups.set(group, entries);
                  return groups;
                },
                new Map<string, UnifiedCatalogProduct[]>()
              );

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
                    <div className="sticky top-[7.25rem] z-30 -mx-4 mb-5 border-y border-primary/10 bg-surface-1/95 px-4 py-2.5 shadow-[0_8px_20px_rgba(83,45,51,0.06)] backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                      <div className="flex items-center gap-3">
                        <span className="hidden shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted sm:block">
                          Tamanho
                        </span>
                        <div
                          role="group"
                          aria-label="Escolha o tamanho do bolo"
                          className="grid min-w-0 flex-1 grid-cols-4 gap-1 rounded-2xl bg-surface-3/80 p-1"
                        >
                          {CAKE_SIZES.map((size) => {
                            const isSelected = selectedCakeSize === size.id;
                            return (
                              <button
                                key={size.id}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => setSelectedCakeSize(size.id)}
                                className={cn(
                                  "relative min-h-9 rounded-xl px-1.5 py-2 text-[11px] font-semibold transition active:scale-95 sm:px-4 sm:text-xs",
                                  isSelected
                                    ? "text-white"
                                    : "text-muted hover:bg-surface-0 hover:text-foreground"
                                )}
                              >
                                {isSelected ? (
                                  <motion.span
                                    layoutId="cake-size-active-pill"
                                    className="absolute inset-0 rounded-xl bg-primary shadow-[0_5px_14px_rgba(181,46,55,0.22)]"
                                    transition={{
                                      type: "spring",
                                      stiffness: 420,
                                      damping: 34,
                                    }}
                                  />
                                ) : null}
                                <span className="relative z-10">{size.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {products.length === 0 ? (
                    <p className="rounded-2xl border border-primary/10 bg-surface-0/70 px-4 py-5 text-sm text-muted">
                      Produtos em breve.
                    </p>
                  ) : (
                    Array.from(productGroups.entries()).map(
                      ([group, groupProducts], groupIndex) => (
                        <div
                          key={group || "products"}
                          className={groupIndex > 0 ? "mt-8" : undefined}
                        >
                          {group ? (
                            <h3 className="mb-3 font-display text-xl text-foreground">
                              {group}
                            </h3>
                          ) : null}
                          {groupProducts.map((product, index) => (
                            <CatalogProductRow
                              key={product.id}
                              product={product}
                              index={index}
                              preferredVariantId={
                                category.id === "bolos"
                                  ? selectedCakeSize
                                  : undefined
                              }
                              onSelect={selectProduct}
                            />
                          ))}
                        </div>
                      )
                    )
                  )}
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
