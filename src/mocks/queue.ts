export type QueueStatus =
  | "waiting"
  | "called"
  | "inService"
  | "completed"
  | "absent";

export type QueueItem = {
  id: string;
  ticket: string;
  customer: string;
  service: string;
  employee?: string;
  arrivalTime: string;
  waitMinutes: number;
  status: QueueStatus;
  priority?: boolean;
};

export const initialQueue: QueueItem[] = [
  {
    id: "QUEUE-001",
    ticket: "A-014",
    customer: "Michael Brown",
    service: "Haircut",
    arrivalTime: "9:42 AM",
    waitMinutes: 18,
    status: "waiting",
  },
  {
    id: "QUEUE-002",
    ticket: "A-015",
    customer: "Ana Torres",
    service: "Manicure",
    arrivalTime: "9:48 AM",
    waitMinutes: 12,
    status: "waiting",
    priority: true,
  },
  {
    id: "QUEUE-003",
    ticket: "A-016",
    customer: "James Smith",
    service: "Beard Trim",
    arrivalTime: "9:55 AM",
    waitMinutes: 5,
    status: "waiting",
  },
  {
    id: "QUEUE-004",
    ticket: "A-013",
    customer: "Daniel Wilson",
    service: "Haircut & Styling",
    employee: "Carlos Méndez",
    arrivalTime: "9:30 AM",
    waitMinutes: 0,
    status: "inService",
  },
  {
    id: "QUEUE-005",
    ticket: "A-012",
    customer: "Emma Johnson",
    service: "Hair Treatment",
    employee: "Sofia Ramirez",
    arrivalTime: "9:15 AM",
    waitMinutes: 0,
    status: "called",
  },
];