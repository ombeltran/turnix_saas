"use client";

import { useState, type SubmitEvent } from "react";

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
  const isEditing = employee !== null;

  return (
    <SidePanel
      open={open}
      title={isEditing ? "Edit employee" : "Add employee"}
      subtitle={
        isEditing
          ? "Update employee details, services and queue station."
          : "Add a team member and connect them to services and turns."
      }
      size="md"
      onClose={onClose}
      footer={
        <div className="flex w-full justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" form={formId}>
            {isEditing ? "Save changes" : "Add employee"}
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
      role: role.trim() || "Team member",
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
      <FormField label="Full name" required>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Employee name"
          className={inputClassName}
          required
        />
      </FormField>

      <FormField label="Role">
        <input
          value={role}
          onChange={(event) => setRole(event.target.value)}
          placeholder="Senior stylist, barber..."
          className={inputClassName}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Email">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@business.com"
            className={inputClassName}
          />
        </FormField>

        <FormField label="Phone">
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="(201) 555-0100"
            className={inputClassName}
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Queue station">
          <select
            value={station}
            onChange={(event) => setStation(event.target.value)}
            className={inputClassName}
          >
            <option>Station 1</option>
            <option>Station 2</option>
            <option>Station 3</option>
            <option>Station 4</option>
            <option>Floating</option>
          </select>
        </FormField>

        <FormField label="Status">
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as EmployeeStatus)
            }
            className={inputClassName}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-foreground">
          Assigned services
        </legend>
        <p className="mt-1 text-xs text-foreground-muted">
          Only matching services should be assigned to this employee in appointments and turns.
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
