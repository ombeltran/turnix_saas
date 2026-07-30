"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Customer } from "@/mocks/customers";
import { SidePanel } from "@/components/shared/side-panel";

type AddCustomerPanelProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (customer: Customer) => void;
};

type CustomerForm = {
  name: string;
  email: string;
  phone: string;
  preferredService: string;
  notes: string;
};

const initialForm: CustomerForm = {
  name: "",
  email: "",
  phone: "",
  preferredService: "",
  notes: "",
};

export function AddCustomerPanel({
  open,
  onClose,
  onAdd,
}: AddCustomerPanelProps) {
  const [form, setForm] =
    useState<CustomerForm>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CustomerForm, string>>
  >({});

  if (!open) {
    return null;
  }

  function updateField(
    field: keyof CustomerForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  function validateForm() {
    const nextErrors: Partial<
      Record<keyof CustomerForm, string>
    > = {};

    if (!form.name.trim()) {
      nextErrors.name = "Customer name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      nextErrors.email = "Enter a valid email.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const initials = form.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");

    const customer: Customer = {
      id: `CUS-${Date.now()}`,
      name: form.name.trim(),
      initials,
      email: form.email.trim(),
      phone: form.phone.trim(),
      status: "active",
      lastVisit: "No visits yet",
      totalVisits: 0,
      totalSpent: 0,
      preferredService:
        form.preferredService.trim() ||
        "Not specified",
      notes:
        form.notes.trim() ||
        "There are no notes for this customer.",
      visits: [],
    };

    onAdd(customer);
    setForm(initialForm);
    setErrors({});
    onClose();
  }

  function handleClose() {
    setForm(initialForm);
    setErrors({});
    onClose();
  }

  return (
  <SidePanel
    open={open}
    title="Add customer"
    subtitle="Create a new customer profile"
    size="md"
    onClose={handleClose}
    footer={
      <>
        <Button
          type="button"
          variant="outline"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          form="add-customer-form"
        >
          <UserPlus className="size-4" />
          Add customer
        </Button>
      </>
    }
  >
    <form
      id="add-customer-form"
      className="space-y-5"
      onSubmit={handleSubmit}
    >
      <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <UserPlus className="size-6" />
      </div>

      <FormField
        id="customer-name"
        label="Full name"
        required
        value={form.name}
        error={errors.name}
        placeholder="Example: Sarah Miller"
        onChange={(value) =>
          updateField("name", value)
        }
      />

      <FormField
        id="customer-email"
        label="Email"
        type="email"
        required
        value={form.email}
        error={errors.email}
        placeholder="sarah@example.com"
        onChange={(value) =>
          updateField("email", value)
        }
      />

      <FormField
        id="customer-phone"
        label="Phone number"
        type="tel"
        required
        value={form.phone}
        error={errors.phone}
        placeholder="(201) 555-0123"
        onChange={(value) =>
          updateField("phone", value)
        }
      />

      <FormField
        id="customer-service"
        label="Preferred service"
        value={form.preferredService}
        error={errors.preferredService}
        placeholder="Example: Haircut"
        onChange={(value) =>
          updateField(
            "preferredService",
            value
          )
        }
      />

      <div>
        <label
          htmlFor="customer-notes"
          className="text-sm font-medium text-foreground"
        >
          Notes
        </label>

        <textarea
          id="customer-notes"
          rows={5}
          value={form.notes}
          onChange={(event) =>
            updateField(
              "notes",
              event.target.value
            )
          }
          placeholder="Preferences, allergies or relevant information..."
          className="
            mt-2 w-full resize-none rounded-lg
            border border-border bg-background
            px-3 py-2 text-sm text-foreground
            outline-none transition
            placeholder:text-foreground-subtle
            focus:border-primary
            focus:ring-2 focus:ring-primary/20
          "
        />
      </div>
    </form>
  </SidePanel>
);
}

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  required?: boolean;
  type?: "text" | "email" | "tel";
  onChange: (value: string) => void;
};

function FormField({
  id,
  label,
  value,
  placeholder,
  error,
  required = false,
  type = "text",
  onChange,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-medium text-foreground"
      >
        {label}

        {required && (
          <span className="ml-1 text-danger">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${id}-error` : undefined
        }
        className={`
          mt-2 h-10 w-full rounded-lg border
          bg-background px-3 text-sm text-foreground
          outline-none transition
          placeholder:text-foreground-subtle
          focus:ring-2 focus:ring-primary/20
          ${
            error
              ? "border-danger"
              : "border-border focus:border-primary"
          }
        `}
      />

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-xs text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}