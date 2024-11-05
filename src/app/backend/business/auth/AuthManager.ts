import Logger from "@/app/utils/Logger";
import { IUserInfo } from "@/app/backend/business/auth/data/AuthDtos";
import AuthService from "@/app/backend/services/AuthService";
import AuthDataAdapter from "@/app/backend/business/auth/AuthDataAdapter";
import AuthStoreInterface from "@/app/backend/protocol/rest/AuthStoreInterface";
import ApiInterface from "@/app/backend/protocol/rest/ApiInterface";

class AuthManager {
  private readonly LOG_TAG = "AuthManager";

  constructor() {
    Logger.debug(this.LOG_TAG, "Service initialized");
  }

  public async getUserInfo(): Promise<IUserInfo> {
    Logger.debug(this.LOG_TAG, "Getting user info");

    try {
      const userInfoResponse = await AuthService.getUserInfo();
      const userInfo = AuthDataAdapter.convertDataToUserInfo(userInfoResponse);

      Logger.debug(this.LOG_TAG, "User info response", [userInfo]);

      return userInfo;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error getting user info", error);
      throw error;
    }
  }

  public async logout(): Promise<void> {
    Logger.debug(this.LOG_TAG, "Logging out");

    try {
      AuthStoreInterface.removeAuthCookies();
      ApiInterface.removeUserAuthHeader();

      Logger.debug(this.LOG_TAG, "Logout successful");
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error logging out", error);
      throw error;
    }
  }

  public async refreshGoogleCalendarToken(): Promise<string> {
    Logger.debug(this.LOG_TAG, "Refreshing Google Calendar token");

    try {
      const response = await AuthService.refreshGoogleCalendarToken();

      Logger.debug(this.LOG_TAG, "Google Calendar token refreshed");

      return response;
    } catch (error) {
      Logger.error(
        this.LOG_TAG,
        "Error refreshing Google Calendar token",
        error,
      );
      throw error;
    }
  }
}

export default new AuthManager();
