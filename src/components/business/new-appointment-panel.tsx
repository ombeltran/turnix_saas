"use client";

import { useState } from "react";
import { CalendarDays, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";

export function NewAppointmentPanel() {
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
        New appointment
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
                  New appointment
                </h2>

                <p className="mt-1 text-sm text-foreground-muted">
                  Schedule a service for a customer.
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Close panel"
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
                  Appointment created
                </h3>

                <p className="mt-2 max-w-sm text-sm text-foreground-muted">
                  The appointment was added successfully to today&apos;s
                  schedule.
                </p>

                <Button className="mt-6" onClick={closePanel}>
                  Done
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex min-h-0 flex-1 flex-col"
              >
                <div className="flex-1 space-y-5 overflow-y-auto p-5">
                  <FormField label="Customer name">
                    <input
                      required
                      name="customer"
                      placeholder="Enter customer name"
                      className={fieldClasses}
                    />
                  </FormField>

                  <FormField label="Phone number">
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="(201) 555-0123"
                      className={fieldClasses}
                    />
                  </FormField>

                  <FormField label="Service">
                    <select
                      required
                      name="service"
                      defaultValue=""
                      className={fieldClasses}
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      <option value="haircut">Haircut</option>
                      <option value="hair-color">Hair color</option>
                      <option value="beard-trim">Beard trim</option>
                      <option value="manicure">Manicure</option>
                      <option value="treatment">Hair treatment</option>
                    </select>
                  </FormField>

                  <FormField label="Professional">
                    <select
                      required
                      name="employee"
                      defaultValue=""
                      className={fieldClasses}
                    >
                      <option value="" disabled>
                        Select a professional
                      </option>
                      <option value="sofia">Sofia Ramirez</option>
                      <option value="carlos">Carlos Méndez</option>
                      <option value="valentina">Valentina Ruiz</option>
                    </select>
                  </FormField>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Date">
                      <input
                        required
                        name="date"
                        type="date"
                        defaultValue="2026-07-29"
                        className={fieldClasses}
                      />
                    </FormField>

                    <FormField label="Time">
                      <input
                        required
                        name="time"
                        type="time"
                        defaultValue="14:00"
                        className={fieldClasses}
                      />
                    </FormField>
                  </div>

                  <FormField label="Notes" optional>
                    <textarea
                      name="notes"
                      rows={4}
                      placeholder="Additional instructions..."
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
                    Cancel
                  </Button>

                  <Button type="submit">
                    Create appointment
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
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
        {label}

        {optional ? (
          <span className="font-normal text-foreground-muted">
            Optional
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