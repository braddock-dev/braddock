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

  public refreshGoogleCalendarToken(): Promise<string> {
    Logger.info(this.LOG_TAG, "Refreshing Google Calendar token");

    const request: IHttpRequestConfig = {
      url: Constants.API_ROUTES.REFRESH_CALENDAR_TOKEN(),
      httpMethod: HttpMethods.GET,
    };

    return ApiInterface.send(request).then(
      (response) => {
        if (response.status !== HttpStatus.OK) {
          Logger.error(this.LOG_TAG, "Error refreshing Google Calendar token", [
            response,
          ]);
          throw Error("Failed to refresh Google Calendar token");
        }

        const { url } = response.data;

        if (!url) {
          Logger.error(this.LOG_TAG, "Error refreshing Google Calendar token", [
            response.data,
          ]);
          throw Error("Failed to refresh Google Calendar token");
        }

        Logger.info(this.LOG_TAG, "Google Calendar token refreshed", [url]);
        return Promise.resolve(url);
      },
      (error) => {
        Logger.error(
          this.LOG_TAG,
          "Error refreshing Google Calendar token",
          error,
        );
        throw Error(error);
      },
    );
  }
}

export default new AuthService();
