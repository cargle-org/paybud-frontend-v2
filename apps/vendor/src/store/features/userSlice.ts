import { IUser } from "@/types/user";
import { create, StateCreator } from "zustand";

export interface IUserSlice {
  user?: IUser;
  setUser: (user: IUser) => void;
}

export const createUserSlice: StateCreator<IUserSlice, [], [], IUserSlice> = (set, get) => ({
  setUser: (user) => set({ user }),
  user: undefined,
});
