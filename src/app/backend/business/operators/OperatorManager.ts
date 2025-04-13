import Logger from "@/app/utils/Logger";
import { IOperator, IToggleTreatment } from "@/app/backend/business/operators/data/OperatorDtos";
import OperatorService from "@/app/backend/services/OperatorService";
import OperatorDataAdapter from "@/app/backend/business/operators/OperatorDataAdapter";
import { IOperatorResponse } from "../../services/data/OperatorDaos";

class OperatorManager {
  private readonly LOG_TAG = "OperatorManager";

  constructor() {
    Logger.debug(this.LOG_TAG, "Service initialized");
  }

  public async getOperators(): Promise<IOperator[]> {
    Logger.debug(this.LOG_TAG, "Getting operators...");

    try {
      const operatorsResponse = await OperatorService.getOperators();
      const operators = OperatorDataAdapter.convertDataToOperators(operatorsResponse);

      Logger.log(this.LOG_TAG, "Get operators response success", [operators]);

      return operators;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to fetch operators.", error);
      throw error;
    }
  }

  public async updateOperator(operatorId: string, data: IOperator): Promise<IOperator> {
    Logger.debug(this.LOG_TAG, "Updating operator...", [operatorId, data]);

    try {
      const operatorRequestData = OperatorDataAdapter.convertDataToOperatorRequest(data);
      const operatorResponse = await OperatorService.updateOperator(operatorId, operatorRequestData);
      const operator = OperatorDataAdapter.convertDataToOperator(operatorResponse, 0);

      Logger.log(this.LOG_TAG, "Update operator response success", [operator]);

      return operator;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to update operator.", error);
      throw error;
    }
  }

  public async deleteOperator(operatorId: string): Promise<void> {
    Logger.debug(this.LOG_TAG, "Deleting operator...", [operatorId]);

    try {
      await OperatorService.deleteOperator(operatorId);
      Logger.log(this.LOG_TAG, "Delete operator response success");
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to delete operator.", error);
      throw error;
    }
  }

  public async createOperator(data: IOperator): Promise<IOperator> {
    Logger.debug(this.LOG_TAG, "Creating operator...", [data]);

    try {
      const operatorRequestData = OperatorDataAdapter.convertDataToOperatorRequest(data);
      const operatorResponse = await OperatorService.createOperator(operatorRequestData);
      const operator = OperatorDataAdapter.convertDataToOperator(operatorResponse, 0);

      Logger.log(this.LOG_TAG, "Create operator response success", [operator]);

      return operator;
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to create operator.", error);
      throw error;
    }
  }

  public async assignTreatments(operatorId: string, treatmentIds: string[]): Promise<void> {
    Logger.debug(this.LOG_TAG, "Assigning treatments to operator in manager...", [operatorId, treatmentIds]);

    try {
      const operator = await OperatorService.assignTreatments(operatorId, treatmentIds);
      Logger.log(this.LOG_TAG, "Successfully assigned treatments to operator", [operator]);
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to assign treatments to operator in manager", error);
      throw error;
    }
  }

  public async unassignTreatments(operatorId: string, treatmentIds: string[]): Promise<void> {
    Logger.debug(this.LOG_TAG, "Unassigning treatments from operator in manager...", [operatorId, treatmentIds]);

    try {
      const operator = await OperatorService.unassignTreatments(operatorId, treatmentIds);
      Logger.log(this.LOG_TAG, "Successfully unassigned treatments from operator", [operator]);
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to unassign treatments from operator in manager", error);
      throw error;
    }
  }

  public async toggleTreatment(toggleTreatment: IToggleTreatment) {
    Logger.debug(this.LOG_TAG, "Toggling treatment...", [toggleTreatment]);

    try {
      if (toggleTreatment.isActive) {
        await this.unassignTreatments(toggleTreatment.operatorId, [toggleTreatment.treatmentId]);
      } else {
        await this.assignTreatments(toggleTreatment.operatorId, [toggleTreatment.treatmentId]);
      }
    } catch (error) {
      Logger.error(this.LOG_TAG, "Failed to toggle treatment in manager", error);
      throw error;
    }
  }
}

export default new OperatorManager();
