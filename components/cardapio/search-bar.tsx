"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChange,
  className,
  placeholder = "Buscar brownie, café, morango…",
}: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        strokeWidth={1.75}
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Buscar no cardápio"
        className="w-full rounded-2xl border border-primary/15 bg-surface-0 py-3 pl-10 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted/80 focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
      />
      {value ? (
        <button
          type="button"
          aria-label="Limpar busca"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-primary/10 hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );
}
