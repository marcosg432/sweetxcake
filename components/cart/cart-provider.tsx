"use client";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartItemEditor } from "@/components/cart/cart-item-editor";
import { FloatingCartButton } from "@/components/cart/floating-cart-button";
import { StoreSelectorModal } from "@/components/cart/store-selector-modal";
import { Toast } from "@/components/cart/toast";

export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FloatingCartButton />
      <CartDrawer />
      <CartItemEditor />
      <StoreSelectorModal />
      <Toast />
    </>
  );
}
