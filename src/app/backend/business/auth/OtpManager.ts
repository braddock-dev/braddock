import Logger from "@/app/utils/Logger";
import OtpService from "@/app/backend/services/OtpService";
import {
  IAuthTokenInfo,
  IOtpRequestData,
} from "@/app/backend/business/auth/data/OtpData";
import OtpDataAdapter from "@/app/backend/business/auth/OtpDataAdapter";
import AuthStoreInterface from "@/app/backend/protocol/rest/AuthStoreInterface";

class OtpManager {
  private readonly LOG_TAG = "OtpManager";

  constructor() {
    Logger.info(this.LOG_TAG, "Service initialized");
  }

  public async sendOtp(phoneNumber: string): Promise<string> {
    Logger.debug(this.LOG_TAG, "Sending OTP for phone number", [phoneNumber]);

    try {
      const requestId = await OtpService.sendOtp(phoneNumber);
      Logger.info(this.LOG_TAG, "OTP set", [requestId]);

      return requestId;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error sending OTP", error);
      throw error;
    }
  }

  public async verifyOtp(
    requestData: IOtpRequestData,
  ): Promise<IAuthTokenInfo> {
    Logger.debug(this.LOG_TAG, "Verifying OTP", [
      requestData.requestId,
      requestData.otpCode,
    ]);

    try {
      const responseData = await OtpService.verifyOtp(requestData);
      const authTokenInfo = OtpDataAdapter.convertDataToAuthToken(responseData);
      Logger.info(this.LOG_TAG, "OTP verified", [authTokenInfo]);

      AuthStoreInterface.setAuthCookies(authTokenInfo);
      return authTokenInfo;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error verifying OTP", error);
      throw error;
    }
  }
}

export default new OtpManager();
