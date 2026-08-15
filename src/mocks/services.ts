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
  imageUrl: string;
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
    imageUrl:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
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
    imageUrl:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
  },
];
