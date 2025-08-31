"use client";

import { EventType, IAppointment, IEvent } from "@/app/backend/business/treatments/data/AppointmentData";
import { isDateInPast } from "@/app/utils/functions";
import { Options, TZDate } from "@toast-ui/calendar";
import { ITimeOff } from "@/app/backend/business/time-off/TimeOffDtos";
import { Constants } from "@/app/utils/Constants";
import { ITreatment } from "@/app/backend/business/treatments/data/TreatmentsData";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";
import { AppointmentStatus } from "@/app/backend/business/treatments/data/AppointmentData";

const DEFAULT_CALENDAR_ID = "1";

export function convertAppointmentToEvent(appointment: IAppointment, operators: IOperator[]): IEvent {
  const operator = operators.find((operator) => operator.id === appointment.operatorId);
  const isCustomerDidNotAppear = appointment.state === AppointmentStatus.CUSTOMER_DID_NOT_APPEAR;

  return {
    id: appointment.id,
    start: new TZDate(appointment.startTimeInMillis),
    end: new TZDate(appointment.endTimeInMillis),
    category: "time",
    title: getAppointmentTitle(appointment, operator),
    calendarId: DEFAULT_CALENDAR_ID,
    isReadOnly: true,
    backgroundColor: getAppointmentBackgroundColor(appointment, operator),
    customStyle: getAppointmentCustomStyle(appointment, operator),
    raw: {
      type: EventType.APPOINTMENT,
      isCustomerDidNotAppear: isCustomerDidNotAppear,
    },
  };
}

function getAppointmentTitle(appointment: IAppointment, operator?: IOperator) {
  const isCustomerDidNotAppear = appointment.state === AppointmentStatus.CUSTOMER_DID_NOT_APPEAR;

  if (isCustomerDidNotAppear) {
    return `Agendamento com ${appointment.clientName || "Cliente"} - ${operator?.name || ""} (Cliente não compareceu)`;
  }

  return `Agendamento com ${appointment.clientName || "Cliente"} - ${operator?.name || ""}`;
}

function getAppointmentBackgroundColor(appointment: IAppointment, operator?: IOperator) {
  const isCustomerDidNotAppear = appointment.state === AppointmentStatus.CUSTOMER_DID_NOT_APPEAR;

  if (isCustomerDidNotAppear) {
    return Constants.UI.CALENDAR.CUSTOMER_DID_NOT_APPEAR_COLOR;
  }

  if (isDateInPast(appointment.endTimeInMillis)) {
    return Constants.UI.CALENDAR.PAST_APPOINTMENT_COLOR;
  }

  return operator?.color || Constants.UI.CALENDAR.DEFAULT_OPERATOR_COLOR;
}

function getAppointmentCustomStyle(appointment: IAppointment, operator?: IOperator): Record<string, string> {
  const isCustomerDidNotAppear = appointment.state === AppointmentStatus.CUSTOMER_DID_NOT_APPEAR;

  if (isCustomerDidNotAppear) {
    return { textDecoration: "line-through", textDecorationColor: "#ffffff", textDecorationThickness: "2px" };
  }

  return {};
}

export function convertAppointmentsToEvents(appointments: IAppointment[], operators: IOperator[]): IEvent[] {
  return appointments.map((appointment) => convertAppointmentToEvent(appointment, operators));
}

export function convertTimeOffsToEvents(timeOffs: ITimeOff[], operators: IOperator[]): IEvent[] {
  return timeOffs.map((timeOff) => convertTimeOffToEvent(timeOff, operators));
}

export function convertTimeOffToEvent(timeOff: ITimeOff, operators: IOperator[]): IEvent {
  const operator = operators.find((operator) => operator.id === timeOff.operatorId);

  return {
    id: String(timeOff.id),
    start: new TZDate(timeOff.startTimeInMillis),
    end: new TZDate(timeOff.endTimeInMillis),
    category: "time",
    backgroundColor: Constants.UI.CALENDAR.DEFAULT_TIME_OFF_COLOR,
    title: `Horário de Folga - ${operator?.name || ""}`,
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

export const isNotAllowedServiceSelected = (selectedTreatments: ITreatment[]) => {
  return notAllowedServicesSelected(selectedTreatments).length > 0;
};

export const notAllowedServicesSelected = (selectedTreatments: ITreatment[]) => {
  return selectedTreatments
    .filter((treatment) => Constants.NOT_ALLOWED_SERVICES.map((item) => item.toUpperCase()).includes(treatment.name.toUpperCase()))
    .map((treatment) => treatment.name);
};
