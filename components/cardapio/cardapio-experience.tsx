"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CATALOG_CATEGORIES,
  CATALOG_NAV,
  CATALOG_PRODUCTS,
  searchCatalogProducts,
  type CatalogProduct,
} from "@/lib/cardapio";
import { StickyCategoryMenu } from "@/components/cardapio/sticky-category-menu";
import { SearchBar } from "@/components/cardapio/search-bar";
import { CategorySection } from "@/components/cardapio/category-section";
import { BolosCtaSection } from "@/components/cardapio/bolos-cta-section";
import { ProductCard } from "@/components/cardapio/product-card";

const HEADER_OFFSET = 150;

export function CardapioExperience() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(CATALOG_NAV[0].id);
  const scrollingToRef = useRef<string | null>(null);
  const isSearching = query.trim().length > 0;

  const filteredProducts = useMemo(
    () => searchCatalogProducts(query),
    [query]
  );

  const productsByCategory = useMemo(() => {
    const map = new Map<string, CatalogProduct[]>();
    for (const category of CATALOG_CATEGORIES) {
      map.set(
        category.id,
        filteredProducts.filter((product) => product.categoryId === category.id)
      );
    }
    return map;
  }, [filteredProducts]);

  const scrollToSection = useCallback((id: string) => {
    const target =
      document.getElementById(id) ??
      document.querySelector(`[data-catalog-section="${id}"]`);
    if (!(target instanceof HTMLElement)) return;

    scrollingToRef.current = id;
    setActiveId(id);

    const top =
      target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });

    window.setTimeout(() => {
      if (scrollingToRef.current === id) scrollingToRef.current = null;
    }, 900);
  }, []);

  const handleSelect = useCallback(
    (item: (typeof CATALOG_NAV)[number]) => {
      if (item.kind === "link") {
        setActiveId(item.id);
        router.push(item.href);
        return;
      }

      if (isSearching) {
        setQuery("");
        window.setTimeout(() => scrollToSection(item.id), 50);
        return;
      }

      scrollToSection(item.id);
    },
    [isSearching, router, scrollToSection]
  );

  useEffect(() => {
    if (isSearching) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-catalog-section]")
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollingToRef.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topMost = visible[0];
        if (!topMost) return;

        const id = topMost.target.getAttribute("data-catalog-section");
        if (id) setActiveId(id);
      },
      {
        rootMargin: `-${HEADER_OFFSET}px 0px -45% 0px`,
        threshold: [0.15, 0.35, 0.55],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isSearching, filteredProducts.length]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const match = CATALOG_NAV.find((item) => item.id === hash || item.slug === hash);
    if (!match) return;
    if (match.kind === "link") {
      router.replace(match.href);
      return;
    }
    window.setTimeout(() => scrollToSection(match.id), 120);
  }, [router, scrollToSection]);

  return (
    <div className="min-h-screen bg-surface-1">
      <div className="border-b border-primary/10 bg-surface-0/80">
        <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6 lg:max-w-5xl lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-dark">
            Cardápio
          </p>
          <h1 className="mt-2 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Explore e monte seu pedido
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Role as categorias, busque o que deseja e adicione ao carrinho — tudo
            em uma só página.
          </p>
        </div>
      </div>

      <StickyCategoryMenu
        items={CATALOG_NAV}
        activeId={activeId}
        onSelect={handleSelect}
      />

      <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 lg:max-w-5xl lg:px-8">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:max-w-5xl lg:px-8">
        {isSearching ? (
          <section className="py-2">
            <p className="mb-3 text-sm text-muted">
              {filteredProducts.length === 0
                ? `Nenhum resultado para “${query.trim()}”.`
                : `${filteredProducts.length} resultado${filteredProducts.length === 1 ? "" : "s"} para “${query.trim()}”.`}
            </p>
            <div>
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>
        ) : (
          <>
            {CATALOG_CATEGORIES.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                products={productsByCategory.get(category.id) ?? []}
              />
            ))}
            <BolosCtaSection />
          </>
        )}

        {!isSearching && CATALOG_PRODUCTS.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted">
            Cardápio em atualização.
          </p>
        ) : null}
      </div>
    </div>
  );
}
