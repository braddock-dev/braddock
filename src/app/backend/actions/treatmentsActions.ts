"use server";

import TreatmentManager from "@/app/backend/business/treatments/TreatmentManager";
import {
  IDaySlot,
  ITreatment,
  ITreatmentFormData,
  SortOrder,
} from "@/app/backend/business/treatments/data/TreatmentsData";

export async function getTreatmentsList(
  operatorId: string,
  dir: SortOrder = SortOrder.ASC,
): Promise<ITreatment[]> {
  return TreatmentManager.getTreatments(dir, operatorId);
}

export async function getTreatmentTimeslots(
  treatmentId: string[],
  daysForward?: number,
): Promise<IDaySlot[]> {
  return TreatmentManager.getTreatmentTimeslots(treatmentId, daysForward);
}

export async function createTreatment(
  treatmentId: ITreatmentFormData,
): Promise<void> {
  return TreatmentManager.createTreatment(treatmentId);
}

export async function deleteTreatment(treatmentId: string): Promise<void> {
  return TreatmentManager.deleteTreatment(treatmentId);
}

export async function updateTreatment(
  treatmentId: string,
  treatmentData: ITreatmentFormData,
): Promise<void> {
  return TreatmentManager.updateTreatment(treatmentId, treatmentData);
}
