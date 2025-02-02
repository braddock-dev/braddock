import {
  ICustomer,
  IUpdateCustomerRequest,
} from "@/app/backend/business/customer/CustomerDto";
import {
  ICustomerResponse,
  UpdateCustomerRequest,
} from "@/app/backend/services/data/CustomerData";

class CustomerDataAdapter {
  public convertCustomerToDataRequest(
    customer: IUpdateCustomerRequest,
  ): UpdateCustomerRequest {
    return {
      name: customer.customerName,
      email: customer.customerEmail,
      msisdn: customer.customerPhoneNumber,
    };
  }

  public convertDataToCustomer(customerData: ICustomerResponse): ICustomer {
    return {
      id: customerData.id,
      name: customerData.name,
      email: customerData.email,
      msisdn: customerData.msisdn,
    };
  }

  public convertDataToCustomers(
    customersData: ICustomerResponse[],
  ): ICustomer[] {
    return customersData.map(this.convertDataToCustomer);
  }
}

export default new CustomerDataAdapter();
