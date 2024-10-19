"use server";

import AppointmentsManager from "@/app/backend/business/appointments/AppointmentsManager";
import {
  IAppointment,
  IAppointmentQueryData,
} from "@/app/backend/business/treatments/data/AppointmentData";
import { INewAppointmentRequestData } from "@/app/backend/business/appointments/data/AppointmentData";

export const getAppointments = async (
  data: IAppointmentQueryData,
): Promise<IAppointment[]> => {
  return AppointmentsManager.getAppointments(data);
};

export async function scheduleAppointment(
  appointmentData: INewAppointmentRequestData,
): Promise<void> {
  return AppointmentsManager.scheduleAppointment(appointmentData);
}
