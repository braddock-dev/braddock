import Logger from "@/app/utils/Logger";
import AuthStoreInterface from "@/app/backend/protocol/rest/AuthStoreInterface";
import { Constants } from "@/app/utils/Constants";
import { NextRequest } from "next/server";

class AuthGuardManager {
  private readonly LOG_TAG: string = "AuthGuardManager";

  constructor() {
    Logger.debug(this.LOG_TAG, "initialized successfully");
  }

  public async handleAuthGuard(request: NextRequest): Promise<URL | undefined> {
    const hasSession = AuthStoreInterface.isSessionValid();

    if (!hasSession) {
      if (request.nextUrl.pathname.startsWith(Constants.APP_ROUTES.ADMIN)) {
        return new URL(Constants.APP_ROUTES.LOGIN, request.url);
      }
    }
  }
}

export default new AuthGuardManager();
