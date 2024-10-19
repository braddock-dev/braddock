import Logger from "@/app/utils/Logger";
import AppointmentsService from "@/app/backend/services/AppointmentsService";
import AppointmentDataAdapter from "@/app/backend/business/appointments/AppointmentDataAdapter";
import { IAppointmentQueryData } from "@/app/backend/business/treatments/data/AppointmentData";
import { INewAppointmentRequestData } from "@/app/backend/business/appointments/data/AppointmentData";

class AppointmentsManager {
  private readonly LOG_TAG = "AppointmentsManager";

  public async getAppointments(data: IAppointmentQueryData) {
    Logger.debug(this.LOG_TAG, "Getting appointments...", [data]);

    try {
      const queryData = AppointmentDataAdapter.convertQueryData(data);

      const appointmentsResponse =
        await AppointmentsService.getAppointments(queryData);
      const appointmentData =
        AppointmentDataAdapter.convertDataToAppointments(appointmentsResponse);

      Logger.log(this.LOG_TAG, "Get appointments response success", [
        appointmentData,
      ]);

      return appointmentData;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to fetch appointments.", error);
      throw error;
    }
  }

  public async scheduleAppointment(
    appointment: INewAppointmentRequestData,
  ): Promise<void> {
    Logger.debug(this.LOG_TAG, "Start scheduling appointment", [appointment]);

    try {
      const appointmentRequestData =
        AppointmentDataAdapter.convertAppointmentDataToRequestData(appointment);

      Logger.debug(this.LOG_TAG, "Appointment request data", [
        appointmentRequestData,
      ]);

      const response = await AppointmentsService.scheduleAppointment(
        appointmentRequestData,
      );

      Logger.debug(this.LOG_TAG, "Schedule appointment response", [response]);

      return;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error scheduling appointment", error);
      throw error;
    }
  }
}

export default new AppointmentsManager();
