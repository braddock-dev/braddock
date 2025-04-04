import Logger from "@/app/utils/Logger";
import { HttpMethods, HttpStatus, IHttpRequestConfig } from "@/app/backend/protocol/rest/IHttpInterface";
import { Constants } from "@/app/utils/Constants";
import ApiInterface from "@/app/backend/protocol/rest/ApiInterface";
import { IOperatorResponse } from "@/app/backend/services/data/OperatorDaos";

class OperatorService {
  private readonly LOG_TAG = "OperatorService";

  constructor() {
    Logger.log(this.LOG_TAG, "Service initialized");
  }

  public async getOperators(): Promise<IOperatorResponse[]> {
    Logger.debug(this.LOG_TAG, "Getting operators...");

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.GET_OPERATORS(Constants.EXTERNAL_CONFIGS.BUSINESS_REFERENCE),
        httpMethod: HttpMethods.GET,
      };

      const response = await ApiInterface.send(request);

      if (!response || response.status !== HttpStatus.OK || !response?.data) {
        throw new Error("Failed to get operators");
      }

      Logger.log(this.LOG_TAG, "Get operators response success", [response.data]);

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to fetch operators.", error);
      throw error;
    }
  }
}

export default new OperatorService(); 