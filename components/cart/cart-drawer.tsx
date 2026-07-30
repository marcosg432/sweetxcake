"use client";

import Image from "next/image";
import { Minus, Pencil, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/brand-logo";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useUiStore } from "@/stores/ui-store";

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.subtotal());

  const cartOpen = useUiStore((state) => state.cartOpen);
  const closeCart = useUiStore((state) => state.closeCart);
  const openStoreModal = useUiStore((state) => state.openStoreModal);
  const openCartItemEditor = useUiStore((state) => state.openCartItemEditor);

  return (
    <AnimatePresence>
      {cartOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Fechar carrinho"
            className="fixed inset-0 z-[60] bg-foreground/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
          />

          <motion.aside
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-[420px] flex-col bg-surface-1/95 shadow-brand backdrop-blur-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-primary/10 px-6 py-5">
              <div>
                <h2 className="font-display text-2xl text-foreground">Minha sacola</h2>
                <p className="mt-1 text-xs text-muted">
                  {items.length === 0
                    ? "Seu pedido está vazio"
                    : `${items.reduce((s, i) => s + i.quantity, 0)} itens`}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:bg-primary/5"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <BrandLogo size="md" tone="soft" className="mb-5 h-14 w-14 opacity-70" />
                  <p className="text-sm text-muted">
                    Explore o cardápio e adicione produtos ao seu pedido.
                  </p>
                  <Button href="/cardapio" variant="secondary" className="mt-6" onClick={closeCart}>
                    Continuar Comprando
                  </Button>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li
                      key={item.key}
                      className="flex gap-4 rounded-2xl border border-primary/10 bg-surface-2/70 p-3"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="truncate text-sm font-medium text-foreground">
                              {item.name}
                            </p>
                            <p className="mt-1 text-sm text-primary">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openCartItemEditor(item.key)}
                              className="text-muted transition-colors hover:text-primary"
                              aria-label={`Editar ${item.name}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(item.key)}
                              className="text-muted transition-colors hover:text-secondary"
                              aria-label={`Remover ${item.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {item.variant ? (
                          <p className="mt-2 text-xs text-muted">
                            {item.variant.name}
                            {item.variant.details ? ` · ${item.variant.details}` : ""}
                          </p>
                        ) : null}
                        {item.complements?.length ? (
                          <p className="mt-1 text-xs text-muted">
                            + {item.complements.map((complement) => complement.name).join(", ")}
                          </p>
                        ) : null}
                        {item.notes ?? item.observations ? (
                          <p className="mt-1 text-xs text-muted">
                            Obs: {item.notes ?? item.observations}
                          </p>
                        ) : null}

                        <div className="mt-3 inline-flex items-center gap-3 rounded-full border border-primary/15 px-2 py-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-5 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 ? (
              <div className="border-t border-primary/10 px-6 py-5">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-muted">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted">
                    <span>Taxa</span>
                    <span>—</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-primary/10 pt-3 text-base font-medium text-foreground">
                    <span>Total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <Button
                    type="button"
                    variant="action"
                    className="w-full"
                    onClick={() => {
                      closeCart();
                      openStoreModal();
                    }}
                  >
                    Finalizar Pedido
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    onClick={closeCart}
                  >
                    Continuar Comprando
                  </Button>
                </div>
              </div>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
