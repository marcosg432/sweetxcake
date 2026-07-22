"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";

const INDICATORS = [
  "Produção diária",
  "Finalização em até 40 minutos",
  "Diversos tamanhos disponíveis",
] as const;

const HERO_SLIDES = [
  {
    src: "/images/bolos/hero/hero-01.png",
    alt: "Cheesecake de morango artesanal Sweet Cheesecake",
  },
  {
    src: "/images/bolos/hero/hero-02.png",
    alt: "Cheesecake de frutas vermelhas no pote",
  },
  {
    src: "/images/bolos/hero/hero-03.png",
    alt: "Sobremesas de chocolate e limão",
  },
  {
    src: "/images/bolos/hero/hero-04.png",
    alt: "Pote de chocolate com creme de limão",
  },
  {
    src: "/images/bolos/hero/hero-05.png",
    alt: "Bolo marmorizado de chocolate",
  },
  {
    src: "/images/bolos/hero/hero-06.png",
    alt: "Pote de doce com canela e caramelo",
  },
] as const;

const SLIDE_INTERVAL_MS = 4500;

export function BolosHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate min-h-[40svh] overflow-hidden sm:min-h-[42svh] lg:min-h-[46svh]">
      <div className="absolute inset-0">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={HERO_SLIDES[index].src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={HERO_SLIDES[index].src}
              alt={HERO_SLIDES[index].alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(31,212,196,0.18),transparent_55%)]" />

      <div className="absolute right-5 top-20 z-[1] sm:right-8 sm:top-24 lg:right-12">
        <BrandLogo
          size="md"
          className="h-12 w-12 opacity-90 drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:h-14 sm:w-14"
        />
      </div>

      <div className="relative mx-auto flex min-h-[40svh] max-w-7xl flex-col justify-end px-4 pb-10 pt-24 sm:min-h-[42svh] sm:px-6 sm:pb-12 lg:min-h-[46svh] lg:px-8 lg:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2">
            <BrandLogo size="xs" className="h-6 w-6 opacity-90" />
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
              Coleção artesanal
            </p>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Bolos Artesanais
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Preparados diariamente com ingredientes selecionados e finalizados sob
            encomenda para garantir máxima qualidade.
          </p>

          <ul className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
            {INDICATORS.map((label, indicatorIndex) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + indicatorIndex * 0.08, duration: 0.45 }}
                className="inline-flex items-center gap-2 text-sm text-white/90"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/90 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {label}
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="#bolos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.45 }}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-foreground shadow-[0_12px_40px_rgba(0,0,0,0.22)] transition-all duration-300 hover:bg-primary hover:text-white"
          >
            Ver Bolos
            <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </motion.a>
        </motion.div>

        <div className="mt-8 flex items-center gap-2" aria-hidden>
          {HERO_SLIDES.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Ir para imagem ${slideIndex + 1}`}
              onClick={() => setIndex(slideIndex)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                slideIndex === index
                  ? "w-8 bg-primary"
                  : "w-1.5 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
