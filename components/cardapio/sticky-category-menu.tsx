"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CATALOG_NAV } from "@/lib/cardapio";

type NavItem = (typeof CATALOG_NAV)[number];

type StickyCategoryMenuProps = {
  items: readonly NavItem[];
  activeId: string;
  onSelect: (item: NavItem) => void;
};

export function StickyCategoryMenu({
  items,
  activeId,
  onSelect,
}: StickyCategoryMenuProps) {
  return (
    <div className="sticky top-16 z-40 border-b border-primary/10 bg-surface-1/95 backdrop-blur-xl">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-5xl lg:px-8">
        <nav
          aria-label="Categorias do cardápio"
          className="-mx-1 flex gap-1 overflow-x-auto px-1 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => {
            const isActive = activeId === item.id;
            const className = cn(
              "relative shrink-0 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors",
              isActive
                ? "text-primary-dark"
                : "text-muted hover:text-foreground"
            );

            if (item.kind === "link") {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={className}
                  onClick={() => onSelect(item)}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="catalog-tab-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                </Link>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                className={className}
                onClick={() => onSelect(item)}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="catalog-tab-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
