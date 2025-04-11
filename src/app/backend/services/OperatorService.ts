import Logger from "@/app/utils/Logger";
import { HttpMethods, HttpStatus, IHttpRequestConfig } from "@/app/backend/protocol/rest/IHttpInterface";
import { Constants } from "@/app/utils/Constants";
import ApiInterface from "@/app/backend/protocol/rest/ApiInterface";
import { IOperatorResponse } from "@/app/backend/services/data/OperatorDaos";

class OperatorService {
  private readonly LOG_TAG = "OperatorService";

  constructor() {
    Logger.log(this.LOG_TAG, "Service initialized");
  }

  public async getOperators(): Promise<IOperatorResponse[]> {
    Logger.debug(this.LOG_TAG, "Getting operators...");

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.GET_OPERATORS(Constants.EXTERNAL_CONFIGS.BUSINESS_REFERENCE),
        httpMethod: HttpMethods.GET,
      };

      const response = await ApiInterface.send(request);

      Logger.debug(this.LOG_TAG, "Get operators response", [response]);

      if (!response || response.status !== HttpStatus.OK || !response?.data) {
        throw new Error("Failed to get operators");
      }

      Logger.log(this.LOG_TAG, "Get operators response success", [response.data]);

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to fetch operators.", error);
      throw error;
    }
  }

  public async updateOperator(
    operatorId: string,
    data: Partial<IOperatorResponse>
  ): Promise<IOperatorResponse> {
    Logger.debug(this.LOG_TAG, "Updating operator...", [operatorId, data]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.UPDATE_OPERATOR(operatorId),
        httpMethod: HttpMethods.PUT,
        data,
      };

      const response = await ApiInterface.send(request);

      Logger.debug(this.LOG_TAG, "Update operator response", [response]);

      if (!response || response.status !== HttpStatus.OK || !response?.data) {
        throw new Error("Failed to update operator");
      }

      Logger.log(this.LOG_TAG, "Update operator response success", [response.data]);

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to update operator.", error);
      throw error;
    }
  }

  public async deleteOperator(operatorId: string): Promise<void> {
    Logger.debug(this.LOG_TAG, "Deleting operator...", [operatorId]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.DELETE_OPERATOR(operatorId),
        httpMethod: HttpMethods.DELETE,
      };

      const response = await ApiInterface.send(request);

      Logger.debug(this.LOG_TAG, "Delete operator response", [response]);

      if (!response || response.status !== HttpStatus.OK) {
        throw new Error("Failed to delete operator");
      }

      Logger.log(this.LOG_TAG, "Delete operator response success");
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to delete operator.", error);
      throw error;
    }
  }

  public async createOperator(data: IOperatorResponse): Promise<IOperatorResponse> {
    Logger.debug(this.LOG_TAG, "Creating operator...", [data]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.CREATE_OPERATOR(),
        httpMethod: HttpMethods.POST,
        data,
      };

      const response = await ApiInterface.send(request);

      Logger.debug(this.LOG_TAG, "Create operator response", [response]);

      if (!response || response.status !== HttpStatus.CREATED || !response?.data) {
        throw new Error("Failed to create operator");
      }

      Logger.log(this.LOG_TAG, "Create operator response success", [response.data]);

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to create operator.", error);
      throw error;
    }
  }

  public async assignTreatments(operatorId: string, treatmentIds: string[]): Promise<IOperatorResponse> {
    Logger.debug(this.LOG_TAG, "Assigning treatments to operator...", [operatorId, treatmentIds]);

    try {
      const request: IHttpRequestConfig = {
        url: Constants.API_ROUTES.ASSIGN_TREATMENTS(operatorId),
        httpMethod: HttpMethods.POST,
        data: { treatmentsIds: treatmentIds },
      };

      const response = await ApiInterface.send(request);

      Logger.debug(this.LOG_TAG, "Assign treatments response", [response]);

      if (!response || response.status !== HttpStatus.OK || !response?.data) {
        throw new Error("Failed to assign treatments to operator");
      }

      Logger.log(this.LOG_TAG, "Assign treatments response success", [response.data]);

      return response.data;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to assign treatments to operator.", error);
      throw error;
    }
  }

  
}

export default new OperatorService(); 