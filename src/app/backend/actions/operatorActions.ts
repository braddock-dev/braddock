"use server";

import OperatorManager from "@/app/backend/business/operators/OperatorManager";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";

export async function getOperators(): Promise<IOperator[]> {
  return OperatorManager.getOperators();
}

export async function updateOperator(
  operatorId: string,
  data: Partial<IOperator>
): Promise<IOperator> {
  return OperatorManager.updateOperator(operatorId, data);
}

export async function deleteOperator(operatorId: string): Promise<void> {
  return OperatorManager.deleteOperator(operatorId);
} 