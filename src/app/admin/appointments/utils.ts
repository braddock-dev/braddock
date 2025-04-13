"use client";

import {
  EventType,
  IAppointment,
  IEvent,
} from "@/app/backend/business/treatments/data/AppointmentData";
import { isDateInPast } from "@/app/utils/functions";
import { Options, TZDate } from "@toast-ui/calendar";
import { ITimeOff } from "@/app/backend/business/time-off/TimeOffDtos";
import { Constants } from "@/app/utils/Constants";
import { ITreatment } from "@/app/backend/business/treatments/data/TreatmentsData";

const DEFAULT_CALENDAR_ID = "1";

export function convertAppointmentToEvent(appointment: IAppointment): IEvent {
  return {
    id: appointment.id,
    start: new TZDate(appointment.startTimeInMillis),
    end: new TZDate(appointment.endTimeInMillis),
    category: "time",
    title: `Agendamento com ${appointment.clientName || "Cliente"}`,
    calendarId: DEFAULT_CALENDAR_ID,
    isReadOnly: true,
    backgroundColor: isDateInPast(appointment.endTimeInMillis)
      ? "#939090"
      : "#b47866",
    raw: {
      type: EventType.APPOINTMENT,
    },
  };
}

export function convertAppointmentsToEvents(
  appointments: IAppointment[],
): IEvent[] {
  return appointments.map((appointment) =>
    convertAppointmentToEvent(appointment),
  );
}

export function convertTimeOffsToEvents(timeOffs: ITimeOff[]): IEvent[] {
  return timeOffs.map((timeOff) => convertTimeOffToEvent(timeOff));
}

export function convertTimeOffToEvent(timeOff: ITimeOff): IEvent {
  return {
    id: String(timeOff.id),
    start: new TZDate(timeOff.startTimeInMillis),
    end: new TZDate(timeOff.endTimeInMillis),
    category: "time",
    backgroundColor: "#383838",
    title: "Horário de Folga",
    calendarId: DEFAULT_CALENDAR_ID,
    isReadOnly: true,
    raw: {
      type: EventType.TIME_OFF,
    },
  };
}

export const initialCalendars: Options["calendars"] = [
  {
    id: DEFAULT_CALENDAR_ID,
    name: "APPOINTMENTS",
    backgroundColor: "#b47866",
    borderColor: "#734434",
    dragBackgroundColor: "#cea28d",
    color: "#fff",
  },
];

export const isNotAllowedServiceSelected = (
  selectedTreatments: ITreatment[],
) => {
  return notAllowedServicesSelected(selectedTreatments).length > 0;
};

export const notAllowedServicesSelected = (
  selectedTreatments: ITreatment[],
) => {
  return selectedTreatments
    .filter((treatment) =>
      Constants.NOT_ALLOWED_SERVICES.map((item) => item.toUpperCase()).includes(
        treatment.name.toUpperCase(),
      ),
    )
    .map((treatment) => treatment.name);
};
