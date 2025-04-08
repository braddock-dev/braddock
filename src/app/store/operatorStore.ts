import { create } from "zustand";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";

export interface IOperatorStore {
  selectedOperator: IOperator | "all" | null;
  setSelectedOperator: (operator: IOperator | "all" | null) => void;
}

export const useOperatorStore = create<IOperatorStore>((set) => ({
  selectedOperator: null,
  setSelectedOperator: (operator) => set({ selectedOperator: operator }),
}));

export const operatorSelectors = {
  selectedOperator: (state: IOperatorStore) => state.selectedOperator,
  isAllSelected: (state: IOperatorStore) => state.selectedOperator === "all",
  isOperatorSelected: (state: IOperatorStore) => state.selectedOperator !== null && state.selectedOperator !== "all",
};

export const operatorActions = {
  setSelectedOperator: (state: IOperatorStore) => state.setSelectedOperator,
}; 