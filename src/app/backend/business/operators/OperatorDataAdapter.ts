import Logger from "@/app/utils/Logger";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";
import { IOperatorResponse } from "@/app/backend/services/data/OperatorDaos";

class OperatorDataAdapter {
  private readonly LOG_TAG = "OperatorDataAdapter";
  private ALPHA_CHANNEL = "FF";

  constructor() {
    Logger.log(this.LOG_TAG, "Service initialized");
  }

  public convertDataToOperator(data: IOperatorResponse): IOperator {
    return {
      id: data.id,
      name: data.name,
      msisdn: data.msisdn?.trim(),
      email: data.email,
      description: data.description,
      iconUrl: data.iconUrl,
      color: data.colorHex?.slice(0, 7),
    };
  }

  public convertDataToOperators(data: IOperatorResponse[]): IOperator[] {
    return data.map((operator) => this.convertDataToOperator(operator));
  }

  public convertDataToOperatorRequest(data: IOperator): IOperatorResponse {
    return {
      id: data.id,
      name: data.name,
      msisdn: data.msisdn?.trim(),
      email: data.email?.trim(),
      iconUrl: data.iconUrl || "",
      description: data.description,
      colorHex: `${data.color}${this.ALPHA_CHANNEL}`.toUpperCase(),
    };
  }
}

export default new OperatorDataAdapter();
