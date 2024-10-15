import { ITreatment } from "@/app/backend/business/treatments/data/TreatmentsData";

export interface IAppointment {
  businessId: string;
  id: string;
  clientName: string;
  startTimeInMillis: number;
  endTimeInMillis: number;
  createdAt: number;
  durationInMinutes: number;
  durationInHours: number;
  startTime: string;
  treatments: ITreatment[];
}

export interface IAppointmentQueryData {
  startDate?: number;
  endDate?: number;
}

export interface IEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  interactive: boolean;
  className?: string;
  editable: boolean;
  overlap: boolean;
  backgroundColor?: string;
  borderColor?: string;
}
