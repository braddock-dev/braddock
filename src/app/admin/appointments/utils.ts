import {
  EventType,
  IAppointment,
  IEvent,
} from "@/app/backend/business/treatments/data/AppointmentData";
import { addMinutesToDate } from "@/app/utils/functions";
import { Options, TZDate } from "@toast-ui/calendar";
import { ITimeOff } from "@/app/backend/business/time-off/TimeOffDtos";

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
    backgroundColor: "#b47866",
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

// export function generateEventFromDaysHoursOff(
//   daysHoursOff: number[],
// ): IEvent[] {
//   return daysHoursOff.map((dayHourOff) => {
//     return {
//       id: dayHourOff,
//       // start: new TZDate(dayjs().set("hours", dayHourOff)),
//       // end: new TZDate(dayjs().set("hours", dayHourOff + 1)),
//       category: "time",
//       title: "Horário indisponível",
//       calendarId: DEFAULT_CALENDAR_ID,
//       isReadOnly: true,
//       recurrenceRule: `FREQ=DAILY;INTERVAL=1`,
//     } as IEvent;
//   });
// }

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
