import { ITreatment } from "@/app/backend/business/treatments/data/TreatmentsData";
import { TZDate } from "@toast-ui/calendar";

export interface IAppointment {
  businessId: string;
  id: string;
  clientName: string;
  clientPhoneNumber: string;
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

export type IEvent = {
  id: string;
  calendarId: string;
  title: string;
  category: string;
  start: TZDate;
  end: TZDate;
  isReadOnly: boolean;
};

export interface SelectDateTimeInfo {
  start: Date;
  end: Date;
  isAllday: boolean;
  nativeEvent?: MouseEvent;
  gridSelectionElements: Element[];
}
