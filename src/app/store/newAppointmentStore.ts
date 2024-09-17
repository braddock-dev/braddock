import { create } from "zustand";
import { ITreatment } from "@/app/backend/business/treatments/data/TreatmentsData";

export interface INewAppointmentStore {
  treatments: ITreatment[];
  selectedTreatment?: string;
  selectedDaySlot?: number;
  selectedTimeSlot?: number;
  setSelectedDaySlot: (daySlot?: number) => void;
  setSelectedTimeSlot: (timeSlot?: number) => void;
  setSelectedTreatment: (treatment?: string) => void;
  setTreatments: (treatments: ITreatment[]) => void;
}

export const useNewAppointmentStore = create<INewAppointmentStore>((set) => ({
  treatments: [],
  selectedTreatment: undefined,
  selectedDaySlot: undefined,
  selectedTimeSlot: undefined,
  setSelectedTreatment: (treatment?: string) =>
    set({
      selectedTreatment: treatment,
      selectedDaySlot: undefined,
      selectedTimeSlot: undefined,
    }),
  setSelectedDaySlot: (daySlot?: number) => set({ selectedDaySlot: daySlot }),
  setSelectedTimeSlot: (timeSlot?: number) =>
    set({ selectedTimeSlot: timeSlot }),
  setTreatments: (treatments: ITreatment[]) => set({ treatments }),
}));

export const newAppointmentSelectors = {
  treatments: (state: INewAppointmentStore) => state.treatments,
  selectedTreatment: (state: INewAppointmentStore) => state.selectedTreatment,
  selectedDaySlot: (state: INewAppointmentStore) => state.selectedDaySlot,
  selectedTimeSlot: (state: INewAppointmentStore) => state.selectedTimeSlot,
};

export const newAppointmentActions = {
  setTreatments: (state: INewAppointmentStore) => state.setTreatments,
  setSelectedTreatment: (state: INewAppointmentStore) =>
    state.setSelectedTreatment,
  setSelectedDaySlot: (state: INewAppointmentStore) => state.setSelectedDaySlot,
  setSelectedTimeSlot: (state: INewAppointmentStore) =>
    state.setSelectedTimeSlot,
};
