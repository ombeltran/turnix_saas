import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface",
        "shadow-(--shadow-sm)",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 p-4 sm:p-5",
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-base font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm leading-5 text-foreground-muted",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "px-4 pb-4 sm:px-5 sm:pb-5",
        className
      )}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-t border-border px-5 py-4",
        className
      )}
      {...props}
    />
  );
}
