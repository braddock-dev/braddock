export interface IAuthTokenInfo {
  token: string;
  expiration: string;
  role?: string;
}

export interface IOtpRequestData {
  otpCode: string;
  requestId: string;
}
