export interface UpdateCustomerRequest {
  msisdn?: string;
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
