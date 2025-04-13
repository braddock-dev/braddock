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
      color: data.color || this.generateOperatorColors(index),
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
      // color: data.color, // TODO: Add color to the operator
    };
  }

  private generateOperatorColors(index: number): string {
    const colors = ["#b47866", "#336699", "#8338ec", "#03045e", "#fb6f92", "#344e41", "#2a9d8f", "#386641", "#e07a5f", "#f694c1", "#376996"];

    return colors[index % colors.length];
  }
}

export default new OperatorDataAdapter();
