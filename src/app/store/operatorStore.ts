import { create } from "zustand";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";

export interface IOperatorStore {
  selectedOperator?: IOperator;
  setSelectedOperator: (operator?: IOperator) => void;
}

export const useOperatorStore = create<IOperatorStore>((set) => ({
  selectedOperator: undefined,
  setSelectedOperator: (operator) => set({ selectedOperator: operator }),
}));

export const operatorSelectors = {
  selectedOperator: (state: IOperatorStore) => state.selectedOperator,
  isAllSelected: (state: IOperatorStore) => !state.selectedOperator,
  isOperatorSelected: (state: IOperatorStore) => !!state.selectedOperator,
};

export const operatorActions = {
  setSelectedOperator: (state: IOperatorStore) => state.setSelectedOperator,
};
