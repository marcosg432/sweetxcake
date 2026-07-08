"use client";

import { useUiStore } from "@/stores/ui-store";
import { Button } from "@/components/ui/button";

type OpenCartButtonProps = {
  variant?: "primary" | "secondary" | "action";
  className?: string;
  children?: React.ReactNode;
};

export function OpenCartButton({
  variant = "action",
  className,
  children = "Fazer pedido",
}: OpenCartButtonProps) {
  const openCart = useUiStore((state) => state.openCart);

  return (
    <Button type="button" variant={variant} className={className} onClick={openCart}>
      {children}
    </Button>
  );
}
