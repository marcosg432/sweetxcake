"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/brand-logo";
import { STORES } from "@/lib/constants";
import {
  FULFILLMENT_METHODS,
  type FulfillmentMethodId,
} from "@/lib/order";
import { buildWhatsAppOrderMessage, openWhatsApp } from "@/lib/whatsapp";
import { useCartStore } from "@/stores/cart-store";
import { useUiStore } from "@/stores/ui-store";

export function StoreSelectorModal() {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [fulfillmentMethod, setFulfillmentMethod] =
    useState<FulfillmentMethodId | null>(null);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const storeModalOpen = useUiStore((state) => state.storeModalOpen);
  const closeStoreModal = useUiStore((state) => state.closeStoreModal);

  const handleClose = () => {
    closeStoreModal();
    setSelectedStore(null);
    setFulfillmentMethod(null);
  };

  const handleConfirm = () => {
    const store = STORES.find((entry) => entry.slug === selectedStore);
    const method = FULFILLMENT_METHODS.find(
      (entry) => entry.id === fulfillmentMethod
    );
    if (!store || !method || items.length === 0) return;

    const message = buildWhatsAppOrderMessage(
      [...items],
      store.name,
      method.label
    );
    const opened = openWhatsApp(store.whatsapp, message);
    if (opened) clearCart();
    handleClose();
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
            onClick={handleClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-modal-title"
            className="fixed left-1/2 top-1/2 z-[90] max-h-[calc(100dvh-2rem)] w-[min(30rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl glass-panel-strong p-6 sm:p-8"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="mb-5 flex justify-center">
              <BrandLogo size="md" tone="soft" className="h-12 w-12" />
            </div>
            <h2 id="store-modal-title" className="font-display text-2xl text-foreground">
              Como deseja receber seu pedido?
            </h2>
            <p className="mt-2 text-sm text-muted">
              Escolha a forma de recebimento e depois a unidade responsável.
            </p>

            <div className="mt-6 space-y-3">
              {FULFILLMENT_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition-colors ${
                    fulfillmentMethod === method.id
                      ? "border-primary bg-primary/5"
                      : "border-primary/15 hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="fulfillment-method"
                    value={method.id}
                    checked={fulfillmentMethod === method.id}
                    onChange={() => setFulfillmentMethod(method.id)}
                    className="mt-1 accent-[var(--primary)]"
                  />
                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      {method.label}
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      {method.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>

            {fulfillmentMethod ? (
              <fieldset className="mt-6">
                <legend className="text-sm font-semibold text-foreground">
                  Escolha a unidade
                </legend>
                <div className="mt-3 space-y-3">
                  {STORES.map((store) => (
                    <label
                      key={store.slug}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition-colors ${
                        selectedStore === store.slug
                          ? "border-primary bg-primary/5"
                          : "border-primary/15 hover:border-primary/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="store"
                        value={store.slug}
                        checked={selectedStore === store.slug}
                        onChange={() => setSelectedStore(store.slug)}
                        className="mt-1 accent-[var(--primary)]"
                      />
                      <span>
                        <span className="block text-sm font-medium text-foreground">
                          {store.name}
                        </span>
                        <span className="mt-1 block text-xs text-muted">
                          {store.address}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                variant="action"
                className="flex-1"
                disabled={!selectedStore || !fulfillmentMethod}
                onClick={handleConfirm}
              >
                Abrir WhatsApp
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={handleClose}
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
