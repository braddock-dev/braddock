"use server";

import AppointmentsManager from "@/app/backend/business/AppointmentsManager";
import {
  IAppointment,
  IAppointmentQueryData,
} from "@/app/backend/business/treatments/data/AppointmentData";

export const getAppointments = async (
  data: IAppointmentQueryData,
): Promise<IAppointment[]> => {
  return AppointmentsManager.getAppointments(data);
};
