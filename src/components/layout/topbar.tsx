import type { ReactNode } from "react";

import { LanguageSelector } from "@/components/shared/language-selector";
import { ThemeToggle } from "@/components/shared/theme-toggle";

type TopbarProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

export function Topbar({
  title,
  subtitle,
  actions,
}: TopbarProps) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>

          {subtitle ? (
            <p className="mt-0.5 truncate text-sm text-foreground-muted">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {actions ? (
            <div className="hidden items-center gap-2 sm:flex">
              {actions}
            </div>
          ) : null}

          <LanguageSelector />
          <ThemeToggle />

          <button
            type="button"
            aria-label="Abrir menú de usuario"
            className="
              flex size-10 items-center justify-center
              rounded-full border border-border
              bg-surface-muted text-sm font-semibold
              text-foreground transition-colors
              hover:bg-surface-hover
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              focus-visible:ring-offset-2
              focus-visible:ring-offset-background
            "
          >
            O
          </button>
        </div>
      </div>

      {actions ? (
        <div className="flex items-center gap-2 border-t border-border px-4 py-3 sm:hidden">
          {actions}
        </div>
      ) : null}
    </header>
  );
}