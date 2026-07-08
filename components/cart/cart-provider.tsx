"use client";

import { CartDrawer } from "@/components/cart/cart-drawer";
import { StoreSelectorModal } from "@/components/cart/store-selector-modal";
import { Toast } from "@/components/cart/toast";

export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartDrawer />
      <StoreSelectorModal />
      <Toast />
    </>
  );
}
