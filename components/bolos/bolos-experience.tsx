"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { BolosHero } from "@/components/bolos/bolos-hero";
import { BoloCard, BoloCardSkeleton } from "@/components/bolos/bolo-card";
import { BoloDetailSheet } from "@/components/bolos/bolo-detail-sheet";
import { BOLOS, type Bolo } from "@/lib/bolos";
import { getPrecoApartirDe } from "@/lib/bolos";
import { formatPrice } from "@/lib/utils";

export function BolosExperience() {
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<Bolo | null>(null);
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 280);
    return () => window.clearTimeout(timer);
  }, []);

  // Pré-carrega imagens dos bolos após o primeiro paint
  useEffect(() => {
    BOLOS.forEach((bolo) => {
      const img = new window.Image();
      img.src = bolo.imagem;
    });
  }, []);

  const openBolo = useCallback((bolo: Bolo) => {
    startTransition(() => {
      setSelected(bolo);
      setOpen(true);
    });
  }, []);

  const closeSheet = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className="bg-[color-mix(in_srgb,var(--surface-1)_88%,#faf6f0)]">
      <BolosHero />

      <section id="bolos" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
            Coleção
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Escolha o bolo do seu momento
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/55 sm:text-base">
            Cada receita é finalizada sob encomenda. Explore, sinta o desejo e monte o pedido
            no seu ritmo.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-9 lg:grid-cols-3 lg:gap-10">
          {!ready
            ? Array.from({ length: 6 }).map((_, index) => <BoloCardSkeleton key={index} />)
            : BOLOS.map((bolo, index) => (
                <BoloCard key={bolo.id} bolo={bolo} index={index} onOpen={openBolo} />
              ))}
        </div>
      </section>

      <section className="border-t border-primary/10 bg-surface-2/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
                Continuar explorando
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Você também pode gostar
              </h2>
            </div>
          </div>

          <div className="mt-8 flex gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {BOLOS.map((bolo) => (
              <button
                key={`related-${bolo.id}`}
                type="button"
                onClick={() => openBolo(bolo)}
                className="group w-[220px] shrink-0 overflow-hidden rounded-[1.5rem] bg-surface-0 text-left shadow-[0_8px_28px_rgba(23,184,170,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,184,170,0.12)] sm:w-[240px]"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={bolo.imagem}
                    alt={bolo.nome}
                    fill
                    loading="lazy"
                    sizes="240px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="px-4 py-4">
                  <p className="font-medium text-foreground">{bolo.nome}</p>
                  <p className="mt-1 text-sm text-primary">
                    A partir de {formatPrice(getPrecoApartirDe(bolo))}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <BoloDetailSheet
        bolo={selected}
        open={open && Boolean(selected)}
        onClose={closeSheet}
      />
    </div>
  );
}
