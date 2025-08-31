import { AuthRoles } from "@/app/backend/business/auth/data/AuthDtos";

export type AppointmentStatusValue = "Active" | "CustomerDidNotAppear";

export interface INewAppointmentRequest {
  treatmentsId: string[];
  timeSlotId: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  requestedBy?: AuthRoles;
  employeeId: string;
  state?: AppointmentStatusValue;
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
