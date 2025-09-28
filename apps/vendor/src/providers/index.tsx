"use client";

import { ToastProvider } from "@/context/toast";
import { QueryProvider } from "./QueryClientProvider";
import { StoreProvider } from "./StoreProvider";
import ProviderContent from "./ProviderContent";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <QueryProvider>
        <ToastProvider>
          {children}
          <ProviderContent />
        </ToastProvider>
      </QueryProvider>
    </StoreProvider>
  );
};

export default AppProvider;
