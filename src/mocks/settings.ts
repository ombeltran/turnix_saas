export type BusinessSettings = {
  name: string;
  category: string;
  phone: string;
  email: string;
  address: string;
  timezone: string;
};

export type BusinessHour = {
  day: string;
  enabled: boolean;
  open: string;
  close: string;
};

export type AppointmentSettings = {
  onlineBooking: boolean;
  allowWalkIns: boolean;
  autoConfirm: boolean;
  slotInterval: string;
  minimumNotice: string;
  cancellationWindow: string;
};

export type QueueSettings = {
  ticketPrefix: string;
  startingNumber: number;
  showCustomerName: boolean;
  showEstimatedWait: boolean;
  automaticCalling: boolean;
};

export type NotificationSettings = {
  emailConfirmations: boolean;
  emailReminders: boolean;
  cancellationAlerts: boolean;
  smsNotifications: boolean;
};

export const initialBusinessSettings: BusinessSettings = {
  name: "Turnix Beauty Studio",
  category: "Beauty salon",
  phone: "+1 (732) 555-0184",
  email: "hello@turnixbeauty.com",
  address: "125 Main Street, Carteret, NJ",
  timezone: "America/New_York",
};

export const initialBusinessHours: BusinessHour[] = [
  { day: "Monday", enabled: true, open: "09:00", close: "18:00" },
  { day: "Tuesday", enabled: true, open: "09:00", close: "18:00" },
  { day: "Wednesday", enabled: true, open: "09:00", close: "18:00" },
  { day: "Thursday", enabled: true, open: "09:00", close: "19:00" },
  { day: "Friday", enabled: true, open: "09:00", close: "19:00" },
  { day: "Saturday", enabled: true, open: "08:00", close: "17:00" },
  { day: "Sunday", enabled: false, open: "09:00", close: "14:00" },
];

export const initialAppointmentSettings: AppointmentSettings = {
  onlineBooking: true,
  allowWalkIns: true,
  autoConfirm: true,
  slotInterval: "30",
  minimumNotice: "2",
  cancellationWindow: "12",
};

export const initialQueueSettings: QueueSettings = {
  ticketPrefix: "A",
  startingNumber: 1,
  showCustomerName: true,
  showEstimatedWait: true,
  automaticCalling: false,
};

export const initialNotificationSettings: NotificationSettings = {
  emailConfirmations: true,
  emailReminders: true,
  cancellationAlerts: true,
  smsNotifications: false,
};
