"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useUiStore } from "@/stores/ui-store";

export function Toast() {
  const message = useUiStore((state) => state.message);

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2">
      <AnimatePresence>
        {message ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-2xl border border-primary/20 bg-surface-1/95 px-4 py-3 text-center text-sm text-foreground shadow-brand backdrop-blur-md"
          >
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
