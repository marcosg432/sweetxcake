"use client";

import { useEffect, useId, useMemo, useState } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { formatCatalogPrice, formatPrice } from "@/lib/utils";
import type {
  ProductComplementGroup,
  UnifiedCatalogProduct,
} from "@/lib/unified-catalog";
import { useCartStore, type CartItem } from "@/stores/cart-store";
import { useUiStore } from "@/stores/ui-store";

type ProductDetailModalProps = {
  product: UnifiedCatalogProduct;
  cartItem?: CartItem;
  initialVariantId?: string;
  onClose: () => void;
};

function groupSelectionCount(
  group: ProductComplementGroup,
  selectedIds: Set<string>
) {
  return group.options.filter((option) => selectedIds.has(option.id)).length;
}

export function ProductDetailModal({
  product,
  cartItem,
  initialVariantId,
  onClose,
}: ProductDetailModalProps) {
  const titleId = useId();
  const addItem = useCartStore((state) => state.addItem);
  const replaceItem = useCartStore((state) => state.replaceItem);
  const showToast = useUiStore((state) => state.showToast);
  const [variantId, setVariantId] = useState(
    cartItem?.variant?.id ?? initialVariantId ?? product.variants[0].id
  );
  const [selectedComplementIds, setSelectedComplementIds] = useState<Set<string>>(
    new Set(cartItem?.complements?.map((complement) => complement.id) ?? [])
  );
  const [quantity, setQuantity] = useState(cartItem?.quantity ?? 1);
  const [notes, setNotes] = useState(
    cartItem?.notes ?? cartItem?.observations ?? ""
  );
  const [imageIndex, setImageIndex] = useState(0);
  const gallery = product.images.length ? product.images : [product.image];
  const currentImage = gallery[imageIndex] ?? product.image;
  const hasGallery = gallery.length > 1;

  const selectedVariant =
    product.variants.find((variant) => variant.id === variantId) ?? product.variants[0];

  const complementGroups = product.complementGroups;

  const selectedComplements = useMemo(
    () =>
      product.complements.filter((complement) =>
        selectedComplementIds.has(complement.id)
      ),
    [product.complements, selectedComplementIds]
  );

  const missingRequiredGroups = useMemo(
    () =>
      complementGroups.filter((group) => {
        const min = group.min ?? 0;
        return groupSelectionCount(group, selectedComplementIds) < min;
      }),
    [complementGroups, selectedComplementIds]
  );

  const canAdd = missingRequiredGroups.length === 0;

  const unitPrice =
    selectedVariant.price +
    selectedComplements.reduce((sum, complement) => sum + complement.price, 0);
  const subtotal = unitPrice * quantity;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const toggleComplement = (group: ProductComplementGroup, optionId: string) => {
    setSelectedComplementIds((current) => {
      const next = new Set(current);
      const alreadySelected = next.has(optionId);
      const max = group.max;

      if (alreadySelected) {
        next.delete(optionId);
        return next;
      }

      if (max === 1) {
        for (const option of group.options) next.delete(option.id);
        next.add(optionId);
        return next;
      }

      const selectedInGroup = group.options.filter((option) => next.has(option.id)).length;
      if (typeof max === "number" && selectedInGroup >= max) {
        return current;
      }

      next.add(optionId);
      return next;
    });
  };

  const handleAdd = () => {
    if (!canAdd) {
      const firstMissing = missingRequiredGroups[0];
      showToast(
        firstMissing
          ? `Selecione: ${firstMissing.hint ?? firstMissing.title}`
          : "Complete as opções obrigatórias."
      );
      return;
    }

    const configuredItem = {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: unitPrice,
      image: product.image,
      quantity,
      variant:
        product.variants.length > 1
          ? {
              id: selectedVariant.id,
              name: selectedVariant.label,
              price: selectedVariant.price,
              details: selectedVariant.details,
            }
          : undefined,
      complements: selectedComplements.map((complement) => ({
        id: complement.id,
        name: complement.name,
        price: complement.price,
      })),
      notes: notes.trim() || undefined,
    };

    if (cartItem) {
      replaceItem(cartItem.key, configuredItem);
      showToast(`${product.name} atualizado no pedido.`);
    } else {
      addItem(configuredItem);
      showToast(`${product.name} adicionado ao pedido.`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80]">
      <motion.button
        type="button"
        aria-label="Fechar detalhes do produto"
        className="absolute inset-0 bg-foreground/30 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col overflow-hidden rounded-t-[2rem] bg-surface-1 shadow-brand md:inset-y-6 md:left-auto md:right-6 md:w-[min(32rem,calc(100vw-3rem))] md:max-h-none md:rounded-[2rem]"
      >
        <div className="flex justify-center py-2 md:hidden">
          <span className="h-1.5 w-12 rounded-full bg-primary/20" />
        </div>

        <div
          className={`relative shrink-0 overflow-hidden bg-surface-3 ${
            hasGallery
              ? "aspect-[4/5] max-h-[46vh] md:max-h-[52vh]"
              : "aspect-[16/9] md:aspect-[16/8]"
          }`}
        >
          <Image
            src={currentImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 512px"
            className={
              product.id === "refrigerantes-lata-350ml" ||
              product.id === "coca-ks" ||
              product.id === "coca-ks-zero" ||
              product.id === "agua-mineral" ||
              product.id === "agua-com-gas"
                ? "object-contain"
                : "object-cover"
            }
          />
          {hasGallery ? (
            <>
              <button
                type="button"
                onClick={() =>
                  setImageIndex(
                    (current) => (current - 1 + gallery.length) % gallery.length
                  )
                }
                aria-label="Imagem anterior"
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-surface-1/90 text-foreground shadow-brand backdrop-blur-md transition hover:bg-surface-1"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setImageIndex((current) => (current + 1) % gallery.length)
                }
                aria-label="Próxima imagem"
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-surface-1/90 text-foreground shadow-brand backdrop-blur-md transition hover:bg-surface-1"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
                {gallery.map((src, slideIndex) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`Imagem ${slideIndex + 1}`}
                    onClick={() => setImageIndex(slideIndex)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      slideIndex === imageIndex
                        ? "w-6 bg-primary"
                        : "w-1.5 bg-white/80 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-surface-1/90 text-foreground shadow-brand backdrop-blur-md transition hover:bg-surface-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            {product.kind === "bolo" ? "Bolo artesanal" : "Sweet Cheesecake"}
          </p>
          <h2 id={titleId} className="mt-1 font-display text-2xl text-foreground">
            {product.name}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{product.description}</p>

          {product.variants.length > 1 ? (
            <fieldset className="mt-6">
              <legend className="text-sm font-semibold text-foreground">
                Escolha uma opção
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {product.variants.map((variant) => {
                  const selected = variant.id === variantId;
                  return (
                    <label
                      key={variant.id}
                      className={`relative cursor-pointer rounded-2xl border p-3 transition ${
                        selected
                          ? "border-primary bg-primary/8"
                          : "border-primary/12 bg-surface-0 hover:border-primary/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`variant-${product.id}`}
                        value={variant.id}
                        checked={selected}
                        onChange={() => setVariantId(variant.id)}
                        className="sr-only"
                      />
                      <span className="flex items-start justify-between gap-2">
                        <span>
                          <span className="block text-sm font-semibold text-foreground">
                            {variant.label}
                          </span>
                          {variant.details ? (
                            <span className="mt-0.5 block text-[11px] text-muted">
                              {variant.details}
                            </span>
                          ) : null}
                        </span>
                        {selected ? <Check className="h-4 w-4 text-primary" /> : null}
                      </span>
                      <span className="mt-2 block text-sm text-primary">
                        {formatCatalogPrice(variant.price)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ) : null}

          {complementGroups.map((group) => {
            const selectedCount = groupSelectionCount(group, selectedComplementIds);
            const isSingle = group.max === 1;
            const reachedMax =
              typeof group.max === "number" && selectedCount >= group.max;

            return (
              <fieldset key={group.id} className="mt-6">
                <legend className="text-sm font-semibold text-foreground">
                  {group.title}
                </legend>
                {group.hint ? (
                  <p className="mt-1 text-xs text-muted">{group.hint}</p>
                ) : null}
                <div className="mt-3 space-y-2">
                  {group.options.map((complement) => {
                    const selected = selectedComplementIds.has(complement.id);
                    const disabled = !selected && reachedMax && !isSingle;

                    return (
                      <label
                        key={complement.id}
                        className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition ${
                          selected
                            ? "border-primary bg-primary/8"
                            : disabled
                              ? "cursor-not-allowed border-primary/8 bg-surface-0 opacity-50"
                              : "border-primary/12 bg-surface-0 hover:border-primary/30"
                        }`}
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <input
                            type={isSingle ? "radio" : "checkbox"}
                            name={isSingle ? `group-${group.id}` : undefined}
                            checked={selected}
                            disabled={disabled}
                            onChange={() => toggleComplement(group, complement.id)}
                            className="h-4 w-4 accent-primary"
                          />
                          <span className="min-w-0">
                            <span className="block text-sm text-foreground">
                              {complement.name}
                            </span>
                            {complement.details ? (
                              <span className="mt-0.5 block text-[11px] text-primary">
                                {complement.details}
                              </span>
                            ) : null}
                          </span>
                        </span>
                        {complement.price > 0 ? (
                          <span className="shrink-0 text-xs font-medium text-primary">
                            + {formatPrice(complement.price)}
                          </span>
                        ) : null}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}

          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-foreground">Quantidade</p>
            <div className="inline-flex items-center gap-3 rounded-full border border-primary/15 bg-surface-0 p-1">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full text-primary transition hover:bg-primary/10"
                aria-label="Diminuir quantidade"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-6 text-center text-sm font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-primary transition hover:bg-primary/10"
                aria-label="Aumentar quantidade"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {product.allowNotes ? (
            <label className="mt-6 block">
              <span className="text-sm font-semibold text-foreground">Observações</span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={3}
                maxLength={300}
                placeholder="Digite observações sobre seu pedido..."
                className="mt-2 w-full resize-none rounded-2xl border border-primary/15 bg-surface-0 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
              />
            </label>
          ) : null}
        </div>

        <div className="shrink-0 border-t border-primary/10 bg-surface-1/95 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl sm:px-6">
          <Button
            variant="action"
            className="w-full py-3.5 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleAdd}
            disabled={!canAdd}
          >
            {cartItem ? "Atualizar pedido" : "Adicionar ao pedido"}
            {subtotal > 0 ? ` · ${formatPrice(subtotal)}` : ""}
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
