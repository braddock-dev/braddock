import Logger from "@/app/utils/Logger";
import { IUserInfo } from "@/app/backend/business/auth/data/AuthDtos";
import AuthService from "@/app/backend/services/AuthService";
import AuthDataAdapter from "@/app/backend/business/auth/AuthDataAdapter";

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
}

export default new AuthManager();
