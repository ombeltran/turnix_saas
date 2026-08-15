"use client";

import { useState, type SubmitEvent } from "react";
import { useTranslations } from "next-intl";

import { SidePanel } from "@/components/shared/side-panel";
import { Button } from "@/components/ui/button";
import type {
  Employee,
  EmployeeAvailability,
  EmployeeStatus,
} from "@/mocks/employees";
import { services } from "@/mocks/services";

type EmployeeFormPanelProps = {
  open: boolean;
  employee: Employee | null;
  onClose: () => void;
  onSave: (employee: Employee) => void;
};

const formId = "employee-form";

export function EmployeeFormPanel({
  open,
  employee,
  onClose,
  onSave,
}: EmployeeFormPanelProps) {
  const t = useTranslations("employees");
  const common = useTranslations("common");
  const isEditing = employee !== null;

  return (
    <SidePanel
      open={open}
      title={isEditing ? t("editEmployee") : t("addEmployee")}
      subtitle={
        isEditing
          ? t("editDescription")
          : t("createDescription")
      }
      size="md"
      onClose={onClose}
      footer={
        <div className="flex w-full justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            {common("cancel")}
          </Button>

          <Button type="submit" form={formId}>
            {isEditing ? common("saveChanges") : t("addEmployee")}
          </Button>
        </div>
      }
    >
      {open ? (
        <EmployeeFormContent
          key={employee?.id ?? "new-employee"}
          employee={employee}
          onClose={onClose}
          onSave={onSave}
        />
      ) : null}
    </SidePanel>
  );
}

type EmployeeFormContentProps = {
  employee: Employee | null;
  onClose: () => void;
  onSave: (employee: Employee) => void;
};

function EmployeeFormContent({
  employee,
  onClose,
  onSave,
}: EmployeeFormContentProps) {
  const t = useTranslations("employees");
  const common = useTranslations("common");
  const [name, setName] = useState(employee?.name ?? "");
  const [role, setRole] = useState(employee?.role ?? "");
  const [email, setEmail] = useState(employee?.email ?? "");
  const [phone, setPhone] = useState(employee?.phone ?? "");
  const [station, setStation] = useState(employee?.station ?? "Station 1");
  const [status, setStatus] = useState<EmployeeStatus>(
    employee?.status ?? "active",
  );
  const [serviceIds, setServiceIds] = useState<string[]>(
    employee?.serviceIds ?? [],
  );

  function toggleService(serviceId: string) {
    setServiceIds((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId],
    );
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    const initials = trimmedName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");

    const availability: EmployeeAvailability =
      status === "inactive"
        ? "offline"
        : employee?.availability === "busy"
          ? "busy"
          : "available";

    onSave({
      id: employee?.id ?? `EMP-${Date.now()}`,
      name: trimmedName,
      role: role.trim() || t("teamMember"),
      email: email.trim(),
      phone: phone.trim(),
      initials,
      serviceIds,
      station,
      status,
      availability,
      appointmentsToday: employee?.appointmentsToday ?? 0,
      completedTurnsToday: employee?.completedTurnsToday ?? 0,
    });

    onClose();
  }

  return (
    <form id={formId} className="space-y-6" onSubmit={handleSubmit}>
      <FormField label={t("fullName")} required>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t("namePlaceholder")}
          className={inputClassName}
          required
        />
      </FormField>

      <FormField label={t("role")}>
        <input
          value={role}
          onChange={(event) => setRole(event.target.value)}
          placeholder={t("rolePlaceholder")}
          className={inputClassName}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={t("email")}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t("emailPlaceholder")}
            className={inputClassName}
          />
        </FormField>

        <FormField label={t("phone")}>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder={t("phonePlaceholder")}
            className={inputClassName}
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label={t("queueStation")}>
          <select
            value={station}
            onChange={(event) => setStation(event.target.value)}
            className={inputClassName}
          >
            <option value="Station 1">{t("station", { number: 1 })}</option>
            <option value="Station 2">{t("station", { number: 2 })}</option>
            <option value="Station 3">{t("station", { number: 3 })}</option>
            <option value="Station 4">{t("station", { number: 4 })}</option>
            <option value="Floating">{t("floating")}</option>
          </select>
        </FormField>

        <FormField label={t("status")}>
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as EmployeeStatus)
            }
            className={inputClassName}
          >
            <option value="active">{common("active")}</option>
            <option value="inactive">{common("inactive")}</option>
          </select>
        </FormField>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-foreground">
          {t("assignedServices")}
        </legend>
        <p className="mt-1 text-xs text-foreground-muted">
          {t("assignedServicesDescription")}
        </p>

        <div className="mt-3 grid gap-2">
          {services.map((service) => (
            <label
              key={service.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-surface-muted"
            >
              <input
                type="checkbox"
                checked={serviceIds.includes(service.id)}
                onChange={() => toggleService(service.id)}
                className="size-4 accent-primary"
              />

              <span className="text-sm font-medium text-foreground">
                {service.name}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

function FormField({ label, required, children }: FormFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

const inputClassName =
  "h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground-subtle focus:border-primary focus:ring-2 focus:ring-primary/15";
