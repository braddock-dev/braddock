"use server";

import TreatmentManager from "@/app/backend/business/treatments/TreatmentManager";
import { ITreatment } from "@/app/backend/business/treatments/data/TreatmentsData";

export async function getTreatmentsList(): Promise<ITreatment[]> {
  return TreatmentManager.getTreatments();
}
