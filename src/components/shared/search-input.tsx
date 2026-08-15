"use client";

import {
  Search,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function SearchInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  autoFocus = false,
  className = "",
  ariaLabel,
}: SearchInputProps) {
  const common = useTranslations("common");
  const resolvedPlaceholder = placeholder ?? `${common("search")}...`;
  const resolvedAriaLabel = ariaLabel ?? common("search");
  const hasValue = value.trim().length > 0;

  function handleClear() {
    if (disabled) {
      return;
    }

    onChange("");
  }

  return (
    <div
      className={`
        relative w-full
        ${className}
      `}
    >
      <Search
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-3 top-1/2 size-4
          -translate-y-1/2
          text-foreground-muted
        "
      />

      <input
        type="search"
        value={value}
        disabled={disabled}
        autoFocus={autoFocus}
        placeholder={resolvedPlaceholder}
        aria-label={resolvedAriaLabel}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="
          h-10 w-full rounded-lg
          border border-border
          bg-background
          pl-9 pr-9
          text-sm text-foreground
          outline-none transition
          placeholder:text-foreground-subtle
          hover:border-foreground-subtle
          focus:border-primary
          focus:ring-2
          focus:ring-primary/20
          disabled:cursor-not-allowed
          disabled:opacity-60
          [&::-webkit-search-cancel-button]:hidden
          [&::-webkit-search-decoration]:hidden
        "
      />

      {hasValue && !disabled && (
        <button
          type="button"
          aria-label={common("clearSearch")}
          title={common("clearSearch")}
          onClick={handleClear}
          className="
            absolute right-2 top-1/2
            flex size-7
            -translate-y-1/2
            items-center justify-center
            rounded-md
            text-foreground-muted
            transition
            hover:bg-surface-hover
            hover:text-foreground
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary/30
          "
        >
          <X
            aria-hidden="true"
            className="size-4"
          />
        </button>
      )}
    </div>
  );
}
