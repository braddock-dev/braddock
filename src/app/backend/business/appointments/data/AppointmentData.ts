import {
  IDaySlot,
  ITimeSlot,
  ITreatment,
} from "@/app/backend/business/treatments/data/TreatmentsData";
import { AuthRoles } from "@/app/backend/business/auth/data/AuthDtos";

export interface IBaseNewAppointmentInfo {
  treatments: ITreatment[];
  selectedTreatments: ITreatment[];
  selectedDaySlot?: IDaySlot;
  selectedTimeSlot?: ITimeSlot;
  phoneNumber: string;
  customerName: string;
  customerEmail: string;
  requestedBy?: AuthRoles;
}

export interface INewAppointmentRequestData {
  selectedTreatments: ITreatment[];
  selectedTimeSlot?: ITimeSlot;
  phoneNumber: string;
  customerName: string;
  customerEmail: string;
  requestedBy?: AuthRoles;
}

export interface IDateInterval {
  start: number;
  end: number;
}
