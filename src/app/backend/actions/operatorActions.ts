"use server";

import OperatorManager from "@/app/backend/business/operators/OperatorManager";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";

export async function getOperators(): Promise<IOperator[]> {
  return OperatorManager.getOperators();
} 