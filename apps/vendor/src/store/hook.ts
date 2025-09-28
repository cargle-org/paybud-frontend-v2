import { StoreContext } from "@/providers/StoreProvider";
import { useContext } from "react";
import { useStore } from "zustand";
import { IStore } from "./store";

export const useBaseStore = <T>(selector: (store: IStore) => T): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error(`useBaseStore must be used within StoreProvider`);
  }

  return useStore(storeContext, selector);
};
