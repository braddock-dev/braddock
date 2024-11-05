export type AuthRoleValues = "Customer" | "Business";
export type GoogleCalendarIntegrationStatus =
  | "integrated"
  | "pending"
  | "notSupported";

export interface IUserInfoResponse {
  name: string | null;
  role: AuthRoleValues;
  msisdn: string;
  email: string | null;
  createdAt: number;
  googleCalendarIntegrationStatus: GoogleCalendarIntegrationStatus;
}
