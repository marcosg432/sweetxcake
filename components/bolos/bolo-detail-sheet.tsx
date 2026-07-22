"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Star, X } from "lucide-react";
import { useMediaQuery } from "@/components/bolos/use-media-query";
import type { Bolo, BoloTamanho } from "@/lib/bolos";
import { CROSS_SELL } from "@/lib/bolos";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useUiStore } from "@/stores/ui-store";

type BoloDetailSheetProps = {
  bolo: Bolo | null;
  open: boolean;
  onClose: () => void;
};

export function BoloDetailSheet({ bolo, open, onClose }: BoloDetailSheetProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const panelMotion = isDesktop
    ? {
        initial: { x: "100%", opacity: 0.96 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "100%", opacity: 0.96 },
      }
    : {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
      };

  return (
    <AnimatePresence>
      {open && bolo ? (
        <>
          <motion.button
            type="button"
            aria-label="Fechar detalhes"
            className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            className={cn(
              "fixed z-[70] flex flex-col overflow-hidden bg-surface-1 shadow-brand",
              "inset-x-0 bottom-0 h-[min(92svh,920px)] rounded-t-[2rem]",
              "md:inset-y-0 md:right-0 md:left-auto md:bottom-auto md:h-full md:max-h-none md:w-full md:max-w-[480px] md:rounded-none"
            )}
            initial={panelMotion.initial}
            animate={panelMotion.animate}
            exit={panelMotion.exit}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <BoloDetailContent key={bolo.id} bolo={bolo} onClose={onClose} />
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function BoloDetailContent({ bolo, onClose }: { bolo: Bolo; onClose: () => void }) {
  const titleId = useId();
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useUiStore((state) => state.showToast);

  const [tamanho, setTamanho] = useState<BoloTamanho>(bolo.tamanhos[0]);
  const [quantidade, setQuantidade] = useState(1);
  const [observacoes, setObservacoes] = useState("");

  const total = tamanho.preco * quantidade;

  const handleAdd = () => {
    const sizeNote = `Tamanho ${tamanho.nome} · ${tamanho.peso} · ${tamanho.fatias}`;
    const notes = observacoes.trim()
      ? `${sizeNote}\n${observacoes.trim()}`
      : sizeNote;

    addItem({
      id: `${bolo.id}-${tamanho.nome}`,
      slug: bolo.slug,
      name: `${bolo.nome} (${tamanho.nome})`,
      price: tamanho.preco,
      image: bolo.imagem,
      quantity: quantidade,
      observations: notes,
    });
    showToast("Bolo adicionado ao pedido.");
    onClose();
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 justify-center pt-3 md:hidden">
        <div className="h-1.5 w-12 rounded-full bg-primary/20" />
      </div>

      <div className="flex shrink-0 items-center justify-between border-b border-primary/10 px-5 py-4 md:px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
          Detalhes do bolo
        </p>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 text-primary transition-colors hover:bg-primary/5"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-4 md:px-6">
        <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem]">
          <Image
            src={bolo.imagem}
            alt={bolo.nome}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover"
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
            Produção artesanal
          </span>
          <div
            className="inline-flex items-center gap-0.5 text-secondary"
            aria-label="5 de 5 estrelas"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
        </div>

        <h2
          id={titleId}
          className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground"
        >
          {bolo.nome}
        </h2>

        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-foreground/70">
          {bolo.descricao}
        </p>

        <div className="mt-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Escolha do tamanho
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {bolo.tamanhos.map((option) => {
              const selected = option.nome === tamanho.nome;
              return (
                <motion.button
                  key={option.nome}
                  type="button"
                  layout
                  onClick={() => setTamanho(option)}
                  className={cn(
                    "rounded-2xl border px-4 py-3.5 text-left transition-all duration-300",
                    selected
                      ? "border-primary bg-primary/8 shadow-[0_10px_28px_rgba(31,212,196,0.16)]"
                      : "border-primary/10 bg-surface-0 hover:border-primary/25"
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-lg font-semibold text-foreground">{option.nome}</span>
                    <span className="text-sm font-medium text-primary">
                      {formatPrice(option.preco)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-foreground/55">{option.peso}</p>
                  <p className="mt-0.5 text-xs text-foreground/45">{option.fatias}</p>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tamanho.nome}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="mt-3 rounded-2xl bg-surface-3/80 px-4 py-3 text-sm text-foreground/70"
            >
              <span className="font-medium text-foreground">{tamanho.nome}</span>
              {" · "}
              {tamanho.peso}
              {" · "}
              {tamanho.fatias}
              {" · "}
              <span className="font-medium text-primary">{formatPrice(tamanho.preco)}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Quantidade</p>
          <div className="mt-3 inline-flex items-center gap-4 rounded-full border border-primary/15 bg-surface-0 px-2 py-1.5">
            <button
              type="button"
              onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 active:scale-95"
              aria-label="Diminuir quantidade"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-6 text-center text-base font-semibold tabular-nums">
              {quantidade}
            </span>
            <button
              type="button"
              onClick={() => setQuantidade((q) => q + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 active:scale-95"
              aria-label="Aumentar quantidade"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <label
            htmlFor="bolo-obs"
            className="text-xs font-medium uppercase tracking-[0.18em] text-muted"
          >
            Observações
          </label>
          <textarea
            id="bolo-obs"
            value={observacoes}
            onChange={(event) => setObservacoes(event.target.value)}
            rows={3}
            placeholder={
              "Exemplo:\nSem coco\nMais brigadeiro\nSem cobertura\nMensagem para produção"
            }
            className="mt-3 w-full resize-none rounded-2xl border border-primary/12 bg-surface-0 px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-foreground/35 outline-none transition focus:border-primary/35 focus:ring-2 focus:ring-primary/15"
          />
        </div>

        <div className="mt-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Combina perfeitamente com
          </p>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CROSS_SELL.map((item) => (
              <div
                key={item.id}
                className="w-[128px] shrink-0 overflow-hidden rounded-2xl border border-primary/10 bg-surface-0"
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.imagem}
                    alt={item.nome}
                    fill
                    loading="lazy"
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <div className="px-2.5 py-2.5">
                  <p className="truncate text-xs font-medium text-foreground">{item.nome}</p>
                  <p className="mt-0.5 text-[11px] text-primary">{formatPrice(item.preco)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-primary/10 bg-surface-1 px-5 py-4 md:px-6">
        <button
          type="button"
          onClick={handleAdd}
          className="group relative w-full overflow-hidden rounded-full bg-secondary px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(181,46,55,0.28)] transition hover:bg-secondary-dark active:scale-[0.99]"
        >
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-active:translate-x-full" />
          Adicionar ao Carrinho
        </button>
        <AnimatePresence mode="wait">
          <motion.p
            key={`${tamanho.nome}-${quantidade}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2.5 text-center text-sm text-foreground/60"
          >
            Total <span className="font-semibold text-foreground">{formatPrice(total)}</span>
            {quantidade > 1 ? (
              <span className="text-foreground/45">
                {" "}
                · {quantidade}× {formatPrice(tamanho.preco)}
              </span>
            ) : null}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
