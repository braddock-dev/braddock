"use server";

import OtpManager from "@/app/backend/business/auth/OtpManager";
import {
  IAuthTokenInfo,
  IOtpRequestData,
} from "@/app/backend/business/auth/data/OtpData";

export async function sendOtp(phoneNumber: string): Promise<string> {
  return OtpManager.sendOtp(phoneNumber);
}

export async function verifyOtp(
  data: IOtpRequestData,
): Promise<IAuthTokenInfo> {
  return OtpManager.verifyOtp(data);
}
