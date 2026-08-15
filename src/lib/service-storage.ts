import { services, type Service } from "@/mocks/services";

export const SERVICES_STORAGE_KEY = "turnix-services";

export function readServices(): Service[] {
  if (typeof window === "undefined") {
    return services;
  }

  try {
    const storedValue = window.localStorage.getItem(SERVICES_STORAGE_KEY);
    return storedValue ? (JSON.parse(storedValue) as Service[]) : services;
  } catch {
    return services;
  }
}

export function saveServices(serviceList: Service[]) {
  window.localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(serviceList));
}
