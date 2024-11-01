import { create } from "zustand";
import {
  IDaySlot,
  ITimeSlot,
  ITreatment,
} from "@/app/backend/business/treatments/data/TreatmentsData";
import { IBaseNewAppointmentInfo } from "@/app/backend/business/appointments/data/AppointmentData";
import { IAppointment } from "@/app/backend/business/treatments/data/AppointmentData";
import { removePhoneNumberPrefix } from "@/app/utils/functions";
import { Constants } from "@/app/utils/Constants";

export interface INewAppointmentStore {
  treatments: ITreatment[];
  selectedTreatments: ITreatment[];
  selectedDaySlot?: IDaySlot;
  selectedTimeSlot?: ITimeSlot;
  phoneNumber: string;
  customerName: string;
  customerEmail: string;
  setSelectedDaySlot: (daySlot?: IDaySlot) => void;
  setSelectedTimeSlot: (timeSlot?: ITimeSlot) => void;
  setSelectedTreatment: (treatment?: ITreatment[]) => void;
  setTreatments: (treatments: ITreatment[]) => void;
  setCustomerInfo: (name: string, phone: string, email: string) => void;
  resetState: () => void;
  setAppointmentStore: (appointment: IAppointment) => void;
}

export const useNewAppointmentStore = create<INewAppointmentStore>((set) => ({
  treatments: [],
  selectedTreatments: [],
  selectedDaySlot: undefined,
  selectedTimeSlot: undefined,
  phoneNumber: "",
  customerName: "",
  customerEmail: "",
  setCustomerInfo: (name: string, phone: string, email: string) =>
    set({ customerName: name, phoneNumber: phone, customerEmail: email }),
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
  setAppointmentStore: (appointment: IAppointment) => {
    set({
      selectedTreatments: appointment.treatments,
      phoneNumber: removePhoneNumberPrefix(
        appointment.clientPhoneNumber,
        Constants.UI.PHONE_PREFIX.PT,
      ),
      customerName: appointment.clientName,
    });
  },
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
    customerEmail: state.customerEmail,
  }),
  isAppointmentValid: (state: INewAppointmentStore) => {
    return (
      state.selectedTreatments.length > 0 &&
      !!state.selectedDaySlot &&
      !!state.selectedTimeSlot &&
      !!state.customerName &&
      !!state.phoneNumber
    );
  },
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
  setAppointmentStore: (state: INewAppointmentStore) =>
    state.setAppointmentStore,
};
