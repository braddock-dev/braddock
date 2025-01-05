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
        params: {
          fromTimeInMillis: data.startDate,
          toTimeInMillis: data.endDate,
        },
      };

      const response = await ApiInterface.send(request);

      Logger.log(this.LOG_TAG, "Get appointments response success", [response]);

      if (!response || response.status !== HttpStatus.OK || !response?.data) {
        return Promise.reject("Failed to get appointments");
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
    Logger.log(this.LOG_TAG, "Start scheduling appointment", [appointmentData]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.SCHEDULE_APPOINTMENT(
          Constants.EXTERNAL_CONFIGS.BUSINESS_REFERENCE,
          appointmentData.timeSlotId.toString(),
        ),
        httpMethod: HttpMethods.POST,
        data: {
          treatmentsIds: appointmentData.treatmentsId,
          customerName: appointmentData.customerName,
          phoneNumber: appointmentData.customerPhone,
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

  public deleteAppointment(appointmentId: string): Promise<void> {
    Logger.debug(this.LOG_TAG, "Deleting appointment...", [appointmentId]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.DELETE_APPOINTMENT(appointmentId),
        httpMethod: HttpMethods.DELETE,
      };

      return ApiInterface.send(request).then((response) => {
        Logger.debug(this.LOG_TAG, "Delete appointment response success", [
          response,
        ]);

        if (!response || response.status !== HttpStatus.OK) {
          return Promise.reject("Failed to delete appointment");
        }

        return response.data;
      });
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to delete appointment.", error);
      return Promise.reject(error);
    }
  }
}

export default new AppointmentsService();
