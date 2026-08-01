export type EmployeeStatus = "active" | "inactive";
export type EmployeeAvailability = "available" | "busy" | "offline";

export type Employee = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  initials: string;
  serviceIds: string[];
  station: string;
  status: EmployeeStatus;
  availability: EmployeeAvailability;
  appointmentsToday: number;
  completedTurnsToday: number;
};

export const employees: Employee[] = [
  {
    id: "EMP-001",
    name: "Sofia Ramirez",
    role: "Senior stylist",
    email: "sofia@turnixdemo.com",
    phone: "(201) 555-0148",
    initials: "SR",
    serviceIds: ["SRV-001", "SRV-003", "SRV-005"],
    station: "Station 1",
    status: "active",
    availability: "busy",
    appointmentsToday: 4,
    completedTurnsToday: 2,
  },
  {
    id: "EMP-002",
    name: "Carlos Méndez",
    role: "Barber",
    email: "carlos@turnixdemo.com",
    phone: "(201) 555-0127",
    initials: "CM",
    serviceIds: ["SRV-002"],
    station: "Station 2",
    status: "active",
    availability: "busy",
    appointmentsToday: 3,
    completedTurnsToday: 3,
  },
  {
    id: "EMP-003",
    name: "Valentina Ruiz",
    role: "Nail technician",
    email: "valentina@turnixdemo.com",
    phone: "(201) 555-0195",
    initials: "VR",
    serviceIds: ["SRV-004"],
    station: "Station 3",
    status: "active",
    availability: "available",
    appointmentsToday: 2,
    completedTurnsToday: 1,
  },
  {
    id: "EMP-004",
    name: "Andrea López",
    role: "Beauty specialist",
    email: "andrea@turnixdemo.com",
    phone: "(201) 555-0133",
    initials: "AL",
    serviceIds: ["SRV-005"],
    station: "Station 4",
    status: "inactive",
    availability: "offline",
    appointmentsToday: 0,
    completedTurnsToday: 0,
  },
];
