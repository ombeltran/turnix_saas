"use client";

import { cn } from "@/lib/utils";

export type FilterChipOption<T extends string = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type FilterChipsProps<T extends string = string> = {
  value: T;
  options: FilterChipOption<T>[];
  onChange: (value: T) => void;
  ariaLabel?: string;
  className?: string;
};

export function FilterChips<T extends string = string>({
  value,
  options,
  onChange,
  ariaLabel = "Filter options",
  className,
}: FilterChipsProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "flex w-full max-w-full flex-nowrap items-center gap-1 overflow-x-auto rounded-lg border border-border bg-surface p-1 sm:w-fit sm:flex-wrap",
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            disabled={option.disabled}
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex h-8 shrink-0 items-center justify-center rounded-md px-3 text-sm font-medium",
              "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted hover:bg-surface-hover hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
