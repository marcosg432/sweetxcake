"use client";

import { create } from "zustand";

type ToastState = {
  message: string | null;
  showToast: (message: string) => void;
  hideToast: () => void;
};

type UiState = {
  cartOpen: boolean;
  storeModalOpen: boolean;
  editingCartItemKey: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openStoreModal: () => void;
  closeStoreModal: () => void;
  openCartItemEditor: (key: string) => void;
  closeCartItemEditor: () => void;
} & ToastState;

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  storeModalOpen: false,
  editingCartItemKey: null,
  message: null,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
  openStoreModal: () => set({ storeModalOpen: true }),
  closeStoreModal: () => set({ storeModalOpen: false }),
  openCartItemEditor: (key) => set({ editingCartItemKey: key }),
  closeCartItemEditor: () => set({ editingCartItemKey: null }),
  showToast: (message) => {
    set({ message });
    window.setTimeout(() => {
      set((state) => (state.message === message ? { message: null } : state));
    }, 2400);
  },
  hideToast: () => set({ message: null }),
}));
