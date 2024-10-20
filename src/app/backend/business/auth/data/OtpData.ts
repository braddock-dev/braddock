import { AuthRoles } from "@/app/backend/business/auth/data/AuthDtos";

export interface IAuthTokenInfo {
  token: string;
  expiration: string;
  role: AuthRoles;
}

export interface IOtpRequestData {
  otpCode: string;
  requestId: string;
}
