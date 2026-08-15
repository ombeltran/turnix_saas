"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  CalendarDays,
  ChevronRight,
  DollarSign,
  UserCheck,
  UserPlus,
  UsersRound,
} from "lucide-react";

import { CustomerProfilePanel } from "@/components/business/customer-profile-panel";
import { CustomerStatusBadge } from "@/components/business/customer-status-badge";
import { StatCard } from "@/components/shared/stat-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  customers as initialCustomers,
  type Customer,
} from "@/mocks/customers";
import { AddCustomerPanel } from "@/components/business/add-customer-panel";
import { SearchInput } from "../shared/search-input";
import { FilterChips } from "../shared/filter-chips";
import { EmptyState } from "../shared/empty-state";
import { SectionHeader } from "../shared/section-header";

type CustomerStatusFilter = "all" | "active" | "inactive";

export function CustomersBoard() {
  const t = useTranslations("customers");
  const common = useTranslations("common");
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [customerList, setCustomerList] =
    useState<Customer[]>(initialCustomers);
  const [status, setStatus] = useState<CustomerStatusFilter>("all");
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return customerList.filter((customer) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        customer.name.toLowerCase().includes(normalizedSearch) ||
        customer.email.toLowerCase().includes(normalizedSearch) ||
        customer.phone.includes(normalizedSearch);

      const matchesStatus = status === "all" || customer.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [customerList, search, status]);

  const activeCustomers = customerList.filter(
    (customer) => customer.status === "active",
  ).length;

  const totalRevenue = customerList.reduce(
    (total, customer) => total + customer.totalSpent,
    0,
  );

  const totalVisits = customerList.reduce(
    (total, customer) => total + customer.totalVisits,
    0,
  );

  function addCustomer(customer: Customer) {
    setCustomerList((currentCustomers) => [customer, ...currentCustomers]);
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title={t("totalCustomers")}
          value={customerList.length}
          description={t("registeredCustomers")}
          icon={UsersRound}
          variant="primary"
        />

        <StatCard
          title={t("activeCustomers")}
          value={activeCustomers}
          description={t("recentActivity")}
          icon={UserCheck}
          variant="success"
        />

        <StatCard
          title={t("totalVisits")}
          value={totalVisits}
          description={t("recordedAppointments")}
          icon={CalendarDays}
          variant="info"
        />

        <StatCard
          title={t("customerRevenue")}
          value={`$${totalRevenue.toFixed(2)}`}
          description={t("historicalSpend")}
          icon={DollarSign}
          variant="warning"
        />
      </section>

      <Card>
        <CardHeader className="gap-4">
          <SectionHeader
            title={t("directory")}
            description={t("directoryDescription")}
            action={
              <Button type="button" onClick={() => setIsAddCustomerOpen(true)}>
                <UserPlus className="size-4" />
                {t("addCustomer")}
              </Button>
            }
          />

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <SearchInput value={search} onChange={setSearch} placeholder={t("searchPlaceholder")} />

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
          {filteredCustomers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-225 border-collapse">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                      {common("customer")}
                    </th>

                    <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                      {t("contact")}
                    </th>

                    <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                      {t("lastVisit")}
                    </th>

                    <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                      {t("visits")}
                    </th>

                    <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                      {t("totalSpent")}
                    </th>

                    <th className="px-4 pb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                      {common("status")}
                    </th>

                    <th className="pb-3 pl-4 text-right text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                      {t("action")}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="transition-colors hover:bg-surface-muted"
                    >
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                            {customer.initials}
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium text-foreground">
                              {customer.name}
                            </p>

                            <p className="mt-1 text-xs text-foreground-muted">
                              {customer.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <p className="text-sm text-foreground">
                          {customer.email}
                        </p>

                        <p className="mt-1 text-xs text-foreground-muted">
                          {customer.phone}
                        </p>
                      </td>

                      <td className="px-4 py-4 text-sm text-foreground">
                        {customer.lastVisit}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium text-foreground">
                        {customer.totalVisits}
                      </td>

                      <td className="px-4 py-4 text-sm font-semibold text-foreground">
                        ${customer.totalSpent.toFixed(2)}
                      </td>

                      <td className="px-4 py-4">
                        <CustomerStatusBadge status={customer.status} />
                      </td>

                      <td className="py-4 pl-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCustomer(customer)}
                        >
                          {t("view")}
                          <ChevronRight className="size-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              icon={UsersRound}
              title={t("noCustomers")}
              description={t("noCustomersDescription")}
            />
          )}
        </CardContent>
      </Card>

      <CustomerProfilePanel
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />

      <AddCustomerPanel
        open={isAddCustomerOpen}
        onClose={() => setIsAddCustomerOpen(false)}
        onAdd={addCustomer}
      />
    </div>
  );
}
