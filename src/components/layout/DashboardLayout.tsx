"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/documents", label: "Documents" },
  { href: "/review", label: "Review" },
  { href: "/workflows", label: "Workflows" },
  { href: "/audit", label: "Audit log" },
  { href: "/settings", label: "Settings" },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="flex w-56 flex-col border-r border-grey-200 bg-white">
        <div className="flex h-16 items-center border-b border-grey-200 px-6">
          <Link href="/dashboard" className="text-lg font-semibold text-primary">
            OptiFlowAI™
          </Link>
        </div>
        <nav className="flex-1 space-y-0.5 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-smooth ${
                  isActive
                    ? "bg-grey-100 text-primary"
                    : "text-grey-600 hover:bg-grey-50 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-grey-200 p-4">
          <Link
            href="/profile"
            className="block rounded-lg px-3 py-2 text-sm text-grey-600 transition-smooth hover:bg-grey-50 hover:text-primary"
          >
            Profile
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center border-b border-grey-200 bg-white/95 px-8 backdrop-blur">
          <div className="flex-1" />
          <div className="flex items-center gap-4 text-sm text-grey-600">
            <span>Welcome back</span>
            <Link
              href="/profile"
              className="font-medium text-primary hover:underline"
            >
              Account
            </Link>
          </div>
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
