"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import type { Role } from "@/lib/auth/roles";
import { hasMinRole } from "@/lib/auth/roles";

interface ProtectedRouteProps {
  children: React.ReactNode;
  minRole?: Role;
}

export function ProtectedRoute({ children, minRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/");
      return;
    }
    if (minRole && !hasMinRole(user.role, minRole)) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, minRole, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-grey-600">Loading…</p>
      </div>
    );
  }

  if (!user) return null;

  if (minRole && !hasMinRole(user.role, minRole)) return null;

  return <>{children}</>;
}
