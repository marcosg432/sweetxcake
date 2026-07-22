"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/brand-logo";
import { STORES } from "@/lib/constants";
import { buildWhatsAppOrderMessage, openWhatsApp } from "@/lib/whatsapp";
import { useCartStore } from "@/stores/cart-store";
import { useUiStore } from "@/stores/ui-store";

export function StoreSelectorModal() {
  const [selected, setSelected] = useState<string | null>(null);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const storeModalOpen = useUiStore((state) => state.storeModalOpen);
  const closeStoreModal = useUiStore((state) => state.closeStoreModal);

  const handleConfirm = () => {
    const store = STORES.find((entry) => entry.slug === selected);
    if (!store || items.length === 0) return;

    const message = buildWhatsAppOrderMessage([...items], store.name);
    openWhatsApp(store.whatsapp, message);
    clearCart();
    closeStoreModal();
    setSelected(null);
  };

  return (
    <AnimatePresence>
      {storeModalOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Fechar modal"
            className="fixed inset-0 z-[80] bg-foreground/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              closeStoreModal();
              setSelected(null);
            }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-modal-title"
            className="fixed left-1/2 top-1/2 z-[90] w-[min(28rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-3xl glass-panel-strong p-6 sm:p-8"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="mb-5 flex justify-center">
              <BrandLogo size="md" tone="soft" className="h-12 w-12" />
            </div>
            <h2 id="store-modal-title" className="font-display text-2xl text-foreground">
              Em qual unidade deseja retirar ou pedir?
            </h2>
            <p className="mt-2 text-sm text-muted">
              Selecione a loja e abriremos o WhatsApp com seu pedido montado.
            </p>

            <div className="mt-6 space-y-3">
              {STORES.map((store) => (
                <label
                  key={store.slug}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition-colors ${
                    selected === store.slug
                      ? "border-primary bg-primary/5"
                      : "border-primary/15 hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="store"
                    value={store.slug}
                    checked={selected === store.slug}
                    onChange={() => setSelected(store.slug)}
                    className="mt-1 accent-[var(--primary)]"
                  />
                  <span>
                    <span className="block text-sm font-medium text-foreground">{store.name}</span>
                    <span className="mt-1 block text-xs text-muted">{store.address}</span>
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="action"
                className="flex-1"
                disabled={!selected}
                onClick={handleConfirm}
              >
                Abrir WhatsApp
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  closeStoreModal();
                  setSelected(null);
                }}
              >
                Cancelar
              </Button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
