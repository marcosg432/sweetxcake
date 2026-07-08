"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MENU_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type MenuMegaDropdownProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
};

const panelMotion = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.18, ease: "easeOut" as const },
};

export function MenuMegaDropdown({
  isOpen,
  onOpen,
  onClose,
  onToggle,
  onNavigate,
  variant = "desktop",
}: MenuMegaDropdownProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      onClose();
    }, 80);
  };

  const handleOpen = () => {
    clearCloseTimer();
    onOpen();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  if (variant === "mobile") {
    return (
      <div ref={rootRef} className="w-full">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-haspopup="true"
          className="inline-flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-primary/5 hover:text-primary"
        >
          Cardápio
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")}
          />
        </button>

        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              key="mega-menu-mobile"
              initial={panelMotion.initial}
              animate={panelMotion.animate}
              exit={panelMotion.exit}
              transition={panelMotion.transition}
              className="mt-2 overflow-hidden"
            >
              <div className="w-full rounded-2xl glass-panel-strong p-4">
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {MENU_CATEGORIES.map((item) => (
                    <Link
                      key={item.slug}
                      href={item.href}
                      onClick={() => {
                        onClose();
                        onNavigate?.();
                      }}
                      className="rounded-xl px-4 py-3 text-sm text-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-1 text-sm transition-colors",
          isOpen ? "text-primary" : "text-muted hover:text-primary"
        )}
      >
        Cardápio
        <ChevronDown
          className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")}
        />
      </button>

      {/* Ponte invisível para evitar flicker entre botão e painel */}
      <div className="absolute left-0 right-0 top-full h-4" aria-hidden />

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="mega-menu-desktop"
            initial={panelMotion.initial}
            animate={panelMotion.animate}
            exit={panelMotion.exit}
            transition={panelMotion.transition}
            className="absolute left-1/2 top-full z-50 mt-3 w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2"
            style={{ pointerEvents: isOpen ? "auto" : "none" }}
          >
            <div className="rounded-3xl glass-panel-strong p-6">
              <div className="grid gap-2 md:grid-cols-2 md:gap-6">
                <div className="space-y-1">
                  {MENU_CATEGORIES.slice(0, 4).map((item) => (
                    <Link
                      key={item.slug}
                      href={item.href}
                      onClick={onClose}
                      className="block rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="space-y-1">
                  {MENU_CATEGORIES.slice(4).map((item) => (
                    <Link
                      key={item.slug}
                      href={item.href}
                      onClick={onClose}
                      className="block rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
