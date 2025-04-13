import { create } from "zustand";

export interface IMenuStore {
  isOpen: boolean;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
}

export const useMenuStore = create<IMenuStore>((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
  openMenu: () => set({ isOpen: true }),
  closeMenu: () => set({ isOpen: false }),
}));

export const menuSelectors = {
  isOpen: (state: IMenuStore) => state.isOpen,
};

export const menuActions = {
  toggleMenu: (state: IMenuStore) => state.toggleMenu,
  openMenu: (state: IMenuStore) => state.openMenu,
  closeMenu: (state: IMenuStore) => state.closeMenu,
};
