"use client";

import { Check, ChevronDown, Languages } from "lucide-react";
import { setLocale } from "@/actions/set-locale";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const languages = [
  {
    locale: "es",
    label: "Español",
    shortLabel: "ES",
  },
  {
    locale: "en",
    label: "English",
    shortLabel: "EN",
  },
] as const;

type Locale = (typeof languages)[number]["locale"];

export function LanguageSelector() {
  const locale = useLocale() as Locale;
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentLanguage =
    languages.find((language) => language.locale === locale) ?? languages[0];

  function changeLanguage(nextLocale: Locale) {
    if (nextLocale === locale) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);

    startTransition(async () => {
      await setLocale(nextLocale);
      router.refresh();
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Seleccionar idioma"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        disabled={isPending}
        onClick={() => setIsOpen((current) => !current)}
        className="
          inline-flex h-10 items-center gap-2 rounded-md
          border border-border bg-surface px-3
          text-sm font-medium text-foreground
          shadow-sm transition-colors
          hover:bg-surface-hover
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary
          focus-visible:ring-offset-2
          focus-visible:ring-offset-background
          disabled:pointer-events-none
          disabled:opacity-50
        "
      >
        <Languages className="size-4" aria-hidden="true" />

        <span>{currentLanguage.shortLabel}</span>

        <ChevronDown
          className={`size-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="
            absolute right-0 z-50 mt-2 min-w-40
            overflow-hidden rounded-md border border-border
            bg-surface p-1 shadow-md
          "
        >
          {languages.map((language) => {
            const isSelected = language.locale === locale;

            return (
              <button
                key={language.locale}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => changeLanguage(language.locale)}
                className="
                  flex w-full items-center justify-between
                  rounded-sm px-3 py-2 text-left text-sm
                  text-foreground transition-colors
                  hover:bg-surface-hover
                  focus-visible:outline-none
                  focus-visible:bg-surface-hover
                "
              >
                <span>{language.label}</span>

                {isSelected && (
                  <Check className="size-4 text-primary" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
