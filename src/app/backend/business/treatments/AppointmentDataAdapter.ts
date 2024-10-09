import {
  IAppointment,
  IAppointmentQueryData,
} from "@/app/backend/business/treatments/data/AppointmentData";
import TreatmentsDataAdapter from "@/app/backend/business/treatments/TreatmentsDataAdapter";
import {
  IAppointmentsResponse,
  IQueryAppointmentRequest,
} from "@/app/backend/services/data/AppointmentDaos";
import dayjs from "dayjs";
import { Constants } from "@/app/utils/Constants";

class AppointmentDataAdapter {
  private static DEFAULT_DATE_INTERVAL = {
    startDate: dayjs().startOf("day").valueOf(),
    endDate: dayjs().endOf("day").valueOf(),
  };

  public convertDataToAppointment(data: any): IAppointment {
    return {
      businessId: data.businessId,
      id: data.id,
      clientName: data.clientName,
      startTimeInMillis: data.startTimeInMillis,
      createdAt: data.createdAt,
      durationInMinutes: data.durationInMinutes,
      startTime: data.startTime,
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
}

export default new AppointmentDataAdapter();
