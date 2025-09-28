import { createStore, StateCreator } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { createAuthSlice, IAuthSlice } from "./features/authSlice";
import { createUserSlice, IUserSlice } from "./features/userSlice";

export interface IAppSlice {}

export const createAppSlice: StateCreator<IAppSlice, [], [], IAppSlice> = (set, get) => ({});

export type IStore = IAppSlice & IAuthSlice & IUserSlice;

export const createBaseStore = () => {
  return createStore<IStore>()(
    persist(
      (...a) => ({
        ...createAppSlice(...a),
        ...createAuthSlice(...a),
        ...createUserSlice(...a),
      }),
      { name: "paybud-store" }
    )
  );
};
