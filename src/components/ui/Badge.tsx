import * as React from "react";

export type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

/* Status badges: cool greys + signature accent tints (purples, blues, pinks, oranges); never overwhelm */
const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-grey-100 text-grey-800 border border-grey-200",
  success: "bg-emerald-50/90 text-emerald-800 border border-emerald-200/80",
  warning: "bg-orange-50/90 text-orange-800 border border-orange-200/80",
  error: "bg-red-50/90 text-red-800 border border-red-200/80",
  info: "bg-blue-50/90 text-blue-800 border border-blue-200/80",
};

export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium tabular-nums transition-smooth ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
