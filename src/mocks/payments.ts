export type PaymentStatus =
  | "pending"
  | "completed"
  | "refunded";

export type PaymentMethod =
  | "cash"
  | "card"
  | "online";

export type Payment = {
  id: string;
  customer: string;
  service: string;
  employee: string;
  amount: number;
  tip: number;
  discount?: number;
  total: number;
  method?: PaymentMethod;
  status: PaymentStatus;
  time: string;
};

export const initialPayments: Payment[] = [
  {
    id: "PAY-1001",
    customer: "Emma Johnson",
    service: "Hair Color",
    employee: "Sofia Ramirez",
    amount: 120,
    tip: 0,
    total: 120,
    status: "pending",
    time: "10:30 AM",
  },
  {
    id: "PAY-1002",
    customer: "Michael Brown",
    service: "Beard Trim",
    employee: "Carlos Méndez",
    amount: 30,
    tip: 5,
    total: 35,
    method: "card",
    status: "completed",
    time: "9:45 AM",
  },
  {
    id: "PAY-1003",
    customer: "Laura Martínez",
    service: "Haircut & Styling",
    employee: "Sofia Ramirez",
    amount: 55,
    tip: 10,
    total: 65,
    method: "cash",
    status: "completed",
    time: "9:00 AM",
  },
  {
    id: "PAY-1004",
    customer: "Daniel Wilson",
    service: "Haircut",
    employee: "Carlos Méndez",
    amount: 40,
    tip: 8,
    total: 48,
    method: "online",
    status: "completed",
    time: "8:30 AM",
  },
  {
    id: "PAY-1005",
    customer: "Ana Torres",
    service: "Manicure",
    employee: "Valentina Ruiz",
    amount: 45,
    tip: 0,
    total: 45,
    status: "pending",
    time: "11:15 AM",
  },
];