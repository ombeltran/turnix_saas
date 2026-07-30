import type { ReactNode } from "react";

type StatusPillVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

type StatusPillProps = {
  children: ReactNode;
  variant?: StatusPillVariant;
};

const variantClasses: Record<StatusPillVariant, string> = {
  default:
    "bg-muted text-muted-foreground",
  success:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  warning:
    "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  danger:
    "bg-red-500/10 text-red-700 dark:text-red-400",
  info:
    "bg-blue-500/10 text-blue-700 dark:text-blue-400",
};

export function StatusPill({
  children,
  variant = "default",
}: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}