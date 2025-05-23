"use server";

import TimeOffManager from "@/app/backend/business/time-off/TimeOffManager";
import { NewTimeOffRequest } from "@/app/backend/services/data/TimeOffDaos";
import { ITimeOff } from "@/app/backend/business/time-off/TimeOffDtos";

export async function registerTimeOff(data: NewTimeOffRequest) {
  return TimeOffManager.registerTimeOff(data);
}

export async function getTimeOffs(operatorId?: string): Promise<ITimeOff[]> {
  return TimeOffManager.getTimeOffs(operatorId);
}

export async function deleteTimeOff(id: number) {
  return TimeOffManager.deleteTimeOff(id);
}

export async function getWorkingHours() {
  return TimeOffManager.getWorkingHours();
}
