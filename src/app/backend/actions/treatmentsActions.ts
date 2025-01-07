"use server";

import TreatmentManager from "@/app/backend/business/treatments/TreatmentManager";
import {
  IDaySlot,
  ITreatment,
  ITreatmentFormData,
  SortOrder,
} from "@/app/backend/business/treatments/data/TreatmentsData";

export async function getTreatmentsList(
  dir: SortOrder = SortOrder.ASC,
): Promise<ITreatment[]> {
  return TreatmentManager.getTreatments(dir);
}

export async function getTreatmentTimeslots(
  treatmentId: string[],
): Promise<IDaySlot[]> {
  return TreatmentManager.getTreatmentTimeslots(treatmentId);
}

export async function createTreatment(
  treatmentId: ITreatmentFormData,
): Promise<void> {
  return TreatmentManager.createTreatment(treatmentId);
}
