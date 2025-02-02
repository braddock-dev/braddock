import Logger from "@/app/utils/Logger";
import {
  HttpMethods,
  HttpStatus,
  IHttpRequestConfig,
} from "@/app/backend/protocol/rest/IHttpInterface";
import { Constants } from "@/app/utils/Constants";
import ApiInterface from "@/app/backend/protocol/rest/ApiInterface";
import { ITreatmentRequest } from "@/app/backend/services/data/TreatmentsDaos";

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
        throw new Error("Failed to get treatments");
      }

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting treatments", error);
      throw error;
    }
  }

  public async getTreatmentTimeslots(
    treatmentsId: string[],
    daysForward?: number,
  ): Promise<any[]> {
    Logger.log(this.LOG_TAG, "Start getting treatment timeslots", [
      treatmentsId,
      daysForward,
    ]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.GET_TIMESLOTS(
          Constants.EXTERNAL_CONFIGS.BUSINESS_REFERENCE,
        ),
        httpMethod: HttpMethods.POST,
        data: {
          treatmentsIds: treatmentsId,
          // daysForward: daysForward,
        },
      };

      const response = await ApiInterface.send(request);

      Logger.log(this.LOG_TAG, "Get treatments timeslots response success");

      if (!response || response.status !== HttpStatus.OK) {
        throw new Error("Failed to get treatment timeslots");
      }

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting treatment timeslots", error);
      throw error;
    }
  }

  public async createTreatment(treatment: ITreatmentRequest): Promise<any> {
    Logger.log(this.LOG_TAG, "Start creating treatment", [treatment]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.CREATE_TREATMENT,
        httpMethod: HttpMethods.POST,
        data: treatment,
      };

      const response = await ApiInterface.send(request);

      Logger.log(this.LOG_TAG, "Create treatment response", [response]);

      if (
        !response ||
        ![HttpStatus.CREATED, HttpStatus.OK].includes(response.status)
      ) {
        throw new Error("Failed to create treatment");
      }

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error creating treatment", error);
      throw error;
    }
  }

  public async deleteTreatment(treatmentId: string): Promise<any> {
    Logger.log(this.LOG_TAG, "Start deleting treatment", [treatmentId]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.DELETE_TREATMENT(treatmentId),
        httpMethod: HttpMethods.DELETE,
      };

      const response = await ApiInterface.send(request);

      Logger.log(this.LOG_TAG, "Delete treatment response", [response]);

      if (!response || response.status !== HttpStatus.OK) {
        throw new Error("Failed to delete treatment");
      }

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error deleting treatment", error);
      throw error;
    }
  }

  public async updateTreatment(
    treatmentId: string,
    treatment: ITreatmentRequest,
  ): Promise<any> {
    Logger.log(this.LOG_TAG, "Start updating treatment", [
      treatmentId,
      treatment,
    ]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.DELETE_TREATMENT(treatmentId),
        httpMethod: HttpMethods.PUT,
        data: treatment,
      };

      const response = await ApiInterface.send(request);

      Logger.log(this.LOG_TAG, "Update treatment response", [response]);

      if (!response || response.status !== HttpStatus.OK) {
        throw new Error("Failed to update treatment");
      }

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error updating treatment", error);
      throw error;
    }
  }
}

export default new TreatmentsService();
