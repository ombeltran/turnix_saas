export type CustomerStatus = "active" | "inactive";

export type CustomerVisit = {
  id: string;
  date: string;
  service: string;
  employee: string;
  amount: number;
};

export type Customer = {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  lastVisit: string;
  totalVisits: number;
  totalSpent: number;
  preferredService: string;
  notes?: string;
  visits: CustomerVisit[];
};

export const customers: Customer[] = [
  {
    id: "CUS-1001",
    name: "Emma Johnson",
    initials: "EJ",
    email: "emma.johnson@example.com",
    phone: "(201) 555-0142",
    status: "active",
    lastVisit: "Jul 29, 2026",
    totalVisits: 12,
    totalSpent: 845,
    preferredService: "Hair Color",
    notes: "Prefers afternoon appointments and warm hair tones.",
    visits: [
      {
        id: "VIS-1001",
        date: "Jul 29, 2026",
        service: "Hair Color",
        employee: "Sofia Ramirez",
        amount: 120,
      },
      {
        id: "VIS-1002",
        date: "Jun 18, 2026",
        service: "Haircut & Styling",
        employee: "Sofia Ramirez",
        amount: 65,
      },
      {
        id: "VIS-1003",
        date: "May 10, 2026",
        service: "Hair Color",
        employee: "Sofia Ramirez",
        amount: 115,
      },
    ],
  },
  {
    id: "CUS-1002",
    name: "Michael Brown",
    initials: "MB",
    email: "michael.brown@example.com",
    phone: "(908) 555-0181",
    status: "active",
    lastVisit: "Jul 29, 2026",
    totalVisits: 7,
    totalSpent: 265,
    preferredService: "Beard Trim",
    notes: "Usually books every three weeks.",
    visits: [
      {
        id: "VIS-1004",
        date: "Jul 29, 2026",
        service: "Beard Trim",
        employee: "Carlos Méndez",
        amount: 35,
      },
      {
        id: "VIS-1005",
        date: "Jul 5, 2026",
        service: "Haircut & Beard",
        employee: "Carlos Méndez",
        amount: 55,
      },
    ],
  },
  {
    id: "CUS-1003",
    name: "Laura Martínez",
    initials: "LM",
    email: "laura.martinez@example.com",
    phone: "(732) 555-0118",
    status: "active",
    lastVisit: "Jul 29, 2026",
    totalVisits: 18,
    totalSpent: 1260,
    preferredService: "Haircut & Styling",
    notes: "Frequent customer. Prefers Sofia.",
    visits: [
      {
        id: "VIS-1006",
        date: "Jul 29, 2026",
        service: "Haircut & Styling",
        employee: "Sofia Ramirez",
        amount: 65,
      },
      {
        id: "VIS-1007",
        date: "Jun 27, 2026",
        service: "Hair Treatment",
        employee: "Sofia Ramirez",
        amount: 85,
      },
      {
        id: "VIS-1008",
        date: "May 30, 2026",
        service: "Haircut & Styling",
        employee: "Sofia Ramirez",
        amount: 60,
      },
    ],
  },
  {
    id: "CUS-1004",
    name: "Daniel Wilson",
    initials: "DW",
    email: "daniel.wilson@example.com",
    phone: "(973) 555-0156",
    status: "active",
    lastVisit: "Jul 29, 2026",
    totalVisits: 5,
    totalSpent: 220,
    preferredService: "Haircut",
    visits: [
      {
        id: "VIS-1009",
        date: "Jul 29, 2026",
        service: "Haircut",
        employee: "Carlos Méndez",
        amount: 48,
      },
      {
        id: "VIS-1010",
        date: "Jun 12, 2026",
        service: "Haircut",
        employee: "Carlos Méndez",
        amount: 42,
      },
    ],
  },
  {
    id: "CUS-1005",
    name: "Ana Torres",
    initials: "AT",
    email: "ana.torres@example.com",
    phone: "(201) 555-0194",
    status: "active",
    lastVisit: "Jul 21, 2026",
    totalVisits: 9,
    totalSpent: 430,
    preferredService: "Manicure",
    notes: "Prefers text message reminders.",
    visits: [
      {
        id: "VIS-1011",
        date: "Jul 21, 2026",
        service: "Manicure",
        employee: "Valentina Ruiz",
        amount: 45,
      },
      {
        id: "VIS-1012",
        date: "Jun 29, 2026",
        service: "Manicure & Pedicure",
        employee: "Valentina Ruiz",
        amount: 75,
      },
    ],
  },
  {
    id: "CUS-1006",
    name: "Robert Davis",
    initials: "RD",
    email: "robert.davis@example.com",
    phone: "(848) 555-0175",
    status: "inactive",
    lastVisit: "Jan 14, 2026",
    totalVisits: 3,
    totalSpent: 105,
    preferredService: "Haircut",
    visits: [
      {
        id: "VIS-1013",
        date: "Jan 14, 2026",
        service: "Haircut",
        employee: "Carlos Méndez",
        amount: 35,
      },
    ],
  },
];