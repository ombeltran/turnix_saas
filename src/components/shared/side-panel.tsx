"use client";

import {
  useEffect,
  useId,
  type ReactNode,
} from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

type SidePanelSize = "sm" | "md" | "lg" | "xl" | "full";

type SidePanelProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  headerActions?: ReactNode;
  size?: SidePanelSize;
  closeOnBackdrop?: boolean;
  onClose: () => void;
};

const sizeClasses: Record<SidePanelSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-xl",
  xl: "max-w-2xl",
  full: "max-w-none",
};

export function SidePanel({
  open,
  title,
  subtitle,
  children,
  footer,
  headerActions,
  size = "md",
  closeOnBackdrop = true,
  onClose,
}: SidePanelProps) {
  const generatedTitleId = useId();
  const generatedDescriptionId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  function handleBackdropMouseDown(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    if (
      closeOnBackdrop &&
      event.target === event.currentTarget
    ) {
      onClose();
    }
  }

  return (
    <div
      className="
        fixed inset-0 z-50 flex justify-end
        bg-black/40 backdrop-blur-[1px]
      "
      role="presentation"
      onMouseDown={handleBackdropMouseDown}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={generatedTitleId}
        aria-describedby={
          subtitle
            ? generatedDescriptionId
            : undefined
        }
        className={`
          flex h-full w-full flex-col
          border-l border-border bg-surface
          shadow-2xl
          ${sizeClasses[size]}
        `}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-border p-5">
          <div className="min-w-0 flex-1">
            <h2
              id={generatedTitleId}
              className="text-xl font-semibold text-foreground"
            >
              {title}
            </h2>

            {subtitle && (
              <p
                id={generatedDescriptionId}
                className="mt-1 text-sm text-foreground-muted"
              >
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {headerActions}

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Close panel"
              onClick={onClose}
            >
              <X className="size-5" />
            </Button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {children}
        </div>

        {footer && (
          <footer className="flex shrink-0 flex-wrap justify-end gap-3 border-t border-border p-5">
            {footer}
          </footer>
        )}
      </aside>
    </div>
  );
}