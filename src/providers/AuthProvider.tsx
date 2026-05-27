"use client";

import { SessionProvider } from "next-auth/react";

interface AuthProviderProps {
  children: React.ReactNode;
  authEnabled: boolean;
}

export default function AuthProvider({
  children,
  authEnabled,
}: AuthProviderProps) {
  if (!authEnabled) {
    return <>{children}</>;
  }

  return <SessionProvider>{children}</SessionProvider>;
}
