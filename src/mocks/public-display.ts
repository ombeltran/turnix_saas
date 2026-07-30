export type DisplayTicketStatus = "called" | "waiting" | "inService";

export type DisplayTicket = {
  id: string;
  ticket: string;
  customer?: string;
  station?: string;
  status: DisplayTicketStatus;
};

export const currentTicket: DisplayTicket = {
  id: "DISPLAY-001",
  ticket: "A-012",
  customer: "Emma Johnson",
  station: "Station 2",
  status: "called",
};

export const waitingTickets: DisplayTicket[] = [
  {
    id: "DISPLAY-002",
    ticket: "A-014",
    status: "waiting",
  },
  {
    id: "DISPLAY-003",
    ticket: "A-015",
    status: "waiting",
  },
  {
    id: "DISPLAY-004",
    ticket: "A-016",
    status: "waiting",
  },
  {
    id: "DISPLAY-005",
    ticket: "A-017",
    status: "waiting",
  },
];

export const activeStations: DisplayTicket[] = [
  {
    id: "STATION-001",
    ticket: "A-011",
    customer: "Daniel Wilson",
    station: "Station 1",
    status: "inService",
  },
  {
    id: "STATION-002",
    ticket: "A-013",
    customer: "Michael Brown",
    station: "Station 3",
    status: "inService",
  },
];