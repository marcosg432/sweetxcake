"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartVariant = {
  id: string;
  name: string;
  price: number;
  details?: string;
};

export type CartComplement = {
  id: string;
  name: string;
  price: number;
};

export type CartItem = {
  /** Identidade da configuração: produto, variação, complementos e observações. */
  key: string;
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: CartVariant;
  complements?: CartComplement[];
  notes?: string;
  /** Campo legado mantido para pedidos persistidos e componentes antigos. */
  observations?: string;
};

export type CartItemInput = Omit<CartItem, "quantity" | "key"> & {
  quantity?: number;
  key?: string;
};

function normalizeKeyPart(value?: string) {
  return value?.trim().replace(/\s+/g, " ").toLocaleLowerCase("pt-BR") ?? "";
}

function lineKey(
  id: string,
  variantId?: string,
  complementIds: string[] = [],
  notes?: string
) {
  return [
    id,
    variantId ?? "",
    [...complementIds].sort().join(","),
    normalizeKeyPart(notes),
  ].join("::");
}

type CartState = {
  items: CartItem[];
  addItem: (item: CartItemInput) => void;
  replaceItem: (currentKey: string, item: CartItemInput) => void;
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
        const key =
          item.key ??
          lineKey(
            item.id,
            item.variant?.id,
            item.complements?.map((complement) => complement.id),
            item.notes ?? item.observations
          );
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
                variant: item.variant,
                complements: item.complements,
                notes: item.notes,
                observations: item.observations,
              },
            ],
          };
        });
      },
      replaceItem: (currentKey, item) => {
        const quantity = item.quantity ?? 1;
        const key =
          item.key ??
          lineKey(
            item.id,
            item.variant?.id,
            item.complements?.map((complement) => complement.id),
            item.notes ?? item.observations
          );
        const replacement: CartItem = {
          key,
          id: item.id,
          slug: item.slug,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity,
          variant: item.variant,
          complements: item.complements,
          notes: item.notes,
          observations: item.observations,
        };

        set((state) => {
          const withoutCurrent = state.items.filter(
            (entry) => entry.key !== currentKey
          );
          const matching = withoutCurrent.find((entry) => entry.key === key);
          return {
            items: matching
              ? withoutCurrent.map((entry) =>
                  entry.key === key
                    ? { ...entry, quantity: entry.quantity + quantity }
                    : entry
                )
              : [...withoutCurrent, replacement],
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
      version: 3,
      migrate: (persisted) => {
        const state = persisted as { items?: Array<Partial<CartItem>> } | undefined;
        const items = (state?.items ?? []).map((item) => ({
          key:
            item.key ??
            lineKey(
              item.id ?? "",
              item.variant?.id,
              item.complements?.map((complement) => complement.id),
              item.notes ?? item.observations
            ),
          id: item.id ?? "",
          slug: item.slug ?? "",
          name: item.name ?? "",
          price: item.price ?? 0,
          image: item.image ?? "",
          quantity: item.quantity ?? 1,
          variant: item.variant,
          complements: item.complements,
          notes: item.notes,
          observations: item.observations,
        }));
        return { items };
      },
    }
  )
);
