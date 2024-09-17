import styles from "./FirstStep.module.scss";
import ButtonGroup, {
  DISPLAY_MODE,
} from "@/app/ui/components/button-group/ButtonGroup";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTreatmentsList } from "@/app/backend/actions/treatmentsActions";
import { toast } from "sonner";
import AppointmentCardLoadingState from "@/app/ui/components/appointment-card/appointment-card-loading-state/AppointmentCardLoadingState";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import {
  ButtonType,
  ISelectButton,
} from "@/app/ui/components/select-button/SelectButton";
import {
  newAppointmentActions,
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";

export default function FirstStep() {
  const selectedTreatment = useNewAppointmentStore(
    newAppointmentSelectors.selectedTreatment,
  );
  const setTreatments = useNewAppointmentStore(
    newAppointmentActions.setTreatments,
  );
  const setSelectedTreatment = useNewAppointmentStore(
    newAppointmentActions.setSelectedTreatment,
  );

  const {
    data: treatments,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["treatmentsList"],
    queryFn: () => getTreatmentsList(),
  });

  useEffect(() => {
    if (treatments) {
      setTreatments(treatments);
    }
  }, [treatments]);

  if (isLoading) {
    return (
      <div className={styles.container} data-loading-state={true}>
        <AppointmentCardLoadingState itemsCount={7} />
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

  const daySlotButtons = treatments.map((service): ISelectButton => {
    return {
      text: <span className={styles.buttonText}>{service.name}</span>,
      type: ButtonType.horizontal,
      value: service.id,
    };
  });

  const handleSelectedButtonsChange = (selectedTreatmentId: string[]) => {
    if (selectedTreatmentId && selectedTreatmentId[0]) {
      setSelectedTreatment(selectedTreatmentId[0]);
    }
  };

  return (
    <div className={styles.container} key={"SERVICES_SELECTION"}>
      <ButtonGroup
        buttonItems={daySlotButtons}
        title={"SERVIÇOS"}
        defaultSelected={selectedTreatment || daySlotButtons[0]?.value}
        isMultiple={false}
        displayMode={DISPLAY_MODE.LIST}
        onSelectedButtonsChange={handleSelectedButtonsChange}
      />
    </div>
  );
}
