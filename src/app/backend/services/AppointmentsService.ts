import Logger from "@/app/utils/Logger";
import {
  HttpMethods,
  HttpStatus,
  IHttpRequestConfig,
} from "@/app/backend/protocol/rest/IHttpInterface";
import { Constants } from "@/app/utils/Constants";
import {
  IAppointmentsResponse,
  INewAppointmentRequest,
  IQueryAppointmentRequest,
} from "@/app/backend/services/data/AppointmentDaos";
import ApiInterface from "@/app/backend/protocol/rest/ApiInterface";

class AppointmentsService {
  private readonly LOG_TAG = "AppointmentsService";

  public async getAppointments(
    data: IQueryAppointmentRequest,
  ): Promise<IAppointmentsResponse[]> {
    Logger.debug(this.LOG_TAG, "Getting appointments...", [data]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.GET_APPOINTMENTS(),
        httpMethod: HttpMethods.GET,
        headers: {
          BusinessToken: Constants.EXTERNAL_CONFIGS.API_BUSINESS_TOKEN,
          BusinessId: data.businessId,
        },
      };

      const response = await ApiInterface.send(request);

      Logger.log(this.LOG_TAG, "Get appointments response success", [response]);

      if (!response || response.status !== HttpStatus.OK || !response?.data) {
        return Promise.reject("Failed to get treatments");
      }

      Logger.log(this.LOG_TAG, "Get appointments response success", [
        response?.data,
      ]);

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to fetch appointments.", error);
      return Promise.reject(error);
    }
  }

  public async scheduleAppointment(
    appointmentData: INewAppointmentRequest,
  ): Promise<any> {
    Logger.log(this.LOG_TAG, "Start scheduling appointment");

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.SCHEDULE_APPOINTMENT(
          Constants.EXTERNAL_CONFIGS.BUSINESS_REFERENCE,
          appointmentData.timeSlotId.toString(),
        ),
        httpMethod: HttpMethods.POST,
        data: {
          treatmentsIds: appointmentData.treatmentsId,
        },
      };

      const response = await ApiInterface.send(request);

      Logger.log(this.LOG_TAG, "Schedule appointment response success", [
        response,
      ]);

      if (!response || response.status !== HttpStatus.CREATED) {
        return Promise.reject("Failed to schedule appointment");
      }

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error scheduling appointment", error);
      throw error;
    }
  }
}

export default new AppointmentsService();
