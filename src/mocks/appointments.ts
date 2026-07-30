export type AppointmentStatus =
  | "confirmed"
  | "pending"
  | "arrived"
  | "inService"
  | "completed"
  | "cancelled";

export type Appointment = {
  id: string;
  time: string;
  customer: string;
  phone: string;
  service: string;
  employee: string;
  duration: string;
  price: number;
  status: AppointmentStatus;
};

export const appointments: Appointment[] = [
  {
    id: "APT-1001",
    time: "9:00 AM",
    customer: "Laura Martínez",
    phone: "(201) 555-0142",
    service: "Haircut & Styling",
    employee: "Sofia Ramirez",
    duration: "45 min",
    price: 55,
    status: "confirmed",
  },
  {
    id: "APT-1002",
    time: "9:45 AM",
    customer: "Michael Brown",
    phone: "(201) 555-0178",
    service: "Beard Trim",
    employee: "Carlos Méndez",
    duration: "30 min",
    price: 30,
    status: "arrived",
  },
  {
    id: "APT-1003",
    time: "10:30 AM",
    customer: "Emma Johnson",
    phone: "(201) 555-0186",
    service: "Hair Color",
    employee: "Sofia Ramirez",
    duration: "90 min",
    price: 120,
    status: "inService",
  },
  {
    id: "APT-1004",
    time: "11:15 AM",
    customer: "Ana Torres",
    phone: "(201) 555-0119",
    service: "Manicure",
    employee: "Valentina Ruiz",
    duration: "45 min",
    price: 45,
    status: "pending",
  },
  {
    id: "APT-1005",
    time: "12:00 PM",
    customer: "Daniel Wilson",
    phone: "(201) 555-0123",
    service: "Haircut",
    employee: "Carlos Méndez",
    duration: "40 min",
    price: 40,
    status: "completed",
  },
  {
    id: "APT-1006",
    time: "1:30 PM",
    customer: "Sara Gómez",
    phone: "(201) 555-0165",
    service: "Hair Treatment",
    employee: "Sofia Ramirez",
    duration: "60 min",
    price: 75,
    status: "cancelled",
  },
];