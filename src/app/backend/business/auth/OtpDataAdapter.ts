import { IAuthTokenInfo } from "@/app/backend/business/auth/data/OtpData";

class OtpDataAdapter {
  public convertDataToAuthToken(data: any): IAuthTokenInfo {
    return {
      token: data.token,
      expiration: data.expiration,
    };
  }
}

export default new OtpDataAdapter();
