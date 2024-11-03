import { create } from "zustand";

export enum HeroCardType {
  NEW_APPOINTMENT = "NEW_APPOINTMENT",
  APPOINTMENTS_LIST = "APPOINTMENTS_LIST",
}

export interface IUIStore {
  heroCardType: HeroCardType;
  setHeroCardType: (heroCardType: HeroCardType) => void;
}

export const useUIStore = create<IUIStore>((set, getState) => ({
  heroCardType: HeroCardType.NEW_APPOINTMENT,
  setHeroCardType: (heroCardType: HeroCardType) => set({ heroCardType }),
}));

export const uiSelectors = {
  heroCardType: (state: IUIStore) => state.heroCardType,
};

export const uiActions = {
  setHeroCardType: (state: IUIStore) => state.setHeroCardType,
};
