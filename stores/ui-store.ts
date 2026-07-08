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
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openStoreModal: () => void;
  closeStoreModal: () => void;
} & ToastState;

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  storeModalOpen: false,
  message: null,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
  openStoreModal: () => set({ storeModalOpen: true }),
  closeStoreModal: () => set({ storeModalOpen: false }),
  showToast: (message) => {
    set({ message });
    window.setTimeout(() => {
      set((state) => (state.message === message ? { message: null } : state));
    }, 2400);
  },
  hideToast: () => set({ message: null }),
}));
