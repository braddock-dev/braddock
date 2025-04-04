import Logger from "@/app/utils/Logger";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";
import OperatorService from "@/app/backend/services/OperatorService";
import OperatorDataAdapter from "@/app/backend/business/operators/OperatorDataAdapter";

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
}

export default new OperatorManager(); 