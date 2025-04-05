import Logger from "@/app/utils/Logger";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";
import { IOperatorResponse } from "@/app/backend/services/data/OperatorDaos";

class OperatorDataAdapter {
  private readonly LOG_TAG = "OperatorDataAdapter";

  constructor() {
    Logger.log(this.LOG_TAG, "Service initialized");
  }

  public convertDataToOperator(data: IOperatorResponse): IOperator {
    return {
      id: data.id,
      name: data.name,
      msisdn: data.msisdn,
      email: data.email,
      description: data.description,
      iconUrl: data.iconUrl,
    };
  }

  public convertDataToOperators(data: IOperatorResponse[]): IOperator[] {
    return data.map(this.convertDataToOperator.bind(this));
  }

  public convertDataToOperatorRequest(data: IOperator): IOperatorResponse {
    return {
      id: data.id,
      name: data.name,
      msisdn: data.msisdn,
      email: data.email,
      iconUrl: data.iconUrl || "",
      description: data.description,
    }
  }
  

}

export default new OperatorDataAdapter(); 