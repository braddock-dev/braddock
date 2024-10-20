export type AuthRoleValues = "Customer" | "Business";

export interface IUserInfoResponse {
  name: string | null;
  role: AuthRoleValues;
  msisdn: string;
  email: string | null;
  createdAt: number;
}
