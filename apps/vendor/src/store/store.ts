import { createStore, StateCreator } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { createAuthSlice, IAuthSlice } from "./features/authSlice";
import { createUserSlice, IUserSlice } from "./features/userSlice";
import { createOnboardingSlice, IOnboardingSlice } from "./features/onboardingSlice";
import { createNotificationSlice, INotificationSlice } from "./features/notificationSlice";

export interface IAppSlice {}

export const createAppSlice: StateCreator<IAppSlice, [], [], IAppSlice> = (set, get) => ({});

export type IStore = IAppSlice & IAuthSlice & IUserSlice & IOnboardingSlice & INotificationSlice;

export const createBaseStore = () => {
  return createStore<IStore>()(
    persist(
      (...a) => ({
        ...createAppSlice(...a),
        ...createAuthSlice(...a),
        ...createUserSlice(...a),
        ...createOnboardingSlice(...a),
        ...createNotificationSlice(...a),
      }),
      { name: "paybud-store" }
    )
  );
};
