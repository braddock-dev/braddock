import {
  ICustomer,
  IUpdateCustomerRequest,
} from "@/app/backend/business/customer/CustomerDto";
import {
  ICustomerResponse,
  UpdateCustomerRequest,
} from "@/app/backend/services/data/CustomerData";
import { removePhoneNumberPrefix } from "@/app/utils/functions";
import { Constants } from "@/app/utils/Constants";

class CustomerDataAdapter {
  public convertCustomerToDataRequest(
    customer: IUpdateCustomerRequest,
  ): UpdateCustomerRequest {
    return {
      name: customer.customerName,
      email: customer.customerEmail,
    };
  }

  public convertDataToCustomer(customerData: ICustomerResponse): ICustomer {
    return {
      id: customerData.id,
      name: customerData.name,
      email: customerData.email,
      msisdn: removePhoneNumberPrefix(
        customerData.msisdn,
        Constants.UI.PHONE_PREFIX.PT,
      ),
    };
  }

  public convertDataToCustomers(
    customersData: ICustomerResponse[],
  ): ICustomer[] {
    return customersData.map(this.convertDataToCustomer);
  }
}

export default new CustomerDataAdapter();
