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

      return appointmentData.reverse();
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to fetch appointments.", error);
      throw error;
    }
  }

  public async scheduleAppointment(
    appointment: INewAppointmentRequestData,
    daysForward?: number,
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
        daysForward,
      );

      Logger.debug(this.LOG_TAG, "Schedule appointment response", [response]);

      return;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error scheduling appointment", error);
      throw error;
    }
  }

  public async editAppointment(
    appointmentId: string,
    appointmentData: INewAppointmentRequestData,
  ): Promise<void> {
    Logger.debug(this.LOG_TAG, "Start editing appointment", [
      appointmentId,
      appointmentData,
    ]);

    try {
      const createdAppointment =
        await this.scheduleAppointment(appointmentData);

      await this.deleteAppointment(appointmentId);

      Logger.debug(this.LOG_TAG, "Edit appointment response", [
        createdAppointment,
      ]);

      return;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error editing appointment", error);
      throw error;
    }
  }

  public async deleteAppointment(appointmentId: string): Promise<void> {
    Logger.debug(this.LOG_TAG, "Start deleting appointment", [appointmentId]);

    try {
      const response =
        await AppointmentsService.deleteAppointment(appointmentId);

      Logger.debug(this.LOG_TAG, "Delete appointment response", [response]);

      return;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error deleting appointment", error);
      throw error;
    }
  }
}

export default new AppointmentsManager();
