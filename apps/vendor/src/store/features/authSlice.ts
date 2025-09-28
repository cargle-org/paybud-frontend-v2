import { create, StateCreator } from "zustand";

export interface IAuthSlice {
  accessToken: string;
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
}

export const createAuthSlice: StateCreator<IAuthSlice, [], [], IAuthSlice> = (set, get) => ({
  accessToken: "",
  setAccessToken: (token) => set({ accessToken: token }),
  removeAccessToken: () => set({}),
});
