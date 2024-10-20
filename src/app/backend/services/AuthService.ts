import Logger from "@/app/utils/Logger";
import {
  HttpMethods,
  HttpStatus,
  IHttpRequestConfig,
} from "@/app/backend/protocol/rest/IHttpInterface";
import { Constants } from "@/app/utils/Constants";
import ApiInterface from "@/app/backend/protocol/rest/ApiInterface";
import { IUserInfoResponse } from "@/app/backend/services/data/AuthDaos";

class AuthService {
  private readonly LOG_TAG = "AuthService";

  constructor() {
    Logger.info(this.LOG_TAG, "Service initialized");
  }

  public async getUserInfo(): Promise<IUserInfoResponse> {
    Logger.info(this.LOG_TAG, "Getting user info");

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.GET_USER_INFO(),
        httpMethod: HttpMethods.GET,
      };

      const response = await ApiInterface.send(request);

      if (!response || response.status !== HttpStatus.OK) {
        Logger.error(this.LOG_TAG, "Error getting user info", [response]);
        throw new Error("Failed to get user info");
      }

      Logger.info(this.LOG_TAG, "User info response", [response.data]);

      return Promise.resolve(response.data);
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting user info", error);
      throw error;
    }
  }
}

export default new AuthService();
