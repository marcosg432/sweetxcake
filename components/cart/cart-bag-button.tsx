"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useUiStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";

type CartBagButtonProps = {
  className?: string;
};

export function CartBagButton({ className }: CartBagButtonProps) {
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const openCart = useUiStore((state) => state.openCart);

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={itemCount > 0 ? `Abrir pedido com ${itemCount} itens` : "Abrir pedido"}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition-all hover:border-primary hover:bg-primary/5 hover:scale-105",
        className
      )}
    >
      <ShoppingBag className="h-4 w-4" />
      {itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-medium text-white">
          {itemCount}
        </span>
      ) : null}
    </button>
  );
}
