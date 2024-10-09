export interface INewAppointmentRequest {
  treatmentsId: string[];
  timeSlotId: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
}

export interface IQueryAppointmentRequest {
  businessId: string;
  startDate: number;
  endDate: number;
}

export interface IAppointmentsResponse {
  day: string;
  dayInMillis: number;
  appointments: any[];
}
