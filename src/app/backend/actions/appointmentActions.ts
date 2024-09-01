"use server";

import AppointmentManager from "@/app/backend/appointments/AppointmentManager";

export async function getAppointmentInfo() {
  return AppointmentManager.getAppointmentInfo();
}
