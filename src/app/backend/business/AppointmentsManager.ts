import Logger from "@/app/utils/Logger";
import AppointmentsService from "@/app/backend/services/AppointmentsService";
import AppointmentDataAdapter from "@/app/backend/business/treatments/AppointmentDataAdapter";
import { IAppointmentQueryData } from "@/app/backend/business/treatments/data/AppointmentData";

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
}

export default new AppointmentsManager();
