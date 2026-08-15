"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Bell,
  Building2,
  CalendarDays,
  Check,
  Clock3,
  CreditCard,
  Monitor,
  Palette,
  Save,
  UsersRound,
} from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";
import { LandingPageSettings } from "@/components/business/landing-page-settings";
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
import {
  readBusinessBranding,
  readBusinessProfile,
  saveBusinessBranding,
  saveBusinessProfile,
} from "@/lib/business-branding-storage";
import {
  defaultBusinessBranding,
  type BusinessBranding,
} from "@/types/business-branding";

type SettingsSection =
  | "business"
  | "landing"
  | "hours"
  | "appointments"
  | "queue"
  | "notifications"
  | "billing";

const sections: {
  id: SettingsSection;
  labelKey: "business" | "landing" | "hours" | "appointments" | "queue" | "notifications" | "subscription";
  icon: typeof Building2;
}[] = [
  { id: "business", labelKey: "business", icon: Building2 },
  { id: "landing", labelKey: "landing", icon: Palette },
  { id: "hours", labelKey: "hours", icon: Clock3 },
  { id: "appointments", labelKey: "appointments", icon: CalendarDays },
  { id: "queue", labelKey: "queue", icon: UsersRound },
  { id: "notifications", labelKey: "notifications", icon: Bell },
  { id: "billing", labelKey: "subscription", icon: CreditCard },
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
  const t = useTranslations("settings");
  const common = useTranslations("common");
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("business");
  const [business, setBusiness] = useState<BusinessSettings>(
    initialBusinessSettings,
  );
  const [branding, setBranding] = useState<BusinessBranding>(
    defaultBusinessBranding,
  );
  const [hours, setHours] = useState<BusinessHour[]>(initialBusinessHours);
  const [appointments, setAppointments] =
    useState<AppointmentSettings>(initialAppointmentSettings);
  const [queue, setQueue] =
    useState<QueueSettings>(initialQueueSettings);
  const [notifications, setNotifications] =
    useState<NotificationSettings>(initialNotificationSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setBranding(readBusinessBranding());
      setBusiness(readBusinessProfile());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function saveChanges() {
    saveBusinessBranding(branding);
    saveBusinessProfile(business);
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
        title={t("header")}
        description={t("headerDescription")}
        action={
          <Button onClick={saveChanges}>
            {saved ? (
              <>
                <Check className="size-4" />
                {common("saved")}
              </>
            ) : (
              <>
                <Save className="size-4" />
                {common("saveChanges")}
              </>
            )}
          </Button>
        }
      />

      {saved ? (
        <div className="flex items-center gap-3 rounded-xl border border-success/30 bg-success-background px-4 py-3 text-sm text-success">
          <Check className="size-5 shrink-0" />
          {t("saveSuccess")}
        </div>
      ) : null}

      <div className="grid min-w-0 gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        <Card className="h-fit overflow-hidden">
          <CardContent className="p-3">
            <nav className="flex gap-1 overflow-x-auto lg:block lg:space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const selected = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "flex w-auto shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition lg:w-full",
                      selected
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground-muted hover:bg-surface-hover hover:text-foreground",
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    {t(`sections.${section.labelKey}`)}
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        <div className="min-w-0">
          {activeSection === "business" ? (
            <Card>
              <CardHeader>
                <CardTitle>{t("business.title")}</CardTitle>
                <CardDescription>
                  {t("business.description")}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface-muted p-4 sm:flex-row sm:items-center">
                  <div className="flex size-16 items-center justify-center rounded-xl bg-primary text-xl font-semibold text-primary-foreground">
                    TB
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {t("business.logo")}
                    </p>
                    <p className="mt-1 text-sm text-foreground-muted">
                      {t("business.logoDescription")}
                    </p>
                  </div>

                  <Button variant="outline">{t("business.changeLogo")}</Button>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      {t("business.name")}
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
                      {t("business.category")}
                    </span>
                    <select
                      className={fieldClassName}
                      value={business.category}
                      onChange={(event) =>
                        updateBusiness("category", event.target.value)
                      }
                    >
                      <option value="Beauty salon">{t("business.categories.beautySalon")}</option>
                      <option value="Barbershop">{t("business.categories.barbershop")}</option>
                      <option value="Medical office">{t("business.categories.medicalOffice")}</option>
                      <option value="Professional services">{t("business.categories.professionalServices")}</option>
                      <option value="Other service business">{t("business.categories.other")}</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      {t("business.phone")}
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
                      {t("business.email")}
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
                      {t("business.address")}
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
                      {t("business.timezone")}
                    </span>
                    <select
                      className={fieldClassName}
                      value={business.timezone}
                      onChange={(event) =>
                        updateBusiness("timezone", event.target.value)
                      }
                    >
                      <option value="America/New_York">
                        {t("business.timezones.newYork")}
                      </option>
                      <option value="America/Chicago">
                        {t("business.timezones.chicago")}
                      </option>
                      <option value="America/Denver">
                        {t("business.timezones.denver")}
                      </option>
                      <option value="America/Los_Angeles">
                        {t("business.timezones.losAngeles")}
                      </option>
                      <option value="America/Bogota">
                        {t("business.timezones.bogota")}
                      </option>
                    </select>
                  </label>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {activeSection === "landing" ? (
            <LandingPageSettings
              branding={branding}
              setBranding={setBranding}
            />
          ) : null}

          {activeSection === "hours" ? (
            <Card>
              <CardHeader>
                <CardTitle>{t("hours.title")}</CardTitle>
                <CardDescription>
                  {t("hours.description")}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                {hours.map((item, index) => (
                  <div
                    key={item.day}
                    className="grid gap-3 border-b border-border py-4 last:border-b-0 sm:grid-cols-[140px_90px_1fr_24px_1fr] sm:items-center"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {t(`hours.days.${item.day.toLowerCase()}`)}
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
                      {item.enabled ? t("hours.open") : t("hours.closed")}
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
                <CardTitle>{t("appointments.title")}</CardTitle>
                <CardDescription>
                  {t("appointments.description")}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <SwitchField
                  checked={appointments.onlineBooking}
                  label={t("appointments.onlineBooking")}
                  description={t("appointments.onlineBookingDescription")}
                  onCheckedChange={(checked) =>
                    setAppointments((current) => ({
                      ...current,
                      onlineBooking: checked,
                    }))
                  }
                />

                <SwitchField
                  checked={appointments.allowWalkIns}
                  label={t("appointments.allowWalkIns")}
                  description={t("appointments.allowWalkInsDescription")}
                  onCheckedChange={(checked) =>
                    setAppointments((current) => ({
                      ...current,
                      allowWalkIns: checked,
                    }))
                  }
                />

                <SwitchField
                  checked={appointments.autoConfirm}
                  label={t("appointments.autoConfirm")}
                  description={t("appointments.autoConfirmDescription")}
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
                      {t("appointments.slotInterval")}
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
                      <option value="15">{common("minutes", { count: 15 })}</option>
                      <option value="30">{common("minutes", { count: 30 })}</option>
                      <option value="45">{common("minutes", { count: 45 })}</option>
                      <option value="60">{common("minutes", { count: 60 })}</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      {t("appointments.minimumNotice")}
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
                      <option value="0">{t("appointments.noMinimum")}</option>
                      <option value="1">{t("appointments.oneHour")}</option>
                      <option value="2">{t("appointments.twoHours")}</option>
                      <option value="24">{t("appointments.twentyFourHours")}</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      {t("appointments.cancellationWindow")}
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
                      <option value="2">{t("appointments.twoHours")}</option>
                      <option value="6">{t("appointments.sixHours")}</option>
                      <option value="12">{t("appointments.twelveHours")}</option>
                      <option value="24">{t("appointments.twentyFourHours")}</option>
                    </select>
                  </label>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {activeSection === "queue" ? (
            <Card>
              <CardHeader>
                <CardTitle>{t("queue.title")}</CardTitle>
                <CardDescription>
                  {t("queue.description")}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid gap-5 border-b border-border pb-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-foreground">
                      {t("queue.ticketPrefix")}
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
                      {t("queue.startingNumber")}
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
                  label={t("queue.showCustomerName")}
                  description={t("queue.showCustomerNameDescription")}
                  onCheckedChange={(checked) =>
                    setQueue((current) => ({
                      ...current,
                      showCustomerName: checked,
                    }))
                  }
                />

                <SwitchField
                  checked={queue.showEstimatedWait}
                  label={t("queue.showEstimatedWait")}
                  description={t("queue.showEstimatedWaitDescription")}
                  onCheckedChange={(checked) =>
                    setQueue((current) => ({
                      ...current,
                      showEstimatedWait: checked,
                    }))
                  }
                />

                <SwitchField
                  checked={queue.automaticCalling}
                  label={t("queue.automaticCalling")}
                  description={t("queue.automaticCallingDescription")}
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
                <CardTitle>{t("notifications.title")}</CardTitle>
                <CardDescription>
                  {t("notifications.description")}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <SwitchField
                  checked={notifications.emailConfirmations}
                  label={t("notifications.confirmations")}
                  description={t("notifications.confirmationsDescription")}
                  onCheckedChange={(checked) =>
                    setNotifications((current) => ({
                      ...current,
                      emailConfirmations: checked,
                    }))
                  }
                />

                <SwitchField
                  checked={notifications.emailReminders}
                  label={t("notifications.reminders")}
                  description={t("notifications.remindersDescription")}
                  onCheckedChange={(checked) =>
                    setNotifications((current) => ({
                      ...current,
                      emailReminders: checked,
                    }))
                  }
                />

                <SwitchField
                  checked={notifications.cancellationAlerts}
                  label={t("notifications.cancellations")}
                  description={t("notifications.cancellationsDescription")}
                  onCheckedChange={(checked) =>
                    setNotifications((current) => ({
                      ...current,
                      cancellationAlerts: checked,
                    }))
                  }
                />

                <SwitchField
                  checked={notifications.smsNotifications}
                  label={t("notifications.sms")}
                  description={t("notifications.smsDescription")}
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
                <CardHeader className="items-start justify-between gap-4 sm:flex-row">
                  <div>
                    <CardTitle>{t("subscription.title")}</CardTitle>
                    <CardDescription>
                      {t("subscription.description")}
                    </CardDescription>
                  </div>

                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {t("subscription.plan")}
                  </span>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      {
                        icon: CalendarDays,
                        title: t("subscription.onlineBooking"),
                        detail: t("subscription.active"),
                      },
                      {
                        icon: Monitor,
                        title: t("subscription.queueManagement"),
                        detail: t("subscription.active"),
                      },
                      {
                        icon: CreditCard,
                        title: t("subscription.payments"),
                        detail: t("subscription.active"),
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
                  <CardTitle>{t("subscription.summary")}</CardTitle>
                  <CardDescription>
                    {t("subscription.summaryDescription")}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="text-sm text-foreground-muted">
                      {t("subscription.monthlySubscription")}
                    </span>
                    <span className="font-semibold text-foreground">
                      $150.00
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="text-sm text-foreground-muted">
                      {t("subscription.nextBillingDate")}
                    </span>
                    <span className="font-medium text-foreground">
                      {t("subscription.nextBillingValue")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground-muted">
                      {t("subscription.paymentMethod")}
                    </span>
                    <span className="font-medium text-foreground">
                      {t("subscription.paymentMethodValue")}
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
