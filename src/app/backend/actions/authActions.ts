"use server";

import OtpManager from "@/app/backend/business/auth/OtpManager";
import {
  ICompleteAuthData,
  IOtpRequestData,
} from "@/app/backend/business/auth/data/OtpData";
import AuthManager from "@/app/backend/business/auth/AuthManager";
import { IUserInfo } from "@/app/backend/business/auth/data/AuthDtos";

export async function sendOtp(phoneNumber: string): Promise<string> {
  return OtpManager.sendOtp(phoneNumber);
}

export async function verifyOtp(
  data: IOtpRequestData,
): Promise<ICompleteAuthData> {
  return OtpManager.verifyOtp(data);
}

export async function getUserInfo(): Promise<IUserInfo> {
  return AuthManager.getUserInfo();
}

export async function logout(): Promise<void> {
  return AuthManager.logout();
}
