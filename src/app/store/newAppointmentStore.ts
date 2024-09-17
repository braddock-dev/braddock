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
  setSelectedDaySlot: (daySlot?: IDaySlot) => void;
  setSelectedTimeSlot: (timeSlot?: ITimeSlot) => void;
  setSelectedTreatment: (treatment?: ITreatment[]) => void;
  setTreatments: (treatments: ITreatment[]) => void;
}

export const useNewAppointmentStore = create<INewAppointmentStore>((set) => ({
  treatments: [],
  selectedTreatments: [],
  selectedDaySlot: undefined,
  selectedTimeSlot: undefined,
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
};

export const newAppointmentActions = {
  setTreatments: (state: INewAppointmentStore) => state.setTreatments,
  setSelectedTreatment: (state: INewAppointmentStore) =>
    state.setSelectedTreatment,
  setSelectedDaySlot: (state: INewAppointmentStore) => state.setSelectedDaySlot,
  setSelectedTimeSlot: (state: INewAppointmentStore) =>
    state.setSelectedTimeSlot,
};
