"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { InstagramIconButton } from "@/components/brand/instagram-link";
import { CartBagButton } from "@/components/cart/cart-bag-button";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HEADER_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Cardápio Cafeteria", href: "/cardapio#salgados" },
  { label: "Catálogo de Bolos", href: "/cardapio#bolos" },
  { label: "Lojas", href: "/#lojas" },
  { label: "Sobre", href: "/#historia" },
] as const;

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeAll = () => {
    setMobileNavOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-surface-1/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/#home"
          className="group flex items-center gap-2 transition-opacity hover:opacity-90"
          aria-label={SITE_NAME}
        >
          <BrandLogo size="md" priority className="h-14 w-14" />
          <span className="font-display text-lg tracking-tight text-foreground sm:text-xl">
            {SITE_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {HEADER_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="whitespace-nowrap text-sm text-muted transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}

          <InstagramIconButton />
          <CartBagButton />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
          <InstagramIconButton />
          <CartBagButton />
          <button
            type="button"
            onClick={() => {
              setMobileNavOpen((prev) => !prev);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:border-primary hover:bg-primary/5"
            aria-label="Menu"
          >
            {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-primary/10 bg-background transition-all duration-300 lg:hidden",
          mobileNavOpen ? "max-h-[40rem]" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {HEADER_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeAll}
              className="rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-primary/5 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
