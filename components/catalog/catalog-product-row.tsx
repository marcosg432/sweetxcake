"use client";

import { memo } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { formatCatalogPrice } from "@/lib/utils";
import {
  getProductStartingPrice,
  type UnifiedCatalogProduct,
} from "@/lib/unified-catalog";
import { useCartStore } from "@/stores/cart-store";
import { useUiStore } from "@/stores/ui-store";

type CatalogProductRowProps = {
  product: UnifiedCatalogProduct;
  index: number;
  preferredVariantId?: string;
  onSelect: (product: UnifiedCatalogProduct, initialVariantId?: string) => void;
};

export const CatalogProductRow = memo(function CatalogProductRow({
  product,
  index,
  preferredVariantId,
  onSelect,
}: CatalogProductRowProps) {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useUiStore((state) => state.showToast);
  const preferredVariant = product.variants.find(
    (variant) => variant.id === preferredVariantId
  );
  const startingPrice = preferredVariant?.price ?? getProductStartingPrice(product);
  const needsConfiguration =
    product.kind === "bolo" ||
    product.variants.length > 1 ||
    product.complements.length > 0 ||
    product.complementGroups.length > 0;

  const handleAction = () => {
    if (needsConfiguration) {
      onSelect(product, preferredVariantId);
      return;
    }

    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: startingPrice,
      image: product.image,
    });
    showToast(`${product.name} adicionado ao pedido.`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.025, 0.15) }}
      className="group flex gap-3 border-b border-primary/8 py-3.5 first:pt-1 last:border-b-0 sm:gap-4 sm:py-4"
    >
      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onSelect(product, preferredVariantId)}
          className="block text-left"
        >
          <h3 className="font-display text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary-dark sm:text-base">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted sm:text-[13px]">
            {product.shortDescription}
          </p>
        </button>

        <div className="mt-2.5 flex items-center gap-2.5">
          <p className="text-sm font-semibold text-foreground">
            {product.kind === "bolo" && !preferredVariant && startingPrice > 0
              ? "A partir de "
              : ""}
            {formatCatalogPrice(startingPrice)}
          </p>
          <button
            type="button"
            onClick={handleAction}
            aria-label={
              needsConfiguration
                ? `Escolher opções de ${product.name}`
                : `Adicionar ${product.name}`
            }
            className="inline-flex min-h-8 items-center gap-1 rounded-full bg-secondary px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_6px_16px_rgba(181,46,55,0.18)] transition hover:bg-secondary-dark active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
            {needsConfiguration ? "Escolher" : "Adicionar"}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSelect(product, preferredVariantId)}
        aria-label={`Ver detalhes de ${product.name}`}
        className="relative h-[86px] w-[86px] shrink-0 overflow-hidden rounded-2xl bg-surface-3 sm:h-[104px] sm:w-[104px]"
      >
        <Image
          src={product.image}
          alt=""
          fill
          loading="lazy"
          sizes="104px"
          className={
            product.id === "refrigerantes-lata-350ml" ||
            product.id === "coca-ks" ||
            product.id === "coca-ks-zero" ||
            product.id === "agua-mineral" ||
            product.id === "agua-com-gas"
              ? "object-contain p-1 transition duration-500 group-hover:scale-[1.04]"
              : "object-cover transition duration-500 group-hover:scale-[1.04]"
          }
        />
      </button>
    </motion.article>
  );
});
