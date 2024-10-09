import { ITreatment } from "@/app/backend/business/treatments/data/TreatmentsData";

export interface IAppointment {
  businessId: string;
  id: string;
  clientName: string;
  startTimeInMillis: number;
  createdAt: number;
  durationInMinutes: number;
  startTime: string;
  treatments: ITreatment[];
}

export interface IAppointmentQueryData {
  startDate?: number;
  endDate?: number;
}
