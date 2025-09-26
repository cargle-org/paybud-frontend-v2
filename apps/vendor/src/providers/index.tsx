"use client";

import StoreProvider from "./StoreProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default AppProvider;
