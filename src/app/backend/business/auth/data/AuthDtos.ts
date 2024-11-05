export enum AuthRoles {
  CUSTOMER = "Customer",
  BUSINESS = "Business",
}

export interface IUserInfo {
  name: string;
  role: AuthRoles;
  phoneNumber: string;
  email: string;
  hasGoogleCalendar: boolean;
}
