import { useQuery } from "@tanstack/react-query";
import SelectComponent, { ISelectItem } from "../../select/Select";
import styles from "./OperatorSelector.module.scss";
import { getOperators } from "@/app/backend/actions/operatorActions";
import { useMemo } from "react";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";

interface IOperatorSelectorProps {
  selectedOperator: string | undefined;
  setSelectedOperator: (operator: IOperator | undefined) => void;
}
export default function OperatorSelector(props: IOperatorSelectorProps) {
  const { data: operators } = useQuery({
    queryKey: ["operators"],
    queryFn: () => getOperators(),
  });

  const selectItems: ISelectItem[] = useMemo(
    () =>
      operators?.map((operator) => ({
        label: operator.name,
        selectedDisplay: operator.name,
        value: operator.id,
        data: operator,
      })) || [],
    [operators]
  );

  return (
    <div className={styles.container}>
      <SelectComponent
        selectTriggerClassName={styles.selectTrigger}
        items={selectItems}
        placeholder="Selecione um operador"
        multiple={false}
        onChange={(items) => {
          const selectedItem = items[0];
          props.setSelectedOperator(selectedItem.data as IOperator);
        }}
        defaultValue={props.selectedOperator ? [props.selectedOperator] : undefined}
      />
    </div>
  );
}
