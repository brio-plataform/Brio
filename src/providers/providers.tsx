'use client';

import { AuthProvider } from "@/providers/auth";
import { TRPCProvider } from "@/providers/trpc-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </TRPCProvider>
  );
} 