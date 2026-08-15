"use client";

import { useState } from "react";
import { CalendarDays, Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { services } from "@/mocks/services";
import { employees } from "@/mocks/employees";

export function NewAppointmentPanel() {
  const t = useTranslations("appointments");
  const common = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  function closePanel() {
    setIsOpen(false);
    setIsSaved(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaved(true);
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="size-4" />
        {t("newAppointment")}
      </Button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40"
          role="presentation"
          onMouseDown={closePanel}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-appointment-title"
            className="
              flex h-full w-full max-w-lg flex-col
              border-l border-border bg-surface
              shadow-2xl
            "
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="flex items-start justify-between gap-4 border-b border-border p-5">
              <div>
                <h2
                  id="new-appointment-title"
                  className="text-lg font-semibold text-foreground"
                >
                  {t("newAppointment")}
                </h2>

                <p className="mt-1 text-sm text-foreground-muted">
                  {t("newAppointmentDescription")}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                aria-label={common("close")}
                onClick={closePanel}
              >
                <X className="size-5" />
              </Button>
            </header>

            {isSaved ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-success-background text-success">
                  <CalendarDays className="size-8" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {t("appointmentCreated")}
                </h3>

                <p className="mt-2 max-w-sm text-sm text-foreground-muted">
                  {t("appointmentCreatedDescription")}
                </p>

                <Button className="mt-6" onClick={closePanel}>
                  {t("done")}
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex min-h-0 flex-1 flex-col"
              >
                <div className="flex-1 space-y-5 overflow-y-auto p-5">
                  <FormField label={t("customerName")}>
                    <input
                      required
                      name="customer"
                      placeholder={t("customerPlaceholder")}
                      className={fieldClasses}
                    />
                  </FormField>

                  <FormField label={t("phoneNumber")}>
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder={t("phonePlaceholder")}
                      className={fieldClasses}
                    />
                  </FormField>

                  <FormField label={common("service")}>
                    <select
                      required
                      name="service"
                      defaultValue=""
                      className={fieldClasses}
                    >
                      <option value="" disabled>
                        {t("selectService")}
                      </option>
                      {services
                        .filter((service) => service.status === "active")
                        .map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                    </select>
                  </FormField>

                  <FormField label={common("professional")}>
                    <select
                      required
                      name="employee"
                      defaultValue=""
                      className={fieldClasses}
                    >
                      <option value="" disabled>
                        {t("selectProfessional")}
                      </option>
                      {employees
                        .filter((employee) => employee.status === "active")
                        .map((employee) => (
                          <option key={employee.id} value={employee.id}>
                            {employee.name}
                          </option>
                        ))}
                    </select>
                  </FormField>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label={common("date")}>
                      <input
                        required
                        name="date"
                        type="date"
                        defaultValue="2026-07-29"
                        className={fieldClasses}
                      />
                    </FormField>

                    <FormField label={common("time")}>
                      <input
                        required
                        name="time"
                        type="time"
                        defaultValue="14:00"
                        className={fieldClasses}
                      />
                    </FormField>
                  </div>

                  <FormField label={common("notes")} optional>
                    <textarea
                      name="notes"
                      rows={4}
                      placeholder={t("notesPlaceholder")}
                      className={fieldClasses}
                    />
                  </FormField>
                </div>

                <footer className="flex justify-end gap-3 border-t border-border p-5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closePanel}
                  >
                    {common("cancel")}
                  </Button>

                  <Button type="submit">
                    {t("createAppointment")}
                  </Button>
                </footer>
              </form>
            )}
          </aside>
        </div>
      ) : null}
    </>
  );
}

type FormFieldProps = {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
};

function FormField({
  label,
  optional = false,
  children,
}: FormFieldProps) {
  const common = useTranslations("common");

  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
        {label}

        {optional ? (
          <span className="font-normal text-foreground-muted">
            {common("optional")}
          </span>
        ) : null}
      </span>

      {children}
    </label>
  );
}

const fieldClasses = `
  min-h-10 w-full rounded-lg border border-border-strong
  bg-background px-3 py-2 text-sm text-foreground
  outline-none transition
  placeholder:text-foreground-subtle
  focus:border-primary focus:ring-2 focus:ring-primary/20
`;
