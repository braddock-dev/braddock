import Logger from "@/app/utils/Logger";
import {
  HttpMethods,
  HttpStatus,
  IHttpRequestConfig,
} from "@/app/backend/protocol/rest/IHttpInterface";
import { Constants } from "@/app/utils/Constants";
import ApiInterface from "@/app/backend/protocol/rest/ApiInterface";
import { INewAppointmentRequest } from "@/app/backend/services/data/AppointmentDaos";

class TreatmentsService {
  private LOG_TAG = "TreatmentsService";

  constructor() {
    Logger.log(this.LOG_TAG, "Service initialized");
  }

  public async getTreatments(): Promise<any[]> {
    Logger.log(this.LOG_TAG, "Start getting treatments");

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.GET_TREATMENTS(
          Constants.EXTERNAL_CONFIGS.BUSINESS_REFERENCE,
        ),
        httpMethod: HttpMethods.GET,
      };

      const response = await ApiInterface.send(request);

      Logger.log(this.LOG_TAG, "Get treatments response success");

      if (!response || response.status !== HttpStatus.OK) {
        return Promise.reject("Failed to get treatments");
      }

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting treatments", error);
      throw error;
    }
  }

  public async getTreatmentTimeslots(treatmentsId: string[]): Promise<any[]> {
    Logger.log(this.LOG_TAG, "Start getting treatment timeslots", [
      treatmentsId,
    ]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.GET_TIMESLOTS(
          Constants.EXTERNAL_CONFIGS.BUSINESS_REFERENCE,
        ),
        httpMethod: HttpMethods.POST,
        data: {
          treatmentsIds: treatmentsId,
        },
      };

      const response = await ApiInterface.send(request);

      Logger.log(this.LOG_TAG, "Get treatments timeslots response success");

      if (!response || response.status !== HttpStatus.OK) {
        return Promise.reject("Failed to get treatment timeslots");
      }

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting treatment timeslots", error);
      throw error;
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

export default new TreatmentsService();
