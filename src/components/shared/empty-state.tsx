"use client";

import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-64 flex-col items-center justify-center px-6 text-center",
        className
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-surface-muted text-foreground-muted">
        <Icon className="size-6" />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-foreground-muted">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}