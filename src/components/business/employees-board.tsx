"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  CalendarCheck,
  CircleUserRound,
  MonitorCheck,
  Pencil,
  Plus,
  TicketCheck,
  UsersRound,
} from "lucide-react";

import { EmployeeFormPanel } from "./employee-form-panel";
import { EmptyState } from "@/components/shared/empty-state";
import { FilterChips } from "@/components/shared/filter-chips";
import { SearchInput } from "@/components/shared/search-input";
import { SectionHeader } from "@/components/shared/section-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusPill } from "@/components/shared/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  employees as initialEmployees,
  type Employee,
  type EmployeeStatus,
} from "@/mocks/employees";
import { initialQueue } from "@/mocks/queue";
import { services } from "@/mocks/services";

type EmployeeStatusFilter = "all" | EmployeeStatus;

export function EmployeesBoard() {
  const t = useTranslations("employees");
  const common = useTranslations("common");
  const [employeeList, setEmployeeList] =
    useState<Employee[]>(initialEmployees);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<EmployeeStatusFilter>("all");
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredEmployees = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return employeeList.filter((employee) => {
      const assignedServiceNames = employee.serviceIds
        .map((serviceId) => services.find((service) => service.id === serviceId)?.name)
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        employee.name.toLowerCase().includes(normalizedSearch) ||
        employee.role.toLowerCase().includes(normalizedSearch) ||
        employee.station.toLowerCase().includes(normalizedSearch) ||
        assignedServiceNames.includes(normalizedSearch);

      const matchesStatus =
        status === "all" || employee.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [employeeList, search, status]);

  const activeEmployees = employeeList.filter(
    (employee) => employee.status === "active",
  ).length;
  const availableEmployees = employeeList.filter(
    (employee) => employee.availability === "available",
  ).length;
  const appointmentsToday = employeeList.reduce(
    (total, employee) => total + employee.appointmentsToday,
    0,
  );
  const completedTurnsToday = employeeList.reduce(
    (total, employee) => total + employee.completedTurnsToday,
    0,
  );

  function openNewEmployeePanel() {
    setSelectedEmployee(null);
    setIsFormOpen(true);
  }

  function openEditEmployeePanel(employee: Employee) {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  }

  function closeEmployeePanel() {
    setIsFormOpen(false);
    setSelectedEmployee(null);
  }

  function saveEmployee(employee: Employee) {
    setEmployeeList((currentEmployees) => {
      const exists = currentEmployees.some(
        (currentEmployee) => currentEmployee.id === employee.id,
      );

      if (exists) {
        return currentEmployees.map((currentEmployee) =>
          currentEmployee.id === employee.id ? employee : currentEmployee,
        );
      }

      return [employee, ...currentEmployees];
    });
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title={t("totalEmployees")}
          value={employeeList.length}
          description={t("teamMembers")}
          icon={UsersRound}
          variant="primary"
        />
        <StatCard
          title={t("activeEmployees")}
          value={activeEmployees}
          description={t("availableForAssignments")}
          icon={CircleUserRound}
          variant="success"
        />
        <StatCard
          title={t("availableNow")}
          value={availableEmployees}
          description={t("readyForService")}
          icon={MonitorCheck}
          variant="info"
        />
        <StatCard
          title={t("completedTurns")}
          value={completedTurnsToday}
          description={t("scheduledToday", { count: appointmentsToday })}
          icon={TicketCheck}
          variant="warning"
        />
      </section>

      <Card>
        <CardHeader className="gap-4">
          <SectionHeader
            title={t("teamAssignments")}
            description={t("teamAssignmentsDescription")}
            action={
              <Button type="button" onClick={openNewEmployeePanel}>
                <Plus className="size-4" />
                {t("addEmployee")}
              </Button>
            }
          />

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder={t("searchPlaceholder")}
            />
            <FilterChips
              value={status}
              onChange={setStatus}
              options={[
                { value: "all", label: common("all") },
                { value: "active", label: common("active") },
                { value: "inactive", label: common("inactive") },
              ]}
              className="flex-none"
            />
          </div>
        </CardHeader>

        <CardContent>
          {filteredEmployees.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-275 border-collapse">
                <thead>
                  <tr className="border-b border-border text-left">
                    <TableHeader>{common("employee")}</TableHeader>
                    <TableHeader>{common("services")}</TableHeader>
                    <TableHeader>{t("queueStation")}</TableHeader>
                    <TableHeader>{t("currentTurn")}</TableHeader>
                    <TableHeader>{t("today")}</TableHeader>
                    <TableHeader>{common("status")}</TableHeader>
                    <th className="pb-3 pl-4 text-right text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                      {t("action")}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {filteredEmployees.map((employee) => {
                    const assignedServices = employee.serviceIds
                      .map((serviceId) =>
                        services.find((service) => service.id === serviceId),
                      )
                      .filter((service): service is NonNullable<typeof service> => Boolean(service));

                    const currentTurn = initialQueue.find(
                      (item) =>
                        item.employee === employee.name &&
                        (item.status === "called" || item.status === "inService"),
                    );

                    return (
                      <tr
                        key={employee.id}
                        className="transition-colors hover:bg-surface-muted"
                      >
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                              {employee.initials}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-foreground">
                                {employee.name}
                              </p>
                              <p className="mt-1 text-xs text-foreground-muted">
                                {employee.role}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex max-w-72 flex-wrap gap-1.5">
                            {assignedServices.length > 0 ? (
                              assignedServices.slice(0, 2).map((service) => (
                                <StatusPill key={service.id} variant="info">
                                  {service.name}
                                </StatusPill>
                              ))
                            ) : (
                              <span className="text-sm text-foreground-muted">
                                {t("noServicesAssigned")}
                              </span>
                            )}
                            {assignedServices.length > 2 ? (
                              <StatusPill>+{assignedServices.length - 2}</StatusPill>
                            ) : null}
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <MonitorCheck className="size-4 text-foreground-muted" />
                            {employee.station}
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          {currentTurn ? (
                            <div>
                              <p className="text-sm font-semibold text-primary">
                                {currentTurn.ticket}
                              </p>
                              <p className="mt-1 text-xs text-foreground-muted">
                                {currentTurn.customer}
                              </p>
                            </div>
                          ) : (
                            <span className="text-sm text-foreground-muted">
                              {t("noActiveTurn")}
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 text-sm text-foreground">
                            <CalendarCheck className="size-4 text-foreground-muted" />
                            {t("appointmentsToday", { count: employee.appointmentsToday })}
                          </div>
                          <p className="mt-1 text-xs text-foreground-muted">
                            {t("turnsCompletedCount", { count: employee.completedTurnsToday })}
                          </p>
                        </td>

                        <td className="px-4 py-4">
                          <EmployeeAvailabilityStatus employee={employee} />
                        </td>

                        <td className="py-4 pl-4 text-right">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditEmployeePanel(employee)}
                          >
                            <Pencil className="size-4" />
                            {common("edit")}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              icon={UsersRound}
              title={t("noEmployees")}
              description={t("noEmployeesDescription")}
              action={
                employeeList.length === 0 ? (
                  <Button type="button" onClick={openNewEmployeePanel}>
                    <Plus className="size-4" />
                    {t("addFirstEmployee")}
                  </Button>
                ) : undefined
              }
            />
          )}
        </CardContent>
      </Card>

      <EmployeeFormPanel
        open={isFormOpen}
        employee={selectedEmployee}
        onClose={closeEmployeePanel}
        onSave={saveEmployee}
      />
    </div>
  );
}

function EmployeeAvailabilityStatus({ employee }: { employee: Employee }) {
  const t = useTranslations("employees");
  const common = useTranslations("common");

  if (employee.status === "inactive") {
    return <StatusPill>{common("inactive")}</StatusPill>;
  }

  if (employee.availability === "busy") {
    return <StatusPill variant="warning">{t("attending")}</StatusPill>;
  }

  return <StatusPill variant="success">{common("available")}</StatusPill>;
}

type TableHeaderProps = {
  children: React.ReactNode;
};

function TableHeader({ children }: TableHeaderProps) {
  return (
    <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted first:pl-0">
      {children}
    </th>
  );
}
