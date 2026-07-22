"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Bolo } from "@/lib/bolos";
import { getPrecoApartirDe } from "@/lib/bolos";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

type BoloCardProps = {
  bolo: Bolo;
  index?: number;
  onOpen: (bolo: Bolo) => void;
};

export function BoloCard({ bolo, index = 0, onOpen }: BoloCardProps) {
  const precoApartirDe = getPrecoApartirDe(bolo);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <button
        type="button"
        onClick={() => onOpen(bolo)}
        className={cn(
          "relative flex w-full flex-col overflow-hidden rounded-[1.75rem] bg-surface-0 text-left",
          "shadow-[0_8px_30px_rgba(23,184,170,0.06)]",
          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(23,184,170,0.14)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        )}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={bolo.imagem}
            alt={bolo.nome}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />
          <span className="absolute left-4 top-4 rounded-full bg-surface-0/92 px-3 py-1.5 text-[11px] font-medium tracking-wide text-foreground shadow-sm backdrop-blur-md">
            Produção artesanal
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-5">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
              {bolo.nome}
            </h3>
          </div>

          <div className="mt-auto flex items-end justify-between gap-3 pt-2">
            <p className="text-sm font-medium text-primary">
              A partir de {formatPrice(precoApartirDe)}
            </p>
            <span
              className={cn(
                "inline-flex items-center rounded-full bg-secondary px-4 py-2 text-xs font-medium text-white",
                "transition-all duration-300",
                "group-hover:bg-secondary-dark group-hover:shadow-[0_8px_20px_rgba(181,46,55,0.28)]"
              )}
            >
              Ver detalhes
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}

export function BoloCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-surface-0 shadow-[0_8px_30px_rgba(23,184,170,0.06)]">
      <div className="aspect-[4/5] animate-pulse bg-surface-4" />
      <div className="space-y-3 px-5 py-5">
        <div className="h-6 w-2/3 animate-pulse rounded-full bg-surface-4" />
        <div className="h-4 w-full animate-pulse rounded-full bg-surface-3" />
        <div className="h-4 w-[80%] animate-pulse rounded-full bg-surface-3" />
        <div className="flex justify-between pt-2">
          <div className="h-4 w-28 animate-pulse rounded-full bg-surface-4" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-surface-4" />
        </div>
      </div>
    </div>
  );
}
