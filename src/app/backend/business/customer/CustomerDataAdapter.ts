import { IUpdateCustomerRequest } from "@/app/backend/business/customer/CustomerDto";
import { UpdateCustomerRequest } from "@/app/backend/services/data/CustomerData";

class CustomerDataAdapter {
  public convertCustomerToDataRequest(
    customer: IUpdateCustomerRequest,
  ): UpdateCustomerRequest {
    return {
      name: customer.customerName,
      email: customer.customerEmail,
    };
  }
}

export default new CustomerDataAdapter();
