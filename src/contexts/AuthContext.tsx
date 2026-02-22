"use client";

import * as React from "react";
import type { Role } from "@/lib/auth/roles";

interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

const MOCK_USER: User = {
  id: "1",
  email: "user@example.com",
  name: "Demo User",
  role: "Analyst",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate auth check (e.g. Manus OAuth / session)
    const t = setTimeout(() => {
      setUser(MOCK_USER);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const signIn = React.useCallback(async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setUser(MOCK_USER);
    setIsLoading(false);
  }, []);

  const signOut = React.useCallback(async () => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
