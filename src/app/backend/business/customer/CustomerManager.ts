import Logger from "@/app/utils/Logger";
import { IUpdateCustomerRequest } from "@/app/backend/business/customer/CustomerDto";
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
}

export default new CustomerManager();
