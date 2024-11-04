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
  appointmentId?: string;
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
  recommendedDate?: Date;
  setRecommendedDate: (date: Date) => void;
}

export const useNewAppointmentStore = create<INewAppointmentStore>((set) => ({
  appointmentId: undefined,
  treatments: [],
  selectedTreatments: [],
  selectedDaySlot: undefined,
  selectedTimeSlot: undefined,
  recommendedDate: undefined,
  phoneNumber: "",
  customerName: "",
  customerEmail: "",
  setRecommendedDate: (date: Date) => set({ recommendedDate: date }),
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
      customerEmail: "",
      recommendedDate: undefined,
      appointmentId: undefined,
    }),
  setAppointmentStore: (appointment: IAppointment) => {
    set({
      selectedTreatments: appointment.treatments,
      phoneNumber: removePhoneNumberPrefix(
        appointment.clientPhoneNumber,
        Constants.UI.PHONE_PREFIX.PT,
      ),
      customerName: appointment.clientName,
      customerEmail: appointment.clientEmail,
      appointmentId: appointment.id,
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
  recommendedDate: (state: INewAppointmentStore) => state.recommendedDate,
  isRescheduleMode: (state: INewAppointmentStore) => !!state.appointmentId,
  appointmentId: (state: INewAppointmentStore) => state.appointmentId,
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

  isAppointmentValidWithoutCustomer: (state: INewAppointmentStore) => {
    return (
      state.selectedTreatments.length > 0 &&
      !!state.selectedDaySlot &&
      !!state.selectedTimeSlot
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
  setRecommendedDate: (state: INewAppointmentStore) => state.setRecommendedDate,
};
