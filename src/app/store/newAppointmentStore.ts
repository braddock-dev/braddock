import { create } from "zustand";
import {
  IDaySlot,
  ITimeSlot,
  ITreatment,
} from "@/app/backend/business/treatments/data/TreatmentsData";

export interface INewAppointmentStore {
  treatments: ITreatment[];
  selectedTreatments: ITreatment[];
  selectedDaySlot?: IDaySlot;
  selectedTimeSlot?: ITimeSlot;
  phoneNumber: string;
  customerName: string;
  setSelectedDaySlot: (daySlot?: IDaySlot) => void;
  setSelectedTimeSlot: (timeSlot?: ITimeSlot) => void;
  setSelectedTreatment: (treatment?: ITreatment[]) => void;
  setTreatments: (treatments: ITreatment[]) => void;
  setPhoneNumber: (phone: string) => void;
  setCustomerName: (name: string) => void;
}

export const useNewAppointmentStore = create<INewAppointmentStore>((set) => ({
  treatments: [],
  selectedTreatments: [],
  selectedDaySlot: undefined,
  selectedTimeSlot: undefined,
  phoneNumber: "",
  customerName: "",
  setPhoneNumber: (phone: string) => set({ phoneNumber: phone }),
  setCustomerName: (name: string) => set({ customerName: name }),
  setSelectedTreatment: (treatment?: ITreatment[]) =>
    set({
      selectedTreatments: treatment,
      selectedDaySlot: undefined,
      selectedTimeSlot: undefined,
    }),
  setSelectedDaySlot: (daySlot?: IDaySlot) => set({ selectedDaySlot: daySlot }),
  setSelectedTimeSlot: (timeSlot?: ITimeSlot) =>
    set({ selectedTimeSlot: timeSlot }),
  setTreatments: (treatments: ITreatment[]) => set({ treatments }),
}));

export const newAppointmentSelectors = {
  treatments: (state: INewAppointmentStore) => state.treatments,
  selectedTreatments: (state: INewAppointmentStore) => state.selectedTreatments,
  selectedTreatmentsIds: (state: INewAppointmentStore) =>
    state.selectedTreatments.map((treatment) => treatment.id),
  selectedDaySlot: (state: INewAppointmentStore) => state.selectedDaySlot,
  selectedTimeSlot: (state: INewAppointmentStore) => state.selectedTimeSlot,
  customerName: (state: INewAppointmentStore) => state.customerName,
  phoneNumber: (state: INewAppointmentStore) => state.phoneNumber,
};

export const newAppointmentActions = {
  setTreatments: (state: INewAppointmentStore) => state.setTreatments,
  setSelectedTreatment: (state: INewAppointmentStore) =>
    state.setSelectedTreatment,
  setSelectedDaySlot: (state: INewAppointmentStore) => state.setSelectedDaySlot,
  setSelectedTimeSlot: (state: INewAppointmentStore) =>
    state.setSelectedTimeSlot,
  setPhoneNumber: (state: INewAppointmentStore) => state.setPhoneNumber,
  setCustomerName: (state: INewAppointmentStore) => state.setCustomerName,
};
