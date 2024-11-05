import { IUserInfo } from "@/app/backend/business/auth/data/AuthDtos";
import { create } from "zustand";

export interface IAuthStore {
  userInfo?: IUserInfo;
  setUserInfo: (userInfo: any) => void;
  removeUserInfo: () => void;
}

export const useAuthStore = create<IAuthStore>((set, getState) => ({
  userInfo: undefined,
  setUserInfo: (userInfo: IUserInfo) => set({ userInfo }),
  removeUserInfo: () => set({ userInfo: undefined }),
}));

export const authSelectors = {
  isAuthenticated: (state: IAuthStore): boolean => !!state.userInfo,
  userInfo: (state: IAuthStore): IUserInfo | undefined => state.userInfo,
};

export const authActions = {
  setUserInfo: (state: IAuthStore) => state.setUserInfo,
  removeUserInfo: (state: IAuthStore) => state.removeUserInfo,
};
