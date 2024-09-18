"use server";

import TreatmentManager from "@/app/backend/business/treatments/TreatmentManager";
import {
  IBaseNewAppointmentInfo,
  IDaySlot,
  ITreatment,
} from "@/app/backend/business/treatments/data/TreatmentsData";

export async function getTreatmentsList(): Promise<ITreatment[]> {
  return TreatmentManager.getTreatments();
}

export async function getTreatmentTimeslots(
  treatmentId: string[],
): Promise<IDaySlot[]> {
  return TreatmentManager.getTreatmentTimeslots(treatmentId);
}

export async function scheduleAppointment(
  appointmentData: IBaseNewAppointmentInfo,
): Promise<void> {
  return TreatmentManager.scheduleAppointment(appointmentData);
}
