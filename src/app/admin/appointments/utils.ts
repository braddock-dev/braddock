import {
  IAppointment,
  IEvent,
} from "@/app/backend/business/treatments/data/AppointmentData";
import { addMinutesToDate } from "@/app/utils/functions";
import { Options, TZDate } from "@toast-ui/calendar";

const DEFAULT_CALENDAR_ID = "1";

export function convertAppointmentToEvent(appointment: IAppointment): IEvent {
  return {
    id: appointment.id,
    start: new TZDate(appointment.startTimeInMillis),
    end: new TZDate(
      addMinutesToDate(
        appointment.startTimeInMillis,
        appointment.durationInMinutes,
      ).toDate(),
    ),
    category: "time",
    title: `Agendamento com ${appointment.clientName || "Cliente"}`,
    calendarId: DEFAULT_CALENDAR_ID,
    isReadOnly: false,
  } as IEvent;
}

export function convertAppointmentsToEvents(
  appointments: IAppointment[],
): IEvent[] {
  return appointments.map((appointment) =>
    convertAppointmentToEvent(appointment),
  );
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
