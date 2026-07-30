"use client";

import { useState, type SubmitEvent } from "react";

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
  const isEditing = service !== null;

  return (
    <SidePanel
      open={open}
      title={isEditing ? "Edit service" : "Add service"}
      subtitle={
        isEditing
          ? "Update the service details and availability."
          : "Create a new service for your business."
      }
      size="md"
      onClose={onClose}
      footer={
        <div className="flex w-full justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" form={formId}>
            {isEditing ? "Save changes" : "Add service"}
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
  const [name, setName] = useState(service?.name ?? "");
  const [description, setDescription] = useState(
    service?.description ?? "",
  );
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
  });

  onClose();
}

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      <FormField label="Service name" required>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Example: Women’s Haircut"
          required
          autoFocus
          className={inputClasses}
        />
      </FormField>

      <FormField label="Description">
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Briefly describe what the service includes."
          rows={4}
          className={inputClasses}
        />
      </FormField>

      <FormField label="Category" required>
        <select
          value={category}
          onChange={(event) =>
            setCategory(event.target.value as ServiceCategory)
          }
          className={inputClasses}
        >
          <option value="hair">Hair</option>
          <option value="barber">Barber</option>
          <option value="nails">Nails</option>
          <option value="beauty">Beauty</option>
          <option value="other">Other</option>
        </select>
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Duration (minutes)" required>
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

        <FormField label="Price" required>
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

      <FormField label="Status" required>
        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as ServiceStatus)
          }
          className={inputClasses}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
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