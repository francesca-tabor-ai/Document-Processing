"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function WorkflowsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
