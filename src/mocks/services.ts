export type ServiceStatus = "active" | "inactive";

export type ServiceCategory =
  | "hair"
  | "nails"
  | "barber"
  | "beauty"
  | "other";

export type Service = {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  duration: number;
  price: number;
  status: ServiceStatus;
  appointmentsCount: number;
};

export const services: Service[] = [
  {
    id: "SRV-001",
    name: "Women’s Haircut",
    description: "Consultation, haircut and basic styling.",
    category: "hair",
    duration: 60,
    price: 45,
    status: "active",
    appointmentsCount: 86,
  },
  {
    id: "SRV-002",
    name: "Men’s Haircut",
    description: "Classic or modern haircut with finishing.",
    category: "barber",
    duration: 30,
    price: 28,
    status: "active",
    appointmentsCount: 124,
  },
  {
    id: "SRV-003",
    name: "Hair Coloring",
    description: "Professional full-color application.",
    category: "hair",
    duration: 120,
    price: 95,
    status: "active",
    appointmentsCount: 42,
  },
  {
    id: "SRV-004",
    name: "Manicure",
    description: "Nail shaping, cuticle care and polish.",
    category: "nails",
    duration: 45,
    price: 35,
    status: "active",
    appointmentsCount: 68,
  },
  {
    id: "SRV-005",
    name: "Facial Treatment",
    description: "Cleansing and moisturizing facial treatment.",
    category: "beauty",
    duration: 60,
    price: 65,
    status: "inactive",
    appointmentsCount: 19,
  },
];