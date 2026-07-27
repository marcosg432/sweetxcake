"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Cake, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";

const BADGES = [
  { label: "Produção artesanal", Icon: Heart },
  { label: "Ingredientes selecionados", Icon: Cake },
  { label: "Preparado diariamente", Icon: Sparkles },
] as const;

const SLIDE_INTERVAL_MS = 5200;

export function TeamSection() {
  const slides = IMAGES.team;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      id="equipe"
      className="relative overflow-hidden bg-surface-0 py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_12%_20%,color-mix(in_srgb,var(--primary)_7%,transparent),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:gap-14 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="order-1"
          >
            <div className="group relative overflow-hidden rounded-[20px] shadow-[0_18px_50px_rgba(23,184,170,0.12)]">
              <div className="relative aspect-[4/3] w-full">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={slides[index]}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={slides[index]}
                      alt="Equipe Sweet Cheesecake"
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      priority={index === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {slides.length > 1 ? (
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                  {slides.map((slide, slideIndex) => (
                    <button
                      key={slide}
                      type="button"
                      aria-label={`Foto da equipe ${slideIndex + 1}`}
                      onClick={() => setIndex(slideIndex)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        slideIndex === index
                          ? "w-6 bg-primary"
                          : "w-1.5 bg-white/70 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 text-center lg:text-left"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary">
              Nossa equipe
            </p>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
              Quem faz a Sweet Cheesecake acontecer
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base lg:mx-0">
              Mais do que confeiteiros, somos uma equipe apaixonada por criar experiências
              inesquecíveis. Cada bolo é preparado diariamente com ingredientes selecionados,
              muito cuidado e atenção aos detalhes para transformar momentos especiais em
              memórias ainda mais doces.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {BADGES.map(({ label, Icon }, badgeIndex) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + badgeIndex * 0.06, duration: 0.4 }}
                  className="flex items-center justify-center gap-2.5 rounded-2xl border border-primary/10 bg-surface-1/80 px-3.5 py-3.5 text-left sm:flex-col sm:items-center sm:justify-center sm:gap-2 sm:px-3 sm:py-4 lg:items-start lg:text-left"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                  <p className="text-xs font-medium leading-snug text-muted sm:text-center lg:text-left">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-9 flex justify-center lg:justify-start">
              <Button
                href="/#lojas"
                variant="action"
                className="px-8 py-3.5 transition-transform duration-300 hover:scale-[1.02]"
              >
                Conheça nossas lojas
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
