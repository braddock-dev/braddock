export interface ICustomer {
  id: string;
  name: string;
  msisdn: string;
  email: string;
}

export interface IUpdateCustomerRequest {
  customerName: string;
  customerEmail?: string;
  customerPhoneNumber?: string;
}
