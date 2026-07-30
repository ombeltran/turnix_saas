"use client";

import { useMemo, useState } from "react";
import {
  CalendarCheck,
  CircleDollarSign,
  Clock3,
  Layers3,
  Pencil,
  Plus,
  Scissors,
} from "lucide-react";

import { ServiceFormPanel } from "@/components/business/service-form-panel";
import { EmptyState } from "@/components/shared/empty-state";
import { FilterChips } from "@/components/shared/filter-chips";
import { SearchInput } from "@/components/shared/search-input";
import { SectionHeader } from "@/components/shared/section-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusPill } from "@/components/shared/status-pill";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  services as initialServices,
  type Service,
  type ServiceStatus,
} from "@/mocks/services";

type ServiceStatusFilter = "all" | ServiceStatus;

const categoryLabels: Record<Service["category"], string> = {
  hair: "Hair",
  barber: "Barber",
  nails: "Nails",
  beauty: "Beauty",
  other: "Other",
};

export function ServicesBoard() {
  const [serviceList, setServiceList] =
    useState<Service[]>(initialServices);
  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<ServiceStatusFilter>("all");
  const [selectedService, setSelectedService] =
    useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredServices = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return serviceList.filter((service) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        service.name.toLowerCase().includes(normalizedSearch) ||
        service.description.toLowerCase().includes(normalizedSearch) ||
        categoryLabels[service.category]
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        status === "all" || service.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, serviceList, status]);

  const activeServices = serviceList.filter(
    (service) => service.status === "active",
  ).length;

  const averageDuration =
    serviceList.length > 0
      ? Math.round(
          serviceList.reduce(
            (total, service) => total + service.duration,
            0,
          ) / serviceList.length,
        )
      : 0;

  const averagePrice =
    serviceList.length > 0
      ? serviceList.reduce(
          (total, service) => total + service.price,
          0,
        ) / serviceList.length
      : 0;

  const totalAppointments = serviceList.reduce(
    (total, service) => total + service.appointmentsCount,
    0,
  );

  function openNewServicePanel() {
    setSelectedService(null);
    setIsFormOpen(true);
  }

  function openEditServicePanel(service: Service) {
    setSelectedService(service);
    setIsFormOpen(true);
  }

  function closeServicePanel() {
    setIsFormOpen(false);
    setSelectedService(null);
  }

  function saveService(service: Service) {
    setServiceList((currentServices) => {
      const serviceExists = currentServices.some(
        (currentService) => currentService.id === service.id,
      );

      if (serviceExists) {
        return currentServices.map((currentService) =>
          currentService.id === service.id
            ? service
            : currentService,
        );
      }

      return [service, ...currentServices];
    });
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total services"
          value={serviceList.length}
          description="services in the catalog"
          icon={Layers3}
          variant="primary"
        />

        <StatCard
          title="Active services"
          value={activeServices}
          description="available for booking"
          icon={Scissors}
          variant="success"
        />

        <StatCard
          title="Average duration"
          value={`${averageDuration} min`}
          description="average service time"
          icon={Clock3}
          variant="info"
        />

        <StatCard
          title="Average price"
          value={`$${averagePrice.toFixed(2)}`}
          description={`${totalAppointments} appointments completed`}
          icon={CircleDollarSign}
          variant="warning"
        />
      </section>

      <Card>
        <CardHeader className="gap-4">
          <SectionHeader
            title="Service catalog"
            description="Manage services, prices and availability"
            action={
              <Button type="button" onClick={openNewServicePanel}>
                <Plus className="size-4" />
                Add service
              </Button>
            }
          />

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search services..."
            />

            <FilterChips
              value={status}
              onChange={setStatus}
              options={[
                { value: "all", label: "All" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
              className="flex-none"
            />
          </div>
        </CardHeader>

        <CardContent>
          {filteredServices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-225 border-collapse">
                <thead>
                  <tr className="border-b border-border text-left">
                    <TableHeader>Service</TableHeader>
                    <TableHeader>Category</TableHeader>
                    <TableHeader>Duration</TableHeader>
                    <TableHeader>Price</TableHeader>
                    <TableHeader>Appointments</TableHeader>
                    <TableHeader>Status</TableHeader>

                    <th className="pb-3 pl-4 text-right text-xs font-semibold uppercase tracking-wide text-foreground-muted">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {filteredServices.map((service) => (
                    <tr
                      key={service.id}
                      className="transition-colors hover:bg-surface-muted"
                    >
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Scissors className="size-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium text-foreground">
                              {service.name}
                            </p>

                            <p className="mt-1 max-w-sm truncate text-xs text-foreground-muted">
                              {service.description ||
                                "No description provided"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-foreground">
                        {categoryLabels[service.category]}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Clock3 className="size-4 text-foreground-muted" />
                          {service.duration} min
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm font-semibold text-foreground">
                        ${service.price.toFixed(2)}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <CalendarCheck className="size-4 text-foreground-muted" />
                          {service.appointmentsCount}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <StatusPill
                          variant={
                            service.status === "active"
                              ? "success"
                              : "default"
                          }
                        >
                          {service.status === "active"
                            ? "Active"
                            : "Inactive"}
                        </StatusPill>
                      </td>

                      <td className="py-4 pl-4 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            openEditServicePanel(service)
                          }
                        >
                          <Pencil className="size-4" />
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              icon={Scissors}
              title="No services found"
              description="Try changing the search or selected filter."
              action={
                serviceList.length === 0 ? (
                  <Button
                    type="button"
                    onClick={openNewServicePanel}
                  >
                    <Plus className="size-4" />
                    Add first service
                  </Button>
                ) : undefined
              }
            />
          )}
        </CardContent>
      </Card>

      <ServiceFormPanel
        open={isFormOpen}
        service={selectedService}
        onClose={closeServicePanel}
        onSave={saveService}
      />
    </div>
  );
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