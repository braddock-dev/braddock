export interface ICustomer {
  phoneNumber: string;
  customerName: string;
  customerEmail: string;
}

export interface IUpdateCustomerRequest {
  customerName: string;
  customerEmail?: string;
}
