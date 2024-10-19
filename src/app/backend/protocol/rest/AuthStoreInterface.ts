import { cookies } from "next/headers";
import Logger from "@/app/utils/Logger";
import { IAuthTokenInfo } from "@/app/backend/business/auth/data/OtpData";

class AuthStoreInterface {
  private COOKIE_NAME = "userAuthToken";
  private COOKIE_EXPIRATION = "authTokenExpiration";

  private readonly LOG_TAG = "AuthStoreInterface";

  constructor() {
    Logger.info(this.LOG_TAG, "Service initialized");
  }

  public setAuthCookies(authTokenInfo: IAuthTokenInfo) {
    cookies().set(this.COOKIE_NAME, authTokenInfo.token);
    cookies().set(this.COOKIE_EXPIRATION, authTokenInfo.expiration);
  }

  public removeAuthCookies() {
    cookies().delete(this.COOKIE_NAME);
    cookies().delete(this.COOKIE_EXPIRATION);
  }

  public getAuthToken(): { expiration: string; token: string } | undefined {
    const authToken = cookies().get(this.COOKIE_NAME);
    const authTokenExpiration = cookies().get(this.COOKIE_EXPIRATION);

    if (!authToken?.value || !authTokenExpiration?.value) {
      return;
    }

    return { token: authToken.value, expiration: authTokenExpiration.value };
  }

  public isSessionValid(): boolean {
    const tokenInfo = this.getAuthToken();

    if (!tokenInfo) return false;

    const { token, expiration } = tokenInfo;

    Logger.debug(this.LOG_TAG, "Checking if user is authenticated", [
      token,
      expiration,
    ]);

    const now = new Date().getTime();
    const isTokenValid = now <= Number(expiration);

    return !!token && isTokenValid;
  }
}

export default new AuthStoreInterface();
