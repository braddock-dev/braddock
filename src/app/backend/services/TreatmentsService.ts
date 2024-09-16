import Logger from "@/app/utils/Logger";
import {
  HttpMethods,
  HttpStatus,
  IHttpRequestConfig,
} from "@/app/backend/protocol/rest/IHttpInterface";
import { Constants } from "@/app/utils/Constants";
import ApiInterface from "@/app/backend/protocol/rest/ApiInterface";

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
      return Promise.reject(error);
    }
  }
}

export default new TreatmentsService();
