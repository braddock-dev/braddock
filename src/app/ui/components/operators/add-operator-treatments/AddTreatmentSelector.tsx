import { useQuery } from "@tanstack/react-query";
import ButtonGroup, { DISPLAY_MODE, Theme } from "../../button-group/ButtonGroup";
import styles from "./AddTreatmentsSelector.module.scss";
import { getTreatmentsList } from "@/app/backend/actions/treatmentsActions";
import { useMemo } from "react";

import { ButtonType, ISelectButton } from "../../select-button/SelectButton";
import Spinner from "../../spinner/Spinner";

interface IAddOperatorSelectorProps {
  onSelect: (treatmentId: string) => void;
  onDeselect: (treatmentId: string) => void;
  selectedTreatments: string[];
  isLoading: boolean;
}
export default function AddOperatorSelector(props: IAddOperatorSelectorProps) {
  const {
    data: treatments,
    isLoading: isTreatmentsLoading,
    error,
  } = useQuery({
    queryKey: ["treatmentsList"],
    queryFn: () => getTreatmentsList(),
  });

  const treatmentButtons = useMemo(() => {
    if (!treatments || !treatments.length) {
      return [];
    }

    return treatments.map((treatment): ISelectButton => {
      return {
        text: (
          <span className={styles.buttonText}>
            <span className={styles.treatment}>{treatment.name}</span>
            <span className={styles.duration}>- {treatment.durationInMinutes} MIN</span>
          </span>
        ),
        type: ButtonType.horizontal,
        value: treatment.id,
        data: treatment,
      };
    });
  }, [treatments]);

  const isLoading = isTreatmentsLoading || props.isLoading;

  return (
    <div className={styles.container}>
      {isTreatmentsLoading ? (
        <Spinner className={styles.spinnerContainer} />
      ) : error ? (
        <p className={styles.errorMessage}>Não foi possível carregar os serviços</p>
      ) : (
        <ButtonGroup
          buttonItems={treatmentButtons}
          title={"SERVIÇOS"}
          theme={Theme.LIGHT}
          defaultSelectedKey={props.selectedTreatments}
          isMultiple
          displayMode={DISPLAY_MODE.LIST}
          onDeselect={props.onDeselect}
          onSelect={props.onSelect}
          isControlled
          fullHeight
          disabled={isLoading}
        />
      )}
    </div>
  );
}
