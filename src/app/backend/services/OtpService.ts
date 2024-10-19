import Logger from "@/app/utils/Logger";
import {
  HttpMethods,
  IHttpRequestConfig,
} from "@/app/backend/protocol/rest/IHttpInterface";
import { Constants } from "@/app/utils/Constants";
import ApiInterface from "@/app/backend/protocol/rest/ApiInterface";
import { HttpStatusCode } from "axios";
import { IOtpRequestData } from "@/app/backend/business/auth/data/OtpData";

class OtpService {
  private readonly LOG_TAG = "OtpService";
  private readonly DEFAULT_COUNTRY_CODE = "pt";

  constructor() {
    Logger.info(this.LOG_TAG, "Service initialized");
  }

  public async sendOtp(phoneNumber: string): Promise<string> {
    Logger.debug(this.LOG_TAG, `Sending OTP for phone number ${phoneNumber}`);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.SEND_OTP(),
        httpMethod: HttpMethods.POST,
        data: {
          phoneNumber: phoneNumber,
          countryCode: this.DEFAULT_COUNTRY_CODE,
        },
      };

      const response = await ApiInterface.send(request);

      Logger.info(this.LOG_TAG, "OTP set", [response]);

      if (response.status !== HttpStatusCode.Created) {
        Logger.error(this.LOG_TAG, "Error setting OTP", response.data);
        throw new Error(Constants.ERRORS.GENERIC.UNKNOWN);
      }

      if (response.data.requestId) {
        Logger.debug(this.LOG_TAG, "OTP set", response.data.requestId);
        return response.data.requestId;
      }

      throw new Error(Constants.ERRORS.GENERIC.UNKNOWN);
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error setting OTP", error);
      throw error;
    }
  }

  public async verifyOtp(requestData: IOtpRequestData): Promise<any> {
    Logger.debug(this.LOG_TAG, `Verifying OTP for phone number ${requestData}`);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.VERIFY_OTP(),
        httpMethod: HttpMethods.POST,
        data: {
          requestId: requestData.requestId,
          code: requestData.otpCode,
        },
      };

      const response = await ApiInterface.send(request);

      Logger.info(this.LOG_TAG, "OTP verified", [response]);

      if (response.status !== HttpStatusCode.Ok) {
        Logger.error(this.LOG_TAG, "Error verifying OTP", [response.data]);
        throw new Error(Constants.ERRORS.LOGIN.INVALID_OTP);
      }

      return Promise.resolve(response.data);
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error verifying OTP", error);
      throw error;
    }
  }
}

export default new OtpService();
