"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const HOME_SLIDES = [
  {
    src: "/images/home/carousel/hero-01.png",
    alt: "Cheesecake de morango Sweet Cheesecake",
  },
  {
    src: "/images/home/carousel/hero-02.png",
    alt: "Cheesecake de frutas vermelhas no pote",
  },
  {
    src: "/images/home/carousel/hero-03.png",
    alt: "Sobremesas de chocolate e limão",
  },
  {
    src: "/images/home/carousel/hero-04.png",
    alt: "Pote de chocolate com creme de limão",
  },
  {
    src: "/images/home/carousel/hero-05.png",
    alt: "Bolo marmorizado de chocolate",
  },
  {
    src: "/images/home/carousel/hero-06.png",
    alt: "Pote de doce com canela e caramelo",
  },
] as const;

const SLIDE_INTERVAL_MS = 4200;

export function HomeHeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % HOME_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="glass-panel relative aspect-[4/5] overflow-hidden rounded-[2.5rem] p-3 shadow-brand">
      <div className="relative h-full overflow-hidden rounded-[2rem]">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={HOME_SLIDES[index].src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={HOME_SLIDES[index].src}
              alt={HOME_SLIDES[index].alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
          {HOME_SLIDES.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Imagem ${slideIndex + 1}`}
              onClick={() => setIndex(slideIndex)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                slideIndex === index
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
