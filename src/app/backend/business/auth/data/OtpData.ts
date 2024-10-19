export interface IAuthTokenInfo {
  token: string;
  expiration: number;
}

export interface IOtpRequestData {
  otpCode: string;
  requestId: string;
}
