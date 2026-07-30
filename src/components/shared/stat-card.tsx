import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type StatCardVariant =
  | "primary"
  | "success"
  | "warning"
  | "info";

type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: string;
  variant?: StatCardVariant;
  className?: string;
};

const variantClasses: Record<
  StatCardVariant,
  {
    iconContainer: string;
    icon: string;
    trend: string;
  }
> = {
  primary: {
    iconContainer: "bg-info-background",
    icon: "text-primary",
    trend: "text-primary",
  },
  success: {
    iconContainer: "bg-success-background",
    icon: "text-success",
    trend: "text-success",
  },
  warning: {
    iconContainer: "bg-warning-background",
    icon: "text-warning",
    trend: "text-warning",
  },
  info: {
    iconContainer: "bg-info-background",
    icon: "text-info",
    trend: "text-info",
  },
};

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "primary",
  className,
}: StatCardProps) {
  const styles = variantClasses[variant];

  return (
    <article
      className={cn(
        "rounded-xl border border-border bg-surface p-5",
        "shadow-(--shadow-sm)",
        "transition-shadow duration-200 hover:shadow-(--shadow-md)",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground-muted">
            {title}
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
        </div>

        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl",
            styles.iconContainer
          )}
        >
          <Icon
            aria-hidden="true"
            className={cn("size-5", styles.icon)}
          />
        </div>
      </div>

      {(description || trend) && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          {trend ? (
            <span className={cn("font-medium", styles.trend)}>
              {trend}
            </span>
          ) : null}

          {description ? (
            <span className="text-foreground-muted">
              {description}
            </span>
          ) : null}
        </div>
      )}
    </article>
  );
}