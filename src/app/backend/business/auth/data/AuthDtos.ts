export enum AuthRoles {
  CUSTOMER = "Customer",
  BUSINESS = "Business",
}

export interface IUserInfo {
  name: string;
  role: AuthRoles;
  msisdn: string;
  email: string;
}
