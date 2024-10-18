import { create } from "zustand";
import {
  IBaseNewAppointmentInfo,
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
  setCustomerInfo: (name: string, phone: string, email: string) => void;
  resetState: () => void;
}

export const useNewAppointmentStore = create<INewAppointmentStore>((set) => ({
  treatments: [],
  selectedTreatments: [],
  selectedDaySlot: undefined,
  selectedTimeSlot: undefined,
  phoneNumber: "",
  customerName: "",
  setCustomerInfo: (name: string, phone: string, email: string) =>
    set({ customerName: name, phoneNumber: phone }),
  setSelectedTreatment: (treatment?: ITreatment[]) =>
    set({
      selectedTreatments: treatment,
      selectedDaySlot: undefined,
      selectedTimeSlot: undefined,
    }),
  setSelectedDaySlot: (daySlot?: IDaySlot) => {
    set((state) => {
      if (daySlot?.dayInMillis === state.selectedDaySlot?.dayInMillis) {
        return {};
      }

      return {
        selectedDaySlot: daySlot,
        selectedTimeSlot: undefined,
      };
    });
  },
  setSelectedTimeSlot: (timeSlot?: ITimeSlot) =>
    set({ selectedTimeSlot: timeSlot }),
  setTreatments: (treatments: ITreatment[]) => set({ treatments }),
  resetState: () =>
    set({
      selectedTreatments: [],
      selectedDaySlot: undefined,
      selectedTimeSlot: undefined,
      phoneNumber: "",
      customerName: "",
    }),
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
  appointmentStore: (state: INewAppointmentStore): IBaseNewAppointmentInfo => ({
    treatments: state.treatments,
    selectedTreatments: state.selectedTreatments,
    selectedDaySlot: state.selectedDaySlot,
    selectedTimeSlot: state.selectedTimeSlot,
    phoneNumber: state.phoneNumber,
    customerName: state.customerName,
  }),
};

export const newAppointmentActions = {
  setTreatments: (state: INewAppointmentStore) => state.setTreatments,
  setSelectedTreatment: (state: INewAppointmentStore) =>
    state.setSelectedTreatment,
  setSelectedDaySlot: (state: INewAppointmentStore) => state.setSelectedDaySlot,
  setSelectedTimeSlot: (state: INewAppointmentStore) =>
    state.setSelectedTimeSlot,
  resetState: (state: INewAppointmentStore) => state.resetState,
  setCustomerInfo: (state: INewAppointmentStore) => state.setCustomerInfo,
};
