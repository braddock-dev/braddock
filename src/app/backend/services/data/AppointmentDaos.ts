import { AuthRoles } from "@/app/backend/business/auth/data/AuthDtos";

export interface INewAppointmentRequest {
  treatmentsId: string[];
  timeSlotId: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  requestedBy?: AuthRoles;
  employeeId: string;
}

export interface IQueryAppointmentRequest {
  businessId: string;
  startDate: number;
  endDate: number;
  operatorId?: string;
}

export interface IAppointmentsResponse {
  day: string;
  dayInMillis: number;
  appointments: any[];
}
