import Logger from "@/app/utils/Logger";
import {
  AuthRoleValues,
  IUserInfoResponse,
} from "@/app/backend/services/data/AuthDaos";
import {
  AuthRoles,
  IUserInfo,
} from "@/app/backend/business/auth/data/AuthDtos";
import { removePhoneNumberPrefix } from "@/app/utils/functions";
import { Constants } from "@/app/utils/Constants";

type OTP_DATA_MAPPING = {
  USER_ROLES: Record<AuthRoleValues, AuthRoles>;
};

class AuthDataAdapter {
  private readonly DATA_MAPPING: OTP_DATA_MAPPING = {
    USER_ROLES: {
      Customer: AuthRoles.CUSTOMER,
      Business: AuthRoles.BUSINESS,
    },
  };
  private readonly LOG_TAG = "AuthDataAdapter";

  constructor() {
    Logger.debug(this.LOG_TAG, "Service initialized");
  }

  public convertDataToUserRole(roleValue: AuthRoleValues): AuthRoles {
    const role = this.DATA_MAPPING.USER_ROLES[roleValue];

    if (!role) {
      Logger.error(this.LOG_TAG, "Invalid role", [roleValue]);
      throw new Error("Invalid role");
    }

    return role;
  }

  public convertDataToUserInfo(data: IUserInfoResponse): IUserInfo {
    return {
      email: data.email || "",
      role: this.convertDataToUserRole(data.role),
      phoneNumber: removePhoneNumberPrefix(
        data.msisdn || "",
        Constants.UI.PHONE_PREFIX.PT,
      ),
      name: data.name || "",
      hasGoogleCalendar: data.googleCalendarIntegrationStatus === "integrated",
    };
  }
}

export default new AuthDataAdapter();
