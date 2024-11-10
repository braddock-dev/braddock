import Logger from "@/app/utils/Logger";
import { NewTimeOffRequest } from "@/app/backend/services/data/TimeOffDaos";
import {
  HttpMethods,
  HttpStatus,
  IHttpRequestConfig,
} from "@/app/backend/protocol/rest/IHttpInterface";
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
}

export default new TimeOffService();
