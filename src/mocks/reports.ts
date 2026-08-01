export type ReportPeriod = "week" | "month" | "30days";

export type ReportMetric = {
  appointments: number;
  customers: number;
  revenue: number;
  averageTicket: number;
  appointmentsTrend: string;
  customersTrend: string;
  revenueTrend: string;
  ticketTrend: string;
};

export type TrendPoint = {
  label: string;
  appointments: number;
  revenue: number;
};

export type ServicePerformance = {
  id: string;
  name: string;
  appointments: number;
  revenue: number;
  share: number;
};

export type AppointmentStatusSummary = {
  status: "completed" | "cancelled" | "no-show" | "scheduled";
  label: string;
  value: number;
  percentage: number;
};

export type EmployeePerformance = {
  id: string;
  name: string;
  role: string;
  appointments: number;
  revenue: number;
  rating: number;
};

export type ReportDataset = {
  metric: ReportMetric;
  trend: TrendPoint[];
  services: ServicePerformance[];
  statuses: AppointmentStatusSummary[];
  employees: EmployeePerformance[];
  peakDay: string;
  peakTime: string;
};

export const reportData: Record<ReportPeriod, ReportDataset> = {
  week: {
    metric: {
      appointments: 126,
      customers: 112,
      revenue: 4785,
      averageTicket: 37.98,
      appointmentsTrend: "+12.4%",
      customersTrend: "+8.1%",
      revenueTrend: "+15.7%",
      ticketTrend: "+2.9%",
    },
    trend: [
      { label: "Mon", appointments: 14, revenue: 510 },
      { label: "Tue", appointments: 17, revenue: 635 },
      { label: "Wed", appointments: 16, revenue: 592 },
      { label: "Thu", appointments: 21, revenue: 785 },
      { label: "Fri", appointments: 24, revenue: 928 },
      { label: "Sat", appointments: 29, revenue: 1130 },
      { label: "Sun", appointments: 5, revenue: 205 },
    ],
    services: [
      { id: "service-1", name: "Haircut", appointments: 42, revenue: 1260, share: 33 },
      { id: "service-2", name: "Hair coloring", appointments: 24, revenue: 1560, share: 19 },
      { id: "service-3", name: "Beard trim", appointments: 22, revenue: 550, share: 17 },
      { id: "service-4", name: "Manicure", appointments: 20, revenue: 700, share: 16 },
      { id: "service-5", name: "Blow dry", appointments: 18, revenue: 715, share: 14 },
    ],
    statuses: [
      { status: "completed", label: "Completed", value: 102, percentage: 81 },
      { status: "scheduled", label: "Scheduled", value: 13, percentage: 10 },
      { status: "cancelled", label: "Cancelled", value: 7, percentage: 6 },
      { status: "no-show", label: "No-show", value: 4, percentage: 3 },
    ],
    employees: [
      { id: "employee-1", name: "Sofia Ramirez", role: "Senior stylist", appointments: 31, revenue: 1420, rating: 4.9 },
      { id: "employee-2", name: "Carlos Méndez", role: "Barber", appointments: 29, revenue: 1055, rating: 4.8 },
      { id: "employee-3", name: "Laura Torres", role: "Nail technician", appointments: 24, revenue: 850, rating: 4.9 },
      { id: "employee-4", name: "David Miller", role: "Stylist", appointments: 18, revenue: 690, rating: 4.7 },
    ],
    peakDay: "Saturday",
    peakTime: "2:00 PM – 5:00 PM",
  },
  month: {
    metric: {
      appointments: 514,
      customers: 438,
      revenue: 19840,
      averageTicket: 38.6,
      appointmentsTrend: "+9.8%",
      customersTrend: "+7.4%",
      revenueTrend: "+13.2%",
      ticketTrend: "+3.1%",
    },
    trend: [
      { label: "Week 1", appointments: 118, revenue: 4450 },
      { label: "Week 2", appointments: 124, revenue: 4695 },
      { label: "Week 3", appointments: 132, revenue: 5105 },
      { label: "Week 4", appointments: 140, revenue: 5590 },
    ],
    services: [
      { id: "service-1", name: "Haircut", appointments: 168, revenue: 5040, share: 33 },
      { id: "service-2", name: "Hair coloring", appointments: 103, revenue: 6695, share: 20 },
      { id: "service-3", name: "Beard trim", appointments: 88, revenue: 2200, share: 17 },
      { id: "service-4", name: "Manicure", appointments: 82, revenue: 2870, share: 16 },
      { id: "service-5", name: "Blow dry", appointments: 73, revenue: 3035, share: 14 },
    ],
    statuses: [
      { status: "completed", label: "Completed", value: 421, percentage: 82 },
      { status: "scheduled", label: "Scheduled", value: 46, percentage: 9 },
      { status: "cancelled", label: "Cancelled", value: 31, percentage: 6 },
      { status: "no-show", label: "No-show", value: 16, percentage: 3 },
    ],
    employees: [
      { id: "employee-1", name: "Sofia Ramirez", role: "Senior stylist", appointments: 128, revenue: 5860, rating: 4.9 },
      { id: "employee-2", name: "Carlos Méndez", role: "Barber", appointments: 119, revenue: 4385, rating: 4.8 },
      { id: "employee-3", name: "Laura Torres", role: "Nail technician", appointments: 101, revenue: 3560, rating: 4.9 },
      { id: "employee-4", name: "David Miller", role: "Stylist", appointments: 73, revenue: 2785, rating: 4.7 },
    ],
    peakDay: "Saturday",
    peakTime: "1:00 PM – 5:00 PM",
  },
  "30days": {
    metric: {
      appointments: 487,
      customers: 416,
      revenue: 18725,
      averageTicket: 38.45,
      appointmentsTrend: "+8.6%",
      customersTrend: "+6.9%",
      revenueTrend: "+11.8%",
      ticketTrend: "+2.6%",
    },
    trend: [
      { label: "Jul 2", appointments: 62, revenue: 2310 },
      { label: "Jul 7", appointments: 73, revenue: 2705 },
      { label: "Jul 12", appointments: 78, revenue: 2940 },
      { label: "Jul 17", appointments: 85, revenue: 3295 },
      { label: "Jul 22", appointments: 91, revenue: 3550 },
      { label: "Jul 31", appointments: 98, revenue: 3925 },
    ],
    services: [
      { id: "service-1", name: "Haircut", appointments: 159, revenue: 4770, share: 33 },
      { id: "service-2", name: "Hair coloring", appointments: 97, revenue: 6305, share: 20 },
      { id: "service-3", name: "Beard trim", appointments: 83, revenue: 2075, share: 17 },
      { id: "service-4", name: "Manicure", appointments: 77, revenue: 2695, share: 16 },
      { id: "service-5", name: "Blow dry", appointments: 71, revenue: 2880, share: 15 },
    ],
    statuses: [
      { status: "completed", label: "Completed", value: 399, percentage: 82 },
      { status: "scheduled", label: "Scheduled", value: 44, percentage: 9 },
      { status: "cancelled", label: "Cancelled", value: 29, percentage: 6 },
      { status: "no-show", label: "No-show", value: 15, percentage: 3 },
    ],
    employees: [
      { id: "employee-1", name: "Sofia Ramirez", role: "Senior stylist", appointments: 121, revenue: 5525, rating: 4.9 },
      { id: "employee-2", name: "Carlos Méndez", role: "Barber", appointments: 113, revenue: 4150, rating: 4.8 },
      { id: "employee-3", name: "Laura Torres", role: "Nail technician", appointments: 96, revenue: 3385, rating: 4.9 },
      { id: "employee-4", name: "David Miller", role: "Stylist", appointments: 69, revenue: 2630, rating: 4.7 },
    ],
    peakDay: "Saturday",
    peakTime: "2:00 PM – 5:00 PM",
  },
};
