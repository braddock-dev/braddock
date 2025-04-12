import { create } from "zustand";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";

export interface IOperatorStore {
  operators: IOperator[];
  selectedOperator?: IOperator;
  setSelectedOperator: (operator?: IOperator) => void;
  setOperators: (operators: IOperator[]) => void;
}

export const useOperatorStore = create<IOperatorStore>((set) => ({
  operators: [],
  selectedOperator: undefined,
  setSelectedOperator: (operator) => set({ selectedOperator: operator }),
  setOperators: (operators) => set({ operators }),
}));

export const operatorSelectors = {
  operators: (state: IOperatorStore) => state.operators,
  selectedOperator: (state: IOperatorStore) => state.selectedOperator,
  isAllSelected: (state: IOperatorStore) => !state.selectedOperator,
  isOperatorSelected: (state: IOperatorStore) => !!state.selectedOperator,
};

export const operatorActions = {
  setSelectedOperator: (state: IOperatorStore) => state.setSelectedOperator,
  setOperators: (state: IOperatorStore) => state.setOperators,
};
