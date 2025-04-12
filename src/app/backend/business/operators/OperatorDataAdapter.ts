import Logger from "@/app/utils/Logger";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";
import { IOperatorResponse } from "@/app/backend/services/data/OperatorDaos";

class OperatorDataAdapter {
  private readonly LOG_TAG = "OperatorDataAdapter";

  constructor() {
    Logger.log(this.LOG_TAG, "Service initialized");
  }

  public convertDataToOperator(data: IOperatorResponse, index: number): IOperator {
    return {
      id: data.id,
      name: data.name,
      msisdn: data.msisdn,
      email: data.email,
      description: data.description,
      iconUrl: data.iconUrl,
      color: this.generateOperatorColors(index),
    };
  }

  public convertDataToOperators(data: IOperatorResponse[]): IOperator[] {
    return data.map((operator, index) => this.convertDataToOperator(operator, index));
  }

  public convertDataToOperatorRequest(data: IOperator): IOperatorResponse {
    return {
      id: data.id,
      name: data.name,
      msisdn: data.msisdn,
      email: data.email,
      iconUrl: data.iconUrl || "",
      description: data.description,
    };
  }

  private generateOperatorColors(index: number): string {
    const colors = [
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFF00",
      "#FF00FF",
      "#00FFFF",
      "#FFA500",
      "#800080",
      "#008000",
      "#000080",
      "#800000",
      "#808000",
      "#008080",
      "#808080",
      "#FFFFFF",
      "#000000",
    ];

    return colors[index % colors.length];
  }
}

export default new OperatorDataAdapter();
