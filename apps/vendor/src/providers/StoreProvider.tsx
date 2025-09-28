"use client";
import { createBaseStore } from "@/store/store";
import { type ReactNode, createContext, useRef, useState, useEffect } from "react";

export type StoreApi = ReturnType<typeof createBaseStore>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

export interface ICounterStoreProvider {
  children: ReactNode;
}

export const StoreProvider = ({ children }: ICounterStoreProvider) => {
  const storeRef = useRef<StoreApi>(null);

  const result = createBaseStore();
  const [data, setData] = useState<StoreApi>();

  useEffect(() => {
    setData(result);
  }, []);

  if (!data) return null;

  if (!storeRef.current) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    storeRef.current = createBaseStore();
  }

  return <StoreContext.Provider value={storeRef.current}>{children}</StoreContext.Provider>;
};
