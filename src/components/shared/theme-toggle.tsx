"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const themeOptions = [
  {
    value: "light",
    translationKey: "light",
    icon: Sun,
  },
  {
    value: "dark",
    translationKey: "dark",
    icon: Moon,
  },
] as const;

function subscribe() {
  return () => {};
}

function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const mounted = useIsMounted();
  const t = useTranslations("theme");
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className="h-10 w-61 rounded-lg bg-surface-muted"
      />
    );
  }

  return (
    <div
      className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface p-1"
      role="group"
      aria-label={t("label")}
    >
      {themeOptions.map((option) => {
        const Icon = option.icon;
        const isActive = theme === option.value;

        return (
          <Button
            key={option.value}
            type="button"
            variant="ghost"
            size="sm"
            aria-pressed={isActive}
            onClick={() => setTheme(option.value)}
            className={cn(
              "gap-1.5 px-2.5",
              isActive &&
                "bg-primary text-primary-foreground hover:bg-primary"
            )}
          >
            <Icon className="size-4" />

            <span>{t(option.translationKey)}</span>
          </Button>
        );
      })}
    </div>
  );
}