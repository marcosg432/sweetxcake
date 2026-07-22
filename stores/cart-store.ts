"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  /** Identidade da linha (produto + observações). */
  key: string;
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  observations?: string;
};

function lineKey(id: string, observations?: string) {
  return `${id}::${observations ?? ""}`;
}

type CartState = {
  items: CartItem[];
  addItem: (
    item: Omit<CartItem, "quantity" | "key"> & { quantity?: number; key?: string }
  ) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const quantity = item.quantity ?? 1;
        const key = item.key ?? lineKey(item.id, item.observations);
        set((state) => {
          const existing = state.items.find((entry) => entry.key === key);
          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.key === key
                  ? { ...entry, quantity: entry.quantity + quantity }
                  : entry
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                key,
                id: item.id,
                slug: item.slug,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity,
                observations: item.observations,
              },
            ],
          };
        });
      },
      removeItem: (key) =>
        set((state) => ({
          items: state.items.filter((item) => item.key !== key),
        })),
      updateQuantity: (key, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.key !== key) };
          }
          return {
            items: state.items.map((item) =>
              item.key === key ? { ...item, quantity } : item
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "sweet-cheesecake-cart",
      version: 2,
      migrate: (persisted) => {
        const state = persisted as { items?: Array<Partial<CartItem>> } | undefined;
        const items = (state?.items ?? []).map((item) => ({
          key: item.key ?? lineKey(item.id ?? "", item.observations),
          id: item.id ?? "",
          slug: item.slug ?? "",
          name: item.name ?? "",
          price: item.price ?? 0,
          image: item.image ?? "",
          quantity: item.quantity ?? 1,
          observations: item.observations,
        }));
        return { items };
      },
    }
  )
);
