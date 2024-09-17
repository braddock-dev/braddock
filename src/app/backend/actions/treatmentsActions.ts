"use server";

import TreatmentManager from "@/app/backend/business/treatments/TreatmentManager";
import {
  IDaySlot,
  ITreatment,
} from "@/app/backend/business/treatments/data/TreatmentsData";

export async function getTreatmentsList(): Promise<ITreatment[]> {
  return TreatmentManager.getTreatments();
}

export async function getTreatmentTimeslots(
  treatmentId?: string,
): Promise<IDaySlot[]> {
  return TreatmentManager.getTreatmentTimeslots(treatmentId);
}
