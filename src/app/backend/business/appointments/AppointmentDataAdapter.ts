import { AppointmentStatus, IAppointment, IAppointmentQueryData } from "@/app/backend/business/treatments/data/AppointmentData";
import TreatmentsDataAdapter from "@/app/backend/business/treatments/TreatmentsDataAdapter";
import {
  AppointmentStatusValue,
  IAppointmentsResponse,
  INewAppointmentRequest,
  IQueryAppointmentRequest,
} from "@/app/backend/services/data/AppointmentDaos";
import dayjs from "@/app/utils/dayjs";
import { Constants } from "@/app/utils/Constants";
import { getDifferenceInHours, getDifferenceInMinutes } from "@/app/utils/functions";
import { INewAppointmentRequestData } from "@/app/backend/business/appointments/data/AppointmentData";

type AppointmentMapping = {
  APPOINTMENT_STATUS_INBOUND: Record<AppointmentStatusValue, AppointmentStatus>;
  APPOINTMENT_STATUS_OUTBOUND: Record<AppointmentStatus, AppointmentStatusValue>;
};

class AppointmentDataAdapter {
  private static APPOINTMENT_MAPPING: AppointmentMapping = {
    APPOINTMENT_STATUS_INBOUND: {
      Active: AppointmentStatus.ACTIVE,
      CustomerDidNotAppear: AppointmentStatus.CUSTOMER_DID_NOT_APPEAR,
    },
    APPOINTMENT_STATUS_OUTBOUND: {
      [AppointmentStatus.ACTIVE]: "Active",
      [AppointmentStatus.CUSTOMER_DID_NOT_APPEAR]: "CustomerDidNotAppear",
    },
  };

  private static DEFAULT_DATE_INTERVAL = {
    startDate: dayjs().startOf("day").valueOf(),
    endDate: dayjs().endOf("day").valueOf(),
  };

  public convertDataToAppointment(data: any): IAppointment {
    return {
      businessId: data.businessId,
      id: data.id,
      clientName: data.customerName || "",
      clientPhoneNumber: data.customerMsisdn || "",
      clientEmail: data.customerEmail || "",
      startTimeInMillis: data.startTimeInMillis,
      endTimeInMillis: data.endTimeInMillis,
      durationInHours: getDifferenceInHours(data.startTimeInMillis, data.endTimeInMillis),
      durationInMinutes: getDifferenceInMinutes(data.startTimeInMillis, data.endTimeInMillis),
      startTime: data.startTime,
      createdAt: data.createdAt,
      treatments: TreatmentsDataAdapter.convertDataToTreatments(data.treatments || []),
      operatorId: data.operatorId,
      state: AppointmentDataAdapter.APPOINTMENT_MAPPING.APPOINTMENT_STATUS_INBOUND[data.state] || AppointmentStatus.ACTIVE,
      dayInMillis: dayjs(data.createdAt, "YYYY-MM-DD").valueOf(),
    };
  }

  public convertDataToAppointments(data: IAppointmentsResponse[]): IAppointment[] {
    if (Array.isArray(data) && data.length > 0) {
      const appointmentsList = data.map((response) => response.appointments).flat();

      return appointmentsList.map(this.convertDataToAppointment.bind(this));
    }

    return [];
  }

  public convertQueryData(data: IAppointmentQueryData): IQueryAppointmentRequest {
    return {
      businessId: Constants.EXTERNAL_CONFIGS.BUSINESS_REFERENCE,
      operatorId: data.operatorId,
      startDate: data.startDate || AppointmentDataAdapter.DEFAULT_DATE_INTERVAL.startDate,
      endDate: data.endDate || AppointmentDataAdapter.DEFAULT_DATE_INTERVAL.endDate,
    };
  }

  public convertAppointmentDataToRequestData(newAppointment: INewAppointmentRequestData): INewAppointmentRequest {
    if (!newAppointment.selectedTreatments.length) {
      throw new Error("No treatments selected");
    }

    if (!newAppointment.selectedTimeSlot?.timeInMillis) {
      throw new Error("No time slot selected");
    }

    const treatmentsId = newAppointment.selectedTreatments.map((treatment) => treatment.id);

    return {
      treatmentsId: treatmentsId,
      timeSlotId: newAppointment.selectedTimeSlot.timeInMillis,
      customerName: newAppointment.customerName,
      customerPhone: newAppointment.phoneNumber,
      customerEmail: newAppointment.customerEmail,
      requestedBy: newAppointment.requestedBy,
      employeeId: newAppointment.employeeId,
    };
  }

  public createUpdateAppointmentRequest(state: AppointmentStatus): Partial<INewAppointmentRequest> {
    return {
      state: AppointmentDataAdapter.APPOINTMENT_MAPPING.APPOINTMENT_STATUS_OUTBOUND[state],
    };
  }
}

export default new AppointmentDataAdapter();
