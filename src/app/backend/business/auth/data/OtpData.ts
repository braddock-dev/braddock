export interface IAuthTokenInfo {
  token: string;
  expiration: string;
}

export interface IOtpRequestData {
  otpCode: string;
  requestId: string;
}
