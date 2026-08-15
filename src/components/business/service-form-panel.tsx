"use client";

import { useState, type SubmitEvent } from "react";
import { useTranslations } from "next-intl";

import { SidePanel } from "@/components/shared/side-panel";
import { Button } from "@/components/ui/button";
import {
  type Service,
  type ServiceCategory,
  type ServiceStatus,
} from "@/mocks/services";

type ServiceFormPanelProps = {
  open: boolean;
  service: Service | null;
  onClose: () => void;
  onSave: (service: Service) => void;
};

type ServiceFormContentProps = {
  service: Service | null;
  onClose: () => void;
  onSave: (service: Service) => void;
};

const formId = "service-form";

export function ServiceFormPanel({
  open,
  service,
  onClose,
  onSave,
}: ServiceFormPanelProps) {
  const t = useTranslations("services");
  const common = useTranslations("common");
  const isEditing = service !== null;

  return (
    <SidePanel
      open={open}
      title={isEditing ? t("editService") : t("addService")}
      subtitle={
        isEditing
          ? t("updateService")
          : t("createService")
      }
      size="md"
      onClose={onClose}
      footer={
        <div className="flex w-full justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            {common("cancel")}
          </Button>

          <Button type="submit" form={formId}>
            {isEditing ? common("saveChanges") : t("addService")}
          </Button>
        </div>
      }
    >
      {open ? (
        <ServiceFormContent
          key={service?.id ?? "new-service"}
          service={service}
          onClose={onClose}
          onSave={onSave}
        />
      ) : null}
    </SidePanel>
  );
}

function ServiceFormContent({
  service,
  onClose,
  onSave,
}: ServiceFormContentProps) {
  const t = useTranslations("services");
  const common = useTranslations("common");
  const [name, setName] = useState(service?.name ?? "");
  const [description, setDescription] = useState(
    service?.description ?? "",
  );
  const [imageUrl, setImageUrl] = useState(service?.imageUrl ?? "");
  const [category, setCategory] = useState<ServiceCategory>(
    service?.category ?? "hair",
  );
  const [duration, setDuration] = useState(
    service?.duration.toString() ?? "30",
  );
  const [price, setPrice] = useState(
    service?.price.toString() ?? "0",
  );
  const [status, setStatus] = useState<ServiceStatus>(
    service?.status ?? "active",
  );

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

  const normalizedName = name.trim();
  const normalizedDescription = description.trim();
  const normalizedDuration = Number(duration);
  const normalizedPrice = Number(price);

  if (
    !normalizedName ||
    !Number.isFinite(normalizedDuration) ||
    normalizedDuration <= 0 ||
    !Number.isFinite(normalizedPrice) ||
    normalizedPrice < 0
  ) {
    return;
  }

  onSave({
    id: service?.id ?? `SRV-${Date.now()}`,
    name: normalizedName,
    description: normalizedDescription,
    category,
    duration: normalizedDuration,
    price: normalizedPrice,
    status,
    appointmentsCount: service?.appointmentsCount ?? 0,
    imageUrl: imageUrl.trim(),
  });

  onClose();
}

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      <FormField label={t("serviceName")} required>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t("serviceNamePlaceholder")}
          required
          autoFocus
          className={inputClasses}
        />
      </FormField>

      <FormField label={t("description")}>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder={t("descriptionPlaceholder")}
          rows={4}
          className={inputClasses}
        />
      </FormField>

      <FormField label={t("imageUrl")}>
        <input
          type="url"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder={t("imageUrlPlaceholder")}
          className={inputClasses}
        />
      </FormField>

      <FormField label={t("category")} required>
        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as ServiceCategory)
          }
          className={inputClasses}
        >
          <option value="hair">{t("categories.hair")}</option>
          <option value="barber">{t("categories.barber")}</option>
          <option value="nails">{t("categories.nails")}</option>
          <option value="beauty">{t("categories.beauty")}</option>
          <option value="other">{t("categories.other")}</option>
        </select>
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label={t("durationMinutes")} required>
          <input
            type="number"
            min="5"
            step="5"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            required
            className={inputClasses}
          />
        </FormField>

        <FormField label={t("price")} required>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
            className={inputClasses}
          />
        </FormField>
      </div>

      <FormField label={t("status")} required>
        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as ServiceStatus)
          }
          className={inputClasses}
        >
          <option value="active">{common("active")}</option>
          <option value="inactive">{common("inactive")}</option>
        </select>
      </FormField>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

function FormField({
  label,
  required = false,
  children,
}: FormFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">
        {label}

        {required ? (
          <span className="ml-1 text-destructive">*</span>
        ) : null}
      </span>

      {children}
    </label>
  );
}

const inputClasses =
  "min-h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-foreground-muted focus:border-primary focus:ring-2 focus:ring-primary/20";
