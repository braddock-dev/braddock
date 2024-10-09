import { Constants } from "@/app/utils/Constants";
import Logger from "@/app/utils/Logger";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOG_TAG = "Middleware";

export function middleware(request: NextRequest) {
  Logger.debug(LOG_TAG, "Accessing route path", [request.nextUrl]);

  if (request.nextUrl.pathname === Constants.APP_ROUTES.ADMIN) {
    const newUrl = new URL(Constants.APP_ROUTES.APPOINTMENTS, request.url);

    Logger.debug(LOG_TAG, "Redirecting to", [newUrl]);
    return NextResponse.redirect(newUrl);
  }
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
