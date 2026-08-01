"use client";

import { useState } from "react";
import {
  Bell,
  Building2,
  CalendarDays,
  Check,
  Clock3,
  CreditCard,
  Monitor,
  Save,
  UsersRound,
} from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  initialAppointmentSettings,
  initialBusinessHours,
  initialBusinessSettings,
  initialNotificationSettings,
  initialQueueSettings,
  type AppointmentSettings,
  type BusinessHour,
  type BusinessSettings,
  type NotificationSettings,
  type QueueSettings,
} from "@/mocks/settings";
import { cn } from "@/lib/utils";

type SettingsSection =
  | "business"
  | "hours"
  | "appointments"
  | "queue"
  | "notifications"
  | "billing";

const sections: {
  id: SettingsSection;
  label: string;
  icon: typeof Building2;
}[] = [
  { id: "business", label: "Business", icon: Building2 },
  { id: "hours", label: "Business hours", icon: Clock3 },
  { id: "appointments", label: "Appointments", icon: CalendarDays },
  { id: "queue", label: "Queue", icon: UsersRound },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Subscription", icon: CreditCard },
];

type SwitchFieldProps = {
  checked: boolean;
  label: string;
  description: string;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
};

function SwitchField({
  checked,
  label,
  description,
  disabled = false,
  onCheckedChange,
}: SwitchFieldProps) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-border py-4 last:border-b-0">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-sm leading-5 text-foreground-muted">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition",
          checked ? "bg-primary" : "bg-border-strong",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <span
          className={cn(
            "absolute top-1 size-4 rounded-full bg-white shadow-sm transition",
            checked ? "left-6" : "left-1",
          )}
        />
      </button>
    </div>
  );
}

const fieldClassName = `
  h-10 w-full rounded-lg border border-border-strong
  bg-background px-3 text-sm text-foreground outline-none transition
  placeholder:text-foreground-subtle
  focus:border-primary focus:ring-2 focus:ring-primary/20
`;

export function SettingsBoard() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("business");
  const [business, setBusiness] = useState<BusinessSettings>(
    initialBusinessSettings,
  );
  const [hours, setHours] = useState<BusinessHour[]>(initialBusinessHours);
  const [appointments, setAppointments] =
    useState<AppointmentSettings>(initialAppointmentSettings);
  const [queue, setQueue] =
    useState<QueueSettings>(initialQueueSettings);
  const [notifications, setNotifications] =
    useState<NotificationSettings>(initialNotificationSettings);
  const [saved, setSaved] = useState(false);

  function saveChanges() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  function updateBusiness<K extends keyof BusinessSettings>(
    field: K,
    value: BusinessSettings[K],
  ) {
    setBusiness((current) => ({ ...current, [field]: value }));
  }

  function updateHour(index: number, patch: Partial<BusinessHour>) {
    setHours((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...patch } : item,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Business settings"
        description="Manage how Turnix works for your business and customers."
        action={
          <Button onClick={saveChanges}>
            {saved ? (
              <>
                <Check className="size-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save changes
              </>
            )}
          </Button>
        }
      />

      {saved ? (
        <div className="flex items-center gap-3 rounded-xl border border-success/30 bg-success-background px-4 py-3 text-sm text-success">
          <Check className="size-5 shrink-0" />
          Changes saved successfully for this simulated demo.
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        <Card className="h-fit">
          <CardContent className="p-3">
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const selected = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition",
                      selected
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground-muted hover:bg-surface-hover hover:text-foreground",
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        <div>
          {activeSection === "business" ? (
            <Card>
              <CardHeader>
                <CardTitle>Business profile</CardTitle>
                <CardDescription>
                  Information displayed to customers in bookings and receipts.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface-muted p-4 sm:flex-row sm:items-center">
                  <div className="flex size-16 items-center justify-center rounded-xl bg-primary text-xl font-semibold text-primary-foreground">
                    TB
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-foreground">Business logo</p>
                    <p className="mt-1 text-sm text-foreground-muted">
                      Used on the booking page, display and receipts.
                    </p>
                  </div>

                  <Button variant="outline">Change logo</Button>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      Business name
                    </span>
                    <input
                      className={fieldClassName}
                      value={business.name}
                      onChange={(event) =>
                        updateBusiness("name", event.target.value)
                      }
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      Business category
                    </span>
                    <select
                      className={fieldClassName}
                      value={business.category}
                      onChange={(event) =>
                        updateBusiness("category", event.target.value)
                      }
                    >
                      <option>Beauty salon</option>
                      <option>Barbershop</option>
                      <option>Medical office</option>
                      <option>Professional services</option>
                      <option>Other service business</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      Phone
                    </span>
                    <input
                      className={fieldClassName}
                      value={business.phone}
                      onChange={(event) =>
                        updateBusiness("phone", event.target.value)
                      }
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      Email
                    </span>
                    <input
                      type="email"
                      className={fieldClassName}
                      value={business.email}
                      onChange={(event) =>
                        updateBusiness("email", event.target.value)
                      }
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-medium text-foreground">
                      Address
                    </span>
                    <input
                      className={fieldClassName}
                      value={business.address}
                      onChange={(event) =>
                        updateBusiness("address", event.target.value)
                      }
                    />
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-medium text-foreground">
                      Time zone
                    </span>
                    <select
                      className={fieldClassName}
                      value={business.timezone}
                      onChange={(event) =>
                        updateBusiness("timezone", event.target.value)
                      }
                    >
                      <option value="America/New_York">
                        Eastern Time — New York
                      </option>
                      <option value="America/Chicago">
                        Central Time — Chicago
                      </option>
                      <option value="America/Denver">
                        Mountain Time — Denver
                      </option>
                      <option value="America/Los_Angeles">
                        Pacific Time — Los Angeles
                      </option>
                      <option value="America/Bogota">
                        Colombia Time — Bogotá
                      </option>
                    </select>
                  </label>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {activeSection === "hours" ? (
            <Card>
              <CardHeader>
                <CardTitle>Business hours</CardTitle>
                <CardDescription>
                  Define when customers can book appointments or join the queue.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                {hours.map((item, index) => (
                  <div
                    key={item.day}
                    className="grid gap-3 border-b border-border py-4 last:border-b-0 sm:grid-cols-[140px_90px_1fr_24px_1fr] sm:items-center"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {item.day}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        updateHour(index, { enabled: !item.enabled })
                      }
                      className={cn(
                        "w-fit rounded-full px-3 py-1 text-xs font-semibold",
                        item.enabled
                          ? "bg-success-background text-success"
                          : "bg-surface-muted text-foreground-muted",
                      )}
                    >
                      {item.enabled ? "Open" : "Closed"}
                    </button>

                    <input
                      type="time"
                      disabled={!item.enabled}
                      value={item.open}
                      onChange={(event) =>
                        updateHour(index, { open: event.target.value })
                      }
                      className={cn(fieldClassName, "disabled:opacity-50")}
                    />

                    <span className="hidden text-center text-foreground-muted sm:block">
                      —
                    </span>

                    <input
                      type="time"
                      disabled={!item.enabled}
                      value={item.close}
                      onChange={(event) =>
                        updateHour(index, { close: event.target.value })
                      }
                      className={cn(fieldClassName, "disabled:opacity-50")}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : null}

          {activeSection === "appointments" ? (
            <Card>
              <CardHeader>
                <CardTitle>Appointment preferences</CardTitle>
                <CardDescription>
                  Configure the rules for your public booking experience.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <SwitchField
                  checked={appointments.onlineBooking}
                  label="Online booking"
                  description="Allow customers to schedule appointments from your public landing page."
                  onCheckedChange={(checked) =>
                    setAppointments((current) => ({
                      ...current,
                      onlineBooking: checked,
                    }))
                  }
                />

                <SwitchField
                  checked={appointments.allowWalkIns}
                  label="Allow walk-ins"
                  description="Enable staff to add customers without a previous appointment."
                  onCheckedChange={(checked) =>
                    setAppointments((current) => ({
                      ...current,
                      allowWalkIns: checked,
                    }))
                  }
                />

                <SwitchField
                  checked={appointments.autoConfirm}
                  label="Automatically confirm appointments"
                  description="New appointments are confirmed immediately without manual approval."
                  onCheckedChange={(checked) =>
                    setAppointments((current) => ({
                      ...current,
                      autoConfirm: checked,
                    }))
                  }
                />

                <div className="grid gap-5 pt-5 md:grid-cols-3">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      Time slot interval
                    </span>
                    <select
                      className={fieldClassName}
                      value={appointments.slotInterval}
                      onChange={(event) =>
                        setAppointments((current) => ({
                          ...current,
                          slotInterval: event.target.value,
                        }))
                      }
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      Minimum booking notice
                    </span>
                    <select
                      className={fieldClassName}
                      value={appointments.minimumNotice}
                      onChange={(event) =>
                        setAppointments((current) => ({
                          ...current,
                          minimumNotice: event.target.value,
                        }))
                      }
                    >
                      <option value="0">No minimum</option>
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="24">24 hours</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      Cancellation window
                    </span>
                    <select
                      className={fieldClassName}
                      value={appointments.cancellationWindow}
                      onChange={(event) =>
                        setAppointments((current) => ({
                          ...current,
                          cancellationWindow: event.target.value,
                        }))
                      }
                    >
                      <option value="2">2 hours</option>
                      <option value="6">6 hours</option>
                      <option value="12">12 hours</option>
                      <option value="24">24 hours</option>
                    </select>
                  </label>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {activeSection === "queue" ? (
            <Card>
              <CardHeader>
                <CardTitle>Queue preferences</CardTitle>
                <CardDescription>
                  Control ticket numbering and the information shown publicly.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid gap-5 border-b border-border pb-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      Ticket prefix
                    </span>
                    <input
                      maxLength={3}
                      className={fieldClassName}
                      value={queue.ticketPrefix}
                      onChange={(event) =>
                        setQueue((current) => ({
                          ...current,
                          ticketPrefix: event.target.value.toUpperCase(),
                        }))
                      }
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      Starting number
                    </span>
                    <input
                      type="number"
                      min={1}
                      className={fieldClassName}
                      value={queue.startingNumber}
                      onChange={(event) =>
                        setQueue((current) => ({
                          ...current,
                          startingNumber: Number(event.target.value),
                        }))
                      }
                    />
                  </label>
                </div>

                <SwitchField
                  checked={queue.showCustomerName}
                  label="Show customer name"
                  description="Display the customer name together with the ticket number."
                  onCheckedChange={(checked) =>
                    setQueue((current) => ({
                      ...current,
                      showCustomerName: checked,
                    }))
                  }
                />

                <SwitchField
                  checked={queue.showEstimatedWait}
                  label="Show estimated waiting time"
                  description="Display an estimated wait on the public queue screen."
                  onCheckedChange={(checked) =>
                    setQueue((current) => ({
                      ...current,
                      showEstimatedWait: checked,
                    }))
                  }
                />

                <SwitchField
                  checked={queue.automaticCalling}
                  label="Automatic customer calling"
                  description="Automatically call the next compatible customer when a station becomes available."
                  onCheckedChange={(checked) =>
                    setQueue((current) => ({
                      ...current,
                      automaticCalling: checked,
                    }))
                  }
                />
              </CardContent>
            </Card>
          ) : null}

          {activeSection === "notifications" ? (
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Choose which customer and business notifications are sent.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <SwitchField
                  checked={notifications.emailConfirmations}
                  label="Appointment confirmations"
                  description="Send an email when an appointment is created or confirmed."
                  onCheckedChange={(checked) =>
                    setNotifications((current) => ({
                      ...current,
                      emailConfirmations: checked,
                    }))
                  }
                />

                <SwitchField
                  checked={notifications.emailReminders}
                  label="Appointment reminders"
                  description="Send a reminder before the scheduled appointment."
                  onCheckedChange={(checked) =>
                    setNotifications((current) => ({
                      ...current,
                      emailReminders: checked,
                    }))
                  }
                />

                <SwitchField
                  checked={notifications.cancellationAlerts}
                  label="Cancellation alerts"
                  description="Notify the business when a customer cancels an appointment."
                  onCheckedChange={(checked) =>
                    setNotifications((current) => ({
                      ...current,
                      cancellationAlerts: checked,
                    }))
                  }
                />

                <SwitchField
                  checked={notifications.smsNotifications}
                  label="SMS notifications"
                  description="Available after connecting an SMS provider."
                  disabled
                  onCheckedChange={(checked) =>
                    setNotifications((current) => ({
                      ...current,
                      smsNotifications: checked,
                    }))
                  }
                />
              </CardContent>
            </Card>
          ) : null}

          {activeSection === "billing" ? (
            <div className="space-y-5">
              <Card>
                <CardHeader className="flex-row items-start justify-between gap-4">
                  <div>
                    <CardTitle>Subscription</CardTitle>
                    <CardDescription>
                      Current subscription and activated Turnix services.
                    </CardDescription>
                  </div>

                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Business
                  </span>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      {
                        icon: CalendarDays,
                        title: "Online booking",
                        detail: "Active",
                      },
                      {
                        icon: Monitor,
                        title: "Queue management",
                        detail: "Active",
                      },
                      {
                        icon: CreditCard,
                        title: "Payments",
                        detail: "Active",
                      },
                    ].map((module) => {
                      const Icon = module.icon;

                      return (
                        <div
                          key={module.title}
                          className="rounded-xl border border-border bg-surface-muted p-4"
                        >
                          <div className="flex size-10 items-center justify-center rounded-lg bg-info-background text-info">
                            <Icon className="size-5" />
                          </div>

                          <p className="mt-4 font-medium text-foreground">
                            {module.title}
                          </p>
                          <p className="mt-1 text-sm font-medium text-success">
                            {module.detail}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription summary</CardTitle>
                  <CardDescription>
                    Simulated billing information for the frontend prototype.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="text-sm text-foreground-muted">
                      Monthly subscription
                    </span>
                    <span className="font-semibold text-foreground">
                      $150.00
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="text-sm text-foreground-muted">
                      Next billing date
                    </span>
                    <span className="font-medium text-foreground">
                      September 1, 2026
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-muted">
                      Payment method
                    </span>
                    <span className="font-medium text-foreground">
                      Visa ending in 4242
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
