import {
  IDaySlot,
  ITimeSlot,
  ITreatment,
} from "@/app/backend/business/treatments/data/TreatmentsData";

export interface IBaseNewAppointmentInfo {
  treatments: ITreatment[];
  selectedTreatments: ITreatment[];
  selectedDaySlot?: IDaySlot;
  selectedTimeSlot?: ITimeSlot;
  phoneNumber: string;
  customerName: string;
  customerEmail: string;
}

export interface INewAppointmentRequestData {
  selectedTreatments: ITreatment[];
  selectedTimeSlot?: ITimeSlot;
  phoneNumber: string;
  customerName: string;
  customerEmail: string;
}
