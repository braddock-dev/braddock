import Logger from "@/app/utils/Logger";
import { ITimeOffResponse, IWorkingHoursResponse, NewTimeOffRequest } from "@/app/backend/services/data/TimeOffDaos";
import { HttpMethods, HttpStatus, IHttpRequestConfig } from "@/app/backend/protocol/rest/IHttpInterface";
import { Constants } from "@/app/utils/Constants";
import ApiInterface from "@/app/backend/protocol/rest/ApiInterface";

class TimeOffService {
  private readonly LOG_TAG = "TimeOffService";

  public constructor() {
    Logger.log(this.LOG_TAG, "Service initialized");
  }

  public async registerTimeOff(data: NewTimeOffRequest) {
    Logger.debug(this.LOG_TAG, "Start setting time off", [data]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.REGISTER_TIME_OFF(),
        httpMethod: HttpMethods.POST,
        data: data,
      };

      const response = await ApiInterface.send(request);

      if (response.status !== HttpStatus.CREATED) {
        Logger.error(this.LOG_TAG, "Error setting time off", response);
        throw new Error("Error setting time off");
      }

      Logger.debug(this.LOG_TAG, "Setting time off response", [response.data]);

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error setting time off", error);
      throw error;
    }
  }

  public async getTimeOffs(operatorId?: string): Promise<ITimeOffResponse[]> {
    Logger.debug(this.LOG_TAG, "Start getting time offs", [operatorId]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.GET_TIME_OFF(operatorId),
        httpMethod: HttpMethods.GET,
      };

      const response = await ApiInterface.send(request);

      if (response.status !== HttpStatus.OK) {
        Logger.error(this.LOG_TAG, "Error getting time offs", response);
        throw new Error("Error getting time offs");
      }

      Logger.debug(this.LOG_TAG, "Getting time offs response", [response.data]);

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting time offs", error);
      throw error;
    }
  }

  public async deleteTimeOff(id: number) {
    Logger.debug(this.LOG_TAG, "Start deleting time off", [id]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.DELETE_TIME_OFF(id),
        httpMethod: HttpMethods.DELETE,
      };

      const response = await ApiInterface.send(request);

      if (response.status !== HttpStatus.OK) {
        Logger.error(this.LOG_TAG, "Error deleting time off", response);
        throw new Error("Error deleting time off");
      }

      Logger.debug(this.LOG_TAG, "Deleting time off response", [response.data]);

      return;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error deleting time off", error);
      throw error;
    }
  }

  public async getWorkingHours(): Promise<IWorkingHoursResponse> {
    Logger.debug(this.LOG_TAG, "Start getting working hours");

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.GET_WORKING_HOURS(),
        httpMethod: HttpMethods.GET,
      };

      const response = await ApiInterface.send(request);

      if (response.status !== HttpStatus.OK) {
        Logger.error(this.LOG_TAG, "Error getting working hours", response);
        throw new Error("Error getting working hours");
      }

      Logger.debug(this.LOG_TAG, "Getting working hours response", [response.data]);

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting working hours", error);
      throw error;
    }
  }
}

export default new TimeOffService();
