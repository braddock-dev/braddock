import Logger from "@/app/utils/Logger";
import { UpdateCustomerRequest } from "@/app/backend/services/data/CustomerData";
import {
  HttpMethods,
  HttpStatus,
  IHttpRequestConfig,
} from "@/app/backend/protocol/rest/IHttpInterface";
import { Constants } from "@/app/utils/Constants";
import ApiInterface from "@/app/backend/protocol/rest/ApiInterface";

class CustomerService {
  private LOG_TAG = "CustomerService";

  constructor() {
    Logger.info(this.LOG_TAG, "Service initialized");
  }

  public async updateCustomerInfo(
    customerData: UpdateCustomerRequest,
  ): Promise<void> {
    Logger.info(this.LOG_TAG, "Updating customer info", customerData);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.UPDATE_CUSTOMER(),
        httpMethod: HttpMethods.PUT,
        data: {
          ...customerData,
        },
      };

      const response = await ApiInterface.send(request);

      Logger.info(this.LOG_TAG, "Customer info update response", [response]);

      if (!response || response.status !== HttpStatus.OK) {
        Logger.error(this.LOG_TAG, "Error updating customer info", [response]);
        throw new Error("Failed to update customer info");
      }

      return Promise.resolve();
    } catch (error) {
      Logger.error(this.LOG_TAG, "Error updating customer info", error);
      throw error;
    }
  }
}

export default new CustomerService();
