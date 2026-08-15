import type { Dispatch, SetStateAction } from "react";
import { ExternalLink, ImageIcon, Palette } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BusinessBranding } from "@/types/business-branding";

type LandingPageSettingsProps = {
  branding: BusinessBranding;
  setBranding: Dispatch<SetStateAction<BusinessBranding>>;
};

const fieldClassName = `
  h-10 w-full rounded-lg border border-border-strong
  bg-background px-3 text-sm text-foreground outline-none transition
  placeholder:text-foreground-subtle
  focus:border-primary focus:ring-2 focus:ring-primary/20
`;

export function LandingPageSettings({
  branding,
  setBranding,
}: LandingPageSettingsProps) {
  const t = useTranslations("settings.landing");

  function updateBranding<K extends keyof BusinessBranding>(
    field: K,
    value: BusinessBranding[K],
  ) {
    setBranding((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="items-start justify-between gap-4 sm:flex-row">
          <div>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription>
              {t("description")}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => window.open("/booking", "_blank", "noopener,noreferrer")}
          >
            {t("openPublicPage")}
            <ExternalLink className="size-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-7">
          <section>
            <div className="mb-4 flex items-center gap-2">
              <ImageIcon className="size-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                {t("images")}
              </h3>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-foreground">
                  {t("logoUrl")}
                </span>
                <input
                  className={fieldClassName}
                  value={branding.logoUrl}
                  placeholder={t("logoPlaceholder")}
                  onChange={(event) =>
                    updateBranding("logoUrl", event.target.value)
                  }
                />
                <span className="block text-xs text-foreground-muted">
                  {t("logoHelp")}
                </span>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-foreground">
                  {t("coverImageUrl")}
                </span>
                <input
                  className={fieldClassName}
                  value={branding.heroImageUrl}
                  placeholder={t("coverPlaceholder")}
                  onChange={(event) =>
                    updateBranding("heroImageUrl", event.target.value)
                  }
                />
                <span className="block text-xs text-foreground-muted">
                  {t("coverHelp")}
                </span>
              </label>
            </div>
          </section>

          <section className="border-t border-border pt-6">
            <div className="mb-4 flex items-center gap-2">
              <Palette className="size-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                {t("colors")}
              </h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <ColorField
                label={t("primaryColor")}
                value={branding.primaryColor}
                onChange={(value) => updateBranding("primaryColor", value)}
              />
              <ColorField
                label={t("accentBackground")}
                value={branding.secondaryColor}
                onChange={(value) => updateBranding("secondaryColor", value)}
              />
              <ColorField
                label={t("buttonText")}
                value={branding.buttonTextColor}
                onChange={(value) => updateBranding("buttonTextColor", value)}
              />
            </div>
          </section>

          <section className="border-t border-border pt-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              {t("mainContent")}
            </h3>
            <div className="grid gap-5">
              <label className="space-y-2">
                <span className="text-sm font-medium text-foreground">
                  {t("mainTitle")}
                </span>
                <input
                  className={fieldClassName}
                  value={branding.heroTitle}
                  onChange={(event) =>
                    updateBranding("heroTitle", event.target.value)
                  }
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-foreground">
                  {t("descriptionLabel")}
                </span>
                <textarea
                  rows={3}
                  className="w-full resize-none rounded-lg border border-border-strong bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={branding.heroDescription}
                  onChange={(event) =>
                    updateBranding("heroDescription", event.target.value)
                  }
                />
              </label>

              <label className="max-w-md space-y-2">
                <span className="text-sm font-medium text-foreground">
                  {t("bookingButtonLabel")}
                </span>
                <input
                  className={fieldClassName}
                  value={branding.bookingButtonLabel}
                  onChange={(event) =>
                    updateBranding("bookingButtonLabel", event.target.value)
                  }
                />
              </label>
            </div>
          </section>

          <section className="border-t border-border pt-6">
            <h3 className="mb-1 text-sm font-semibold text-foreground">
              {t("visibleSections")}
            </h3>
            <VisibilityOption
              checked={branding.showServiceImages}
              label={t("showServiceImages")}
              description={t("showServiceImagesDescription")}
              onChange={(checked) =>
                updateBranding("showServiceImages", checked)
              }
            />
            <VisibilityOption
              checked={branding.showContactSection}
              label={t("showContact")}
              description={t("showContactDescription")}
              onChange={(checked) =>
                updateBranding("showContactSection", checked)
              }
            />
          </section>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <div
          className="relative min-h-64 bg-cover bg-center p-6 sm:p-8"
          style={{ backgroundImage: `url(${branding.heroImageUrl})` }}
        >
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative max-w-xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
              {t("preview")}
            </p>
            <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
              {branding.heroTitle}
            </h3>
            <p className="mt-3 text-sm leading-6 text-white/85">
              {branding.heroDescription}
            </p>
            <span
              className="mt-5 inline-flex h-10 items-center rounded-lg px-4 text-sm font-medium"
              style={{
                backgroundColor: branding.primaryColor,
                color: branding.buttonTextColor,
              }}
            >
              {branding.bookingButtonLabel}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span className="flex h-10 overflow-hidden rounded-lg border border-border-strong bg-background">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-full w-12 shrink-0 cursor-pointer border-0 bg-transparent p-1"
        />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3 text-sm uppercase text-foreground outline-none"
        />
      </span>
    </label>
  );
}

function VisibilityOption({
  checked,
  label,
  description,
  onChange,
}: {
  checked: boolean;
  label: string;
  description: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 border-b border-border py-4 last:border-b-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 size-4 accent-primary"
      />
      <span>
        <span className="block text-sm font-medium text-foreground">
          {label}
        </span>
        <span className="mt-1 block text-sm text-foreground-muted">
          {description}
        </span>
      </span>
    </label>
  );
}
