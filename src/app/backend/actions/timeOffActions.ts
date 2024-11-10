"use server";

import TimeOffManager from "@/app/backend/business/time-off/TimeOffManager";
import { NewTimeOffRequest } from "@/app/backend/services/data/TimeOffDaos";

export async function registerTimeOff(data: NewTimeOffRequest) {
  return TimeOffManager.registerTimeOff(data);
}
