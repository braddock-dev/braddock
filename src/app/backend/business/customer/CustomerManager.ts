import Logger from "@/app/utils/Logger";
import {
  ICustomer,
  IUpdateCustomerRequest,
} from "@/app/backend/business/customer/CustomerDto";
import CustomerDataAdapter from "@/app/backend/business/customer/CustomerDataAdapter";
import CustomerService from "@/app/backend/services/CustomerService";

class CustomerManager {
  private readonly LOG_TAG = "CustomerManager";

  constructor() {
    Logger.debug(this.LOG_TAG, "Service initialized");
  }

  public async updateCustomerInfo(
    customer: IUpdateCustomerRequest,
  ): Promise<void> {
    Logger.debug(this.LOG_TAG, "Updating customer info", customer);

    try {
      const updateCustomerRequest =
        CustomerDataAdapter.convertCustomerToDataRequest(customer);

      await CustomerService.updateCustomerInfo(updateCustomerRequest);

      Logger.debug(this.LOG_TAG, "Customer info updated");

      return;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error updating customer info", error);
      throw error;
    }
  }

  public async getCustomers(
    name?: string,
    phoneNumber?: string,
  ): Promise<ICustomer[]> {
    Logger.debug(this.LOG_TAG, "Getting customers...");

    try {
      const customersResponse = await CustomerService.getCustomers(
        name,
        phoneNumber,
      );

      const customers =
        CustomerDataAdapter.convertDataToCustomers(customersResponse);

      Logger.log(this.LOG_TAG, "Get customers response success", [customers]);

      return customers;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to fetch customers.", error);
      throw error;
    }
  }
}

export default new CustomerManager();
