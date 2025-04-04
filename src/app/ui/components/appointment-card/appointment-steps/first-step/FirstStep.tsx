import styles from "./FirstStep.module.scss";
import ButtonGroup, {
  DISPLAY_MODE,
} from "@/app/ui/components/button-group/ButtonGroup";
import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTreatmentsList } from "@/app/backend/actions/treatmentsActions";
import { toast } from "sonner";
import AppointmentCardLoadingState from "@/app/ui/components/appointment-card/appointment-card-loading-state/AppointmentCardLoadingState";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import {
  newAppointmentActions,
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import { ITreatment } from "@/app/backend/business/treatments/data/TreatmentsData";
import {
  ButtonType,
  ISelectButton,
} from "@/app/ui/components/select-button/SelectButton";
import SelectComponent, {
  ISelectItem,
  ItemType,
} from "@/app/ui/components/select/Select";

export enum SelectionMode {
  SELECT = "SELECT",
  LIST = "LIST",
}

interface IFirstStepProps {
  isValidChange: (isValid: boolean) => void;
  selectionMode?: SelectionMode;
}
export default function FirstStep({
  selectionMode = SelectionMode.LIST,
  ...props
}: IFirstStepProps) {
  const selectedTreatmentsIds = useNewAppointmentStore(
    newAppointmentSelectors.selectedTreatmentsIds,
  );
  const setTreatments = useNewAppointmentStore(
    newAppointmentActions.setTreatments,
  );
  const setSelectedTreatment = useNewAppointmentStore(
    newAppointmentActions.setSelectedTreatment,
  );

  const employeeId = useNewAppointmentStore(
    newAppointmentSelectors.employeeId,
  );

  const {
    data: treatments,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["treatmentsList", [employeeId]],
    queryFn: () => getTreatmentsList(employeeId || ""),
  });

  useEffect(() => {
    if (treatments) {
      setTreatments(treatments);
    }
  }, [setTreatments, treatments]);

  const treatmentButtons = useMemo(() => {
    if (!treatments || !treatments.length) {
      return [];
    }

    return treatments.map((treatment): ISelectButton => {
      return {
        text: (
          <span className={styles.buttonText}>
            <span className={styles.treatment}>{treatment.name}</span>
            <span className={styles.duration}>
              - {treatment.durationInMinutes} MIN
            </span>
          </span>
        ),
        type: ButtonType.horizontal,
        value: treatment.id,
        data: treatment,
      };
    });
  }, [treatments]);

  useEffect(() => {
    props.isValidChange(!!treatments?.length && !!selectedTreatmentsIds.length);
  }, [treatments, selectedTreatmentsIds]);

  const options = useMemo((): ISelectItem[] => {
    if (!treatments) return [];

    return treatments.map((treatment) => ({
      label: `${treatment.name} - ${treatment.durationInMinutes} Min`,
      selectedDisplay: treatment.name,
      value: treatment.id,
      type: ItemType.SIMPLE,
      data: treatment,
    }));
  }, [treatments]);

  if (isLoading) {
    return (
      <div className={styles.container} data-loading-state={true}>
        <AppointmentCardLoadingState itemsCount={16} />
      </div>
    );
  }

  if (isError || error) {
    toast.error("Erro ao carregar os Serviços");
    return (
      <div className={styles.container} data-error-state={true}>
        <p className={styles.errorMessage}>Erro ao carregar os Serviços</p>
        <Button color={ButtonColors.WHITE} onClick={() => refetch()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  if (!treatments) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyState}>Nenhum serviço disponível</p>
        <Button color={ButtonColors.WHITE} onClick={() => refetch()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  const handleSelectedButtonsChange = (
    _: string[],
    selectedTreatments: ITreatment[],
  ) => {
    if (selectedTreatments) {
      setSelectedTreatment(selectedTreatments);
    }
  };

  return (
    <div
      className={styles.container}
      key={"SERVICES_SELECTION"}
      data-selection-mode={selectionMode}
    >
      {selectionMode === SelectionMode.LIST ? (
        <ButtonGroup
          buttonItems={treatmentButtons}
          title={"SERVIÇOS"}
          defaultSelectedKey={selectedTreatmentsIds}
          isMultiple
          displayMode={DISPLAY_MODE.LIST}
          onSelectedButtonsChange={handleSelectedButtonsChange}
        />
      ) : (
        <SelectComponent
          placeholder={"Selecione os serviços"}
          onChange={(selected) => {
            const treatments = selected.map(
              (selectedItem) => selectedItem.data,
            );
            handleSelectedButtonsChange([], treatments);
          }}
          items={options}
          defaultValue={selectedTreatmentsIds}
          maxHeight={500}
        />
      )}
    </div>
  );
}
