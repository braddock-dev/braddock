import { create } from "zustand";

export enum ResponsivenessType {
  MOBILE = "MOBILE",
  SMALL_TABLET = "SMALL_TABLET",
  TABLET = "TABLET",
  LARGE_TABLET = "LARGE_TABLET",
  DESKTOP = "DESKTOP",
}

export interface IResponsivenessState {
  type?: ResponsivenessType;
  typeLandscape?: ResponsivenessType;
  setTypeScreen: (type: ResponsivenessType) => void;
  setTypeScreenLandscape: (type: ResponsivenessType | undefined) => void;
}

const LOG_TAG = "responsivenessSlice";

const useResponsiveness = create<IResponsivenessState>((set) => ({
  type: undefined,
  setTypeScreen: (type: ResponsivenessType) => {
    set({ type });
  },
  setTypeScreenLandscape: (type: ResponsivenessType | undefined) => {
    set({ typeLandscape: type });
  },
}));

export const responsivenessActions = {
  setTypeScreen: (state: IResponsivenessState) => state.setTypeScreen,
  setTypeScreenLandscape: (state: IResponsivenessState) =>
    state.setTypeScreenLandscape,
};

const isMobile = (state: IResponsivenessState): boolean =>
  state.type === ResponsivenessType.MOBILE;
const isMobilePortraitOrLandscape = (state: IResponsivenessState): boolean =>
  state.type === ResponsivenessType.MOBILE ||
  state.typeLandscape === ResponsivenessType.MOBILE;
const isSmallTabletOrLess = (state: IResponsivenessState): boolean =>
  state.type === ResponsivenessType.SMALL_TABLET || isMobile(state);
const isTabletOrLess = (state: IResponsivenessState): boolean =>
  state.type === ResponsivenessType.TABLET || isSmallTabletOrLess(state);
const isLargeTabletOrLess = (state: IResponsivenessState): boolean =>
  state.type === ResponsivenessType.LARGE_TABLET || isTabletOrLess(state);
const responsivenessType = (
  state: IResponsivenessState,
): ResponsivenessType | undefined => state.type;

export const responsivenessSelectors = {
  isMobile,
  isMobilePortraitOrLandscape,
  isSmallTabletOrLess,
  isTabletOrLess,
  isLargeTabletOrLess,
  responsivenessType,
};

export { useResponsiveness };
