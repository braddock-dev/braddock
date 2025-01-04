export interface UpdateCustomerRequest {
  name: string;
  email?: string;
}

export interface ICustomerResponse {
  id: string;
  name: string;
  msisdn: string;
  email: string;
  createdAt: number;
}
