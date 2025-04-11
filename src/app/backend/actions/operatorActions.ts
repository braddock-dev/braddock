'use server';

import OperatorManager from '@/app/backend/business/operators/OperatorManager';
import { IOperator, IToggleTreatment } from '@/app/backend/business/operators/data/OperatorDtos';

export async function getOperators(): Promise<IOperator[]> {
  return OperatorManager.getOperators();
}

export async function updateOperator(operatorId: string, data: Partial<IOperator>): Promise<IOperator> {
  return OperatorManager.updateOperator(operatorId, data);
}

export async function deleteOperator(operatorId: string): Promise<void> {
  return OperatorManager.deleteOperator(operatorId);
}

export async function createOperator(data: IOperator): Promise<IOperator> {
  return OperatorManager.createOperator(data);
}

export async function assignTreatments(operatorId: string, treatmentIds: string[]): Promise<void> {
  return OperatorManager.assignTreatments(operatorId, treatmentIds);
}

export async function unassignTreatments(operatorId: string, treatmentIds: string[]): Promise<void> {
  return OperatorManager.unassignTreatments(operatorId, treatmentIds);
}

export async function toggleTreatment(toggleTreatment: IToggleTreatment): Promise<void> {
  return OperatorManager.toggleTreatment(toggleTreatment);
}
