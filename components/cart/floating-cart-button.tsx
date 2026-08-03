"use client";

import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useUiStore } from "@/stores/ui-store";

export function FloatingCartButton() {
  const pathname = usePathname();
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const subtotal = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const openCart = useUiStore((state) => state.openCart);

  if (pathname === "/" && itemCount === 0) return null;

  return (
    <motion.button
      layout
      type="button"
      onClick={openCart}
      aria-label={
        itemCount > 0
          ? `Abrir carrinho com ${itemCount} ${itemCount === 1 ? "item" : "itens"}`
          : "Abrir carrinho"
      }
      className={
        itemCount > 0
          ? "fixed bottom-4 left-4 right-4 z-50 flex h-14 items-center justify-between rounded-full border border-white/60 bg-primary px-5 text-white shadow-[0_12px_32px_color-mix(in_srgb,var(--primary)_35%,transparent)] transition-colors hover:bg-primary-dark active:scale-[0.98] sm:bottom-7 sm:left-auto sm:right-7 sm:min-w-72"
          : "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-primary text-white shadow-[0_12px_32px_color-mix(in_srgb,var(--primary)_35%,transparent)] transition-colors hover:bg-primary-dark active:scale-95 sm:bottom-7 sm:right-7"
      }
    >
      {itemCount > 0 ? (
        <>
          <span className="flex items-center gap-2.5">
            <span
              aria-live="polite"
              className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white/20 px-2 text-xs font-semibold"
            >
              {itemCount}
            </span>
            <span className="text-left">
              <span className="block text-[11px] text-white/80">
                {itemCount} {itemCount === 1 ? "item" : "itens"}
              </span>
              <span className="block text-sm font-semibold">Ver sacola</span>
            </span>
          </span>
          <span className="text-sm font-semibold">{formatPrice(subtotal)}</span>
        </>
      ) : (
        <ShoppingBag className="h-6 w-6" aria-hidden="true" />
      )}
    </motion.button>
  );
}
