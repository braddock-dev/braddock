import { IAuthTokenInfo } from "@/app/backend/business/auth/data/OtpData";
import AuthDataAdapter from "@/app/backend/business/auth/AuthDataAdapter";

class OtpDataAdapter {
  private readonly LOG_TAG = "OtpDataAdapter";

  public convertDataToAuthToken(data: any): IAuthTokenInfo {
    return {
      token: data.token,
      expiration: String(data.expiration),
      role: AuthDataAdapter.convertDataToUserRole(data.role),
    };
  }
}

export default new OtpDataAdapter();
