import { createStore, StateCreator } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { createAuthSlice, IAuthSlice } from "./features/authSlice";
import { createUserSlice, IUserSlice } from "./features/userSlice";
import { createOnboardingSlice, IOnboardingSlice } from "./features/onboardingSlice";

export interface IAppSlice {}

export const createAppSlice: StateCreator<IAppSlice, [], [], IAppSlice> = (set, get) => ({});

export type IStore = IAppSlice & IAuthSlice & IUserSlice & IOnboardingSlice;

export const createBaseStore = () => {
  return createStore<IStore>()(
    persist(
      (...a) => ({
        ...createAppSlice(...a),
        ...createAuthSlice(...a),
        ...createUserSlice(...a),
        ...createOnboardingSlice(...a),
      }),
      { name: "paybud-store" }
    )
  );
};
