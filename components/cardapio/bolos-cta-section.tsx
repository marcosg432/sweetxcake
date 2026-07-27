"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/images";

export function BolosCtaSection() {
  return (
    <section
      id="bolos-cta"
      data-catalog-section="bolos"
      className="scroll-mt-36 py-8 sm:scroll-mt-40 sm:py-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45 }}
        className="overflow-hidden rounded-[1.75rem] border border-primary/12 bg-surface-0 shadow-brand"
      >
        <div className="grid sm:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-dark">
              Bolos
            </p>
            <h2 className="mt-3 font-display text-2xl tracking-tight text-foreground sm:text-3xl">
              Catálogo exclusivo de bolos
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Muitos sabores, tamanhos PP, P, M e G, e personalização. Explore a
              vitrine completa em uma experiência premium.
            </p>
            <Link
              href="/categorias/bolos"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark active:scale-[0.98]"
            >
              Ver bolos
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative min-h-[180px] sm:min-h-full">
            <Image
              src={IMAGES.categories.bolos}
              alt="Bolos artesanais Sweet Cheesecake"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent sm:bg-gradient-to-l" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
