"use client";

import { useCartStore } from "@/stores/cart-store";
import { useUiStore } from "@/stores/ui-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
  };
  className?: string;
  variant?: "primary" | "secondary" | "action";
  children?: React.ReactNode;
};

export function AddToCartButton({
  product,
  className,
  variant = "primary",
  children = "Adicionar",
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useUiStore((state) => state.showToast);

  return (
    <Button
      type="button"
      variant={variant}
      className={cn(className)}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        addItem(product);
        showToast("Produto adicionado ao pedido.");
      }}
    >
      {children}
    </Button>
  );
}
