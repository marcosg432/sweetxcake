"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/stores/cart-store";
import { useUiStore } from "@/stores/ui-store";
import { formatPrice } from "@/lib/utils";
import type { CatalogProduct } from "@/lib/cardapio";

type ProductCardProps = {
  product: CatalogProduct;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useUiStore((state) => state.showToast);

  const handleAdd = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.nome,
      price: product.preco,
      image: product.imagem,
    });
    showToast("Produto adicionado ao pedido.");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }}
      className="group flex gap-3 border-b border-primary/8 py-4 first:pt-1 last:border-b-0 sm:gap-4"
    >
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[15px] font-semibold leading-snug text-foreground sm:text-base">
          {product.nome}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted sm:text-[13px]">
          {product.descricaoCurta}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          <p className="text-sm font-semibold text-foreground">
            {formatPrice(product.preco)}
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1 rounded-full bg-secondary px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_8px_20px_rgba(181,46,55,0.22)] transition hover:bg-secondary-dark active:scale-[0.97]"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.25} />
            Adicionar
          </button>
        </div>
      </div>

      <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-2xl bg-surface-3 sm:h-[104px] sm:w-[104px]">
        <Image
          src={product.imagem}
          alt={product.nome}
          fill
          loading="lazy"
          sizes="104px"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>
    </motion.article>
  );
}
