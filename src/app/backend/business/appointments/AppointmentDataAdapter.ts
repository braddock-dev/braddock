import {
  IAppointment,
  IAppointmentQueryData,
} from "@/app/backend/business/treatments/data/AppointmentData";
import TreatmentsDataAdapter from "@/app/backend/business/treatments/TreatmentsDataAdapter";
import {
  IAppointmentsResponse,
  INewAppointmentRequest,
  IQueryAppointmentRequest,
} from "@/app/backend/services/data/AppointmentDaos";
import dayjs from "@/app/utils/dayjs";
import { Constants } from "@/app/utils/Constants";
import {
  getDifferenceInHours,
  getDifferenceInMinutes,
} from "@/app/utils/functions";
import { INewAppointmentRequestData } from "@/app/backend/business/appointments/data/AppointmentData";

class AppointmentDataAdapter {
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
      durationInHours: getDifferenceInHours(
        data.startTimeInMillis,
        data.endTimeInMillis,
      ),
      durationInMinutes: getDifferenceInMinutes(
        data.startTimeInMillis,
        data.endTimeInMillis,
      ),
      startTime: data.startTime,
      createdAt: data.createdAt,
      treatments: TreatmentsDataAdapter.convertDataToTreatments(
        data.treatments || [],
      ),
    };
  }

  public convertDataToAppointments(
    data: IAppointmentsResponse[],
  ): IAppointment[] {
    if (Array.isArray(data) && data.length > 0) {
      const appointmentsList = data
        .map((response) => response.appointments)
        .flat();

      return appointmentsList.map(this.convertDataToAppointment.bind(this));
    }

    return [];
  }

  public convertQueryData(
    data: IAppointmentQueryData,
  ): IQueryAppointmentRequest {
    return {
      businessId: Constants.EXTERNAL_CONFIGS.BUSINESS_REFERENCE,
      startDate:
        data.startDate ||
        AppointmentDataAdapter.DEFAULT_DATE_INTERVAL.startDate,
      endDate:
        data.endDate || AppointmentDataAdapter.DEFAULT_DATE_INTERVAL.endDate,
    };
  }

  public convertAppointmentDataToRequestData(
    newAppointment: INewAppointmentRequestData,
  ): INewAppointmentRequest {
    if (!newAppointment.selectedTreatments.length) {
      throw new Error("No treatments selected");
    }

    if (!newAppointment.selectedTimeSlot?.timeInMillis) {
      throw new Error("No time slot selected");
    }

    const treatmentsId = newAppointment.selectedTreatments.map(
      (treatment) => treatment.id,
    );

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
}

export default new AppointmentDataAdapter();
