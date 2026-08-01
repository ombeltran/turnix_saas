"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Scissors,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { LanguageSelector } from "@/components/shared/language-selector";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { employees } from "@/mocks/employees";
import {
  bookingDates,
  bookingTimes,
  publicBusiness,
} from "@/mocks/public-booking";
import { services } from "@/mocks/services";

type BookingStep = 1 | 2 | 3 | 4;

type CustomerForm = {
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const categoryIcons = {
  hair: Scissors,
  barber: Scissors,
  nails: Sparkles,
  beauty: Sparkles,
  other: Star,
};

const fieldClassName = `
  h-11 w-full rounded-lg border border-border-strong bg-background px-3
  text-sm text-foreground outline-none transition
  placeholder:text-foreground-subtle
  focus:border-primary focus:ring-2 focus:ring-primary/20
`;

export function BookingLanding() {
  const t = useTranslations("booking");
  const common = useTranslations("common");

  const activeServices = useMemo(
    () => services.filter((service) => service.status === "active"),
    [],
  );

  const [step, setStep] = useState<BookingStep>(1);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("any");
  const [selectedDate, setSelectedDate] = useState(bookingDates[0]?.id ?? "");
  const [selectedTime, setSelectedTime] = useState("");
  const [customer, setCustomer] = useState<CustomerForm>({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [confirmed, setConfirmed] = useState(false);

  const selectedService = activeServices.find(
    (service) => service.id === selectedServiceId,
  );

  const eligibleEmployees = employees.filter(
    (employee) =>
      employee.status === "active" &&
      employee.serviceIds.includes(selectedServiceId),
  );

  const selectedEmployee = employees.find(
    (employee) => employee.id === selectedEmployeeId,
  );

  const selectedDateData = bookingDates.find(
    (date) => date.id === selectedDate,
  );

  const canContinue =
    (step === 1 && Boolean(selectedServiceId)) ||
    (step === 2 && Boolean(selectedDate) && Boolean(selectedTime)) ||
    step === 3;

  function goNext() {
    if (!canContinue || step >= 3) {
      return;
    }

    setStep((current) => (current + 1) as BookingStep);
  }

  function goBack() {
    if (step <= 1) {
      return;
    }

    setStep((current) => (current - 1) as BookingStep);
  }

  function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!customer.name.trim() || !customer.phone.trim() || !customer.email.trim()) {
      return;
    }

    setConfirmed(true);
    setStep(4);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground">
              {publicBusiness.initials}
            </span>
            <span>
              <span className="block text-sm font-semibold text-foreground">
                {publicBusiness.name}
              </span>
              <span className="block text-xs text-foreground-muted">
                {t("brandTagline")}
              </span>
            </span>
          </a>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section
        id="top"
        className="relative overflow-hidden border-b border-border"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--surface-hover),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground-muted shadow-(--shadow-sm)">
              <Sparkles className="size-4 text-primary" />
              {t("eyebrow")}
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("heroTitle")}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-foreground-muted sm:text-lg">
              {t("heroDescription")}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#booking"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-base font-medium text-primary-foreground transition hover:bg-primary-hover"
              >
                <CalendarDays className="size-5" />
                {t("bookNow")}
              </a>

              <a
                href="#services"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border-strong bg-surface px-5 text-base font-medium text-foreground transition hover:bg-surface-hover"
              >
                {t("viewServices")}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground-muted">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-success" />
                {t("instantConfirmation")}
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-success" />
                {t("chooseProfessional")}
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-success" />
                {t("noAccountRequired")}
              </span>
            </div>
          </div>

          <Card className="overflow-hidden border-border-strong shadow-(--shadow-lg)">
            <div className="bg-primary p-6 text-primary-foreground">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-primary-foreground/80">
                    {t("todayAt")}
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold">
                    {publicBusiness.name}
                  </h2>
                </div>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  {t("openToday")}
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/10 p-4">
                  <Clock3 className="size-5" />
                  <p className="mt-3 text-xs text-primary-foreground/70">
                    {t("hoursToday")}
                  </p>
                  <p className="mt-1 font-semibold">{publicBusiness.todayHours}</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <MapPin className="size-5" />
                  <p className="mt-3 text-xs text-primary-foreground/70">
                    {t("location")}
                  </p>
                  <p className="mt-1 font-semibold">Carteret, NJ</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm font-semibold text-foreground">
                {t("popularServices")}
              </p>
              <div className="mt-4 space-y-3">
                {activeServices.slice(0, 3).map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between gap-4 rounded-xl bg-surface-muted p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {service.name}
                      </p>
                      <p className="mt-1 text-xs text-foreground-muted">
                        {t("serviceMeta", {
                          duration: service.duration,
                          price: service.price,
                        })}
                      </p>
                    </div>
                    <ArrowRight className="size-4 text-foreground-subtle" />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {t("servicesEyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            {t("servicesTitle")}
          </h2>
          <p className="mt-3 text-foreground-muted">
            {t("servicesDescription")}
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {activeServices.map((service) => {
            const Icon = categoryIcons[service.category];

            return (
              <Card key={service.id} className="p-5 transition hover:-translate-y-0.5 hover:shadow-(--shadow-md)">
                <div className="flex size-11 items-center justify-center rounded-xl bg-info-background text-info">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 font-semibold text-foreground">
                  {service.name}
                </h3>
                <p className="mt-2 min-h-10 text-sm leading-5 text-foreground-muted">
                  {service.description}
                </p>
                <div className="mt-5 flex items-end justify-between gap-3 border-t border-border pt-4">
                  <span className="text-sm text-foreground-muted">
                    {t("minutes", { count: service.duration })}
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    ${service.price}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="booking" className="border-y border-border bg-surface-muted/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {t("bookingEyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                {t("bookingTitle")}
              </h2>
              <p className="mt-3 text-foreground-muted">
                {t("bookingDescription")}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((number) => (
                <div key={number}>
                  <div
                    className={cn(
                      "h-1.5 rounded-full transition",
                      number <= step ? "bg-primary" : "bg-border",
                    )}
                  />
                  <p className="mt-2 hidden text-center text-xs text-foreground-muted sm:block">
                    {t(`steps.${number}`)}
                  </p>
                </div>
              ))}
            </div>

            <Card className="mt-6 overflow-hidden shadow-(--shadow-md)">
              {step === 1 ? (
                <div className="p-5 sm:p-7">
                  <h3 className="text-xl font-semibold text-foreground">
                    {t("selectServiceTitle")}
                  </h3>
                  <p className="mt-2 text-sm text-foreground-muted">
                    {t("selectServiceDescription")}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {activeServices.map((service) => {
                      const selected = selectedServiceId === service.id;
                      const Icon = categoryIcons[service.category];

                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => {
                            setSelectedServiceId(service.id);
                            setSelectedEmployeeId("any");
                            setSelectedTime("");
                          }}
                          className={cn(
                            "flex items-start gap-4 rounded-xl border p-4 text-left transition",
                            selected
                              ? "border-primary bg-info-background ring-2 ring-primary/20"
                              : "border-border bg-surface hover:border-border-strong hover:bg-surface-hover",
                          )}
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-primary">
                            <Icon className="size-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-start justify-between gap-3">
                              <span className="font-medium text-foreground">
                                {service.name}
                              </span>
                              <span className="font-semibold text-foreground">
                                ${service.price}
                              </span>
                            </span>
                            <span className="mt-1 block text-sm text-foreground-muted">
                              {t("minutes", { count: service.duration })}
                            </span>
                          </span>
                          {selected ? (
                            <Check className="size-5 shrink-0 text-primary" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="p-5 sm:p-7">
                  <h3 className="text-xl font-semibold text-foreground">
                    {t("chooseTimeTitle")}
                  </h3>
                  <p className="mt-2 text-sm text-foreground-muted">
                    {t("chooseTimeDescription")}
                  </p>

                  <div className="mt-6">
                    <label className="text-sm font-medium text-foreground">
                      {t("professional")}
                    </label>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      <button
                        type="button"
                        onClick={() => setSelectedEmployeeId("any")}
                        className={cn(
                          "rounded-xl border p-4 text-left transition",
                          selectedEmployeeId === "any"
                            ? "border-primary bg-info-background ring-2 ring-primary/20"
                            : "border-border bg-surface hover:bg-surface-hover",
                        )}
                      >
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <UserRound className="size-5" />
                        </div>
                        <p className="mt-3 text-sm font-medium text-foreground">
                          {t("anyProfessional")}
                        </p>
                        <p className="mt-1 text-xs text-foreground-muted">
                          {t("fastestAvailability")}
                        </p>
                      </button>

                      {eligibleEmployees.map((employee) => (
                        <button
                          key={employee.id}
                          type="button"
                          onClick={() => setSelectedEmployeeId(employee.id)}
                          className={cn(
                            "rounded-xl border p-4 text-left transition",
                            selectedEmployeeId === employee.id
                              ? "border-primary bg-info-background ring-2 ring-primary/20"
                              : "border-border bg-surface hover:bg-surface-hover",
                          )}
                        >
                          <div className="flex size-10 items-center justify-center rounded-full bg-surface-muted text-sm font-semibold text-foreground">
                            {employee.initials}
                          </div>
                          <p className="mt-3 text-sm font-medium text-foreground">
                            {employee.name}
                          </p>
                          <p className="mt-1 text-xs text-foreground-muted">
                            {employee.role}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7">
                    <label className="text-sm font-medium text-foreground">
                      {t("date")}
                    </label>
                    <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                      {bookingDates.map((date) => (
                        <button
                          key={date.id}
                          type="button"
                          onClick={() => {
                            setSelectedDate(date.id);
                            setSelectedTime("");
                          }}
                          className={cn(
                            "rounded-xl border px-3 py-3 text-center transition",
                            selectedDate === date.id
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-surface text-foreground hover:bg-surface-hover",
                          )}
                        >
                          <span className="block text-xs opacity-80">
                            {date.weekday}
                          </span>
                          <span className="mt-1 block text-lg font-semibold">
                            {date.day}
                          </span>
                          <span className="block text-xs opacity-80">
                            {date.month}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7">
                    <label className="text-sm font-medium text-foreground">
                      {t("availableTimes")}
                    </label>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {bookingTimes.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "h-10 rounded-lg border text-sm font-medium transition",
                            selectedTime === time
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-surface text-foreground hover:bg-surface-hover",
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <form onSubmit={submitBooking} className="p-5 sm:p-7">
                  <h3 className="text-xl font-semibold text-foreground">
                    {t("detailsTitle")}
                  </h3>
                  <p className="mt-2 text-sm text-foreground-muted">
                    {t("detailsDescription")}
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-foreground">
                        {t("fullName")}
                      </span>
                      <input
                        required
                        className={fieldClassName}
                        value={customer.name}
                        placeholder={t("fullNamePlaceholder")}
                        onChange={(event) =>
                          setCustomer((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-foreground">
                        {t("phone")}
                      </span>
                      <input
                        required
                        className={fieldClassName}
                        value={customer.phone}
                        placeholder={t("phonePlaceholder")}
                        onChange={(event) =>
                          setCustomer((current) => ({
                            ...current,
                            phone: event.target.value,
                          }))
                        }
                      />
                    </label>

                    <label className="space-y-2 sm:col-span-2">
                      <span className="text-sm font-medium text-foreground">
                        {t("email")}
                      </span>
                      <input
                        required
                        type="email"
                        className={fieldClassName}
                        value={customer.email}
                        placeholder={t("emailPlaceholder")}
                        onChange={(event) =>
                          setCustomer((current) => ({
                            ...current,
                            email: event.target.value,
                          }))
                        }
                      />
                    </label>

                    <label className="space-y-2 sm:col-span-2">
                      <span className="text-sm font-medium text-foreground">
                        {t("notes")}
                      </span>
                      <textarea
                        rows={3}
                        className="w-full resize-none rounded-lg border border-border-strong bg-background px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-foreground-subtle focus:border-primary focus:ring-2 focus:ring-primary/20"
                        value={customer.notes}
                        placeholder={t("notesPlaceholder")}
                        onChange={(event) =>
                          setCustomer((current) => ({
                            ...current,
                            notes: event.target.value,
                          }))
                        }
                      />
                    </label>
                  </div>

                  <div className="mt-6 rounded-xl border border-border bg-surface-muted p-4">
                    <p className="text-sm font-semibold text-foreground">
                      {t("summary")}
                    </p>
                    <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                      <div>
                        <dt className="text-foreground-muted">{t("service")}</dt>
                        <dd className="mt-1 font-medium text-foreground">
                          {selectedService?.name}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-foreground-muted">{t("professional")}</dt>
                        <dd className="mt-1 font-medium text-foreground">
                          {selectedEmployee?.name ?? t("anyProfessional")}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-foreground-muted">{t("date")}</dt>
                        <dd className="mt-1 font-medium text-foreground">
                          {selectedDateData
                            ? `${selectedDateData.weekday}, ${selectedDateData.month} ${selectedDateData.day}`
                            : "—"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-foreground-muted">{t("time")}</dt>
                        <dd className="mt-1 font-medium text-foreground">
                          {selectedTime}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <button type="submit" className="sr-only">
                    {t("confirmBooking")}
                  </button>
                </form>
              ) : null}

              {step === 4 && confirmed ? (
                <div className="px-5 py-12 text-center sm:px-8 sm:py-16">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success-background text-success">
                    <CheckCircle2 className="size-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-foreground">
                    {t("confirmationTitle")}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xl text-foreground-muted">
                    {t("confirmationDescription", {
                      name: customer.name,
                      service: selectedService?.name ?? "",
                    })}
                  </p>

                  <div className="mx-auto mt-7 max-w-lg rounded-xl border border-border bg-surface-muted p-5 text-left">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs text-foreground-muted">{t("date")}</p>
                        <p className="mt-1 font-medium text-foreground">
                          {selectedDateData
                            ? `${selectedDateData.weekday}, ${selectedDateData.month} ${selectedDateData.day}`
                            : "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground-muted">{t("time")}</p>
                        <p className="mt-1 font-medium text-foreground">
                          {selectedTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground-muted">{t("service")}</p>
                        <p className="mt-1 font-medium text-foreground">
                          {selectedService?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground-muted">{t("professional")}</p>
                        <p className="mt-1 font-medium text-foreground">
                          {selectedEmployee?.name ?? t("anyProfessional")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="mt-7"
                    onClick={() => {
                      setStep(1);
                      setConfirmed(false);
                      setSelectedServiceId("");
                      setSelectedEmployeeId("any");
                      setSelectedTime("");
                      setCustomer({ name: "", phone: "", email: "", notes: "" });
                    }}
                  >
                    {t("bookAnother")}
                  </Button>
                </div>
              ) : null}

              {step < 4 ? (
                <div className="flex items-center justify-between gap-3 border-t border-border bg-surface-muted/50 px-5 py-4 sm:px-7">
                  <Button
                    variant="outline"
                    disabled={step === 1}
                    onClick={goBack}
                  >
                    <ArrowLeft className="size-4" />
                    {common("back")}
                  </Button>

                  {step < 3 ? (
                    <Button disabled={!canContinue} onClick={goNext}>
                      {common("continue")}
                      <ArrowRight className="size-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      form=""
                      onClick={() => {
                        const form = document.querySelector<HTMLFormElement>(
                          "#booking form",
                        );
                        form?.requestSubmit();
                      }}
                    >
                      {t("confirmBooking")}
                      <Check className="size-4" />
                    </Button>
                  )}
                </div>
              ) : null}
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {t("visitEyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            {t("visitTitle")}
          </h2>
          <p className="mt-3 max-w-2xl text-foreground-muted">
            {t("visitDescription")}
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3 rounded-xl border border-border bg-surface p-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t("address")}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">
                  {publicBusiness.address}
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-border bg-surface p-4">
              <Clock3 className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t("hoursToday")}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">
                  {publicBusiness.todayHours}
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-border bg-surface p-4">
              <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t("phone")}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">
                  {publicBusiness.phone}
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-border bg-surface p-4">
              <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {t("email")}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">
                  {publicBusiness.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-72 overflow-hidden rounded-2xl border border-border bg-surface-muted shadow-(--shadow-sm)">
          <div className="flex h-full min-h-72 items-center justify-center bg-[radial-gradient(circle_at_center,var(--surface-hover),var(--surface-muted))] p-8 text-center">
            <div>
              <MapPin className="mx-auto size-10 text-primary" />
              <p className="mt-4 font-semibold text-foreground">
                {publicBusiness.name}
              </p>
              <p className="mt-2 text-sm text-foreground-muted">
                {publicBusiness.address}
              </p>
              <Button variant="outline" className="mt-5">
                {t("getDirections")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-foreground-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 {publicBusiness.name}. {t("rightsReserved")}</p>
          <p>{t("poweredBy")}</p>
        </div>
      </footer>
    </main>
  );
}
