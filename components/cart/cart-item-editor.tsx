"use client";

import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { UNIFIED_CATALOG_PRODUCTS } from "@/lib/unified-catalog";
import { useCartStore } from "@/stores/cart-store";
import { useUiStore } from "@/stores/ui-store";

const ProductDetailModal = dynamic(
  () =>
    import("@/components/catalog/product-detail-modal").then(
      (module) => module.ProductDetailModal
    ),
  { loading: () => null }
);

export function CartItemEditor() {
  const editingKey = useUiStore((state) => state.editingCartItemKey);
  const closeEditor = useUiStore((state) => state.closeCartItemEditor);
  const cartItem = useCartStore((state) =>
    state.items.find((item) => item.key === editingKey)
  );
  const product = cartItem
    ? UNIFIED_CATALOG_PRODUCTS.find(
        (entry) => entry.id === cartItem.id || entry.slug === cartItem.slug
      )
    : undefined;

  return (
    <AnimatePresence>
      {editingKey && cartItem && product ? (
        <ProductDetailModal
          key={editingKey}
          product={product}
          cartItem={cartItem}
          onClose={closeEditor}
        />
      ) : null}
    </AnimatePresence>
  );
}
