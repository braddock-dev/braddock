import styles from "./FourthStep.module.scss";
import AppointmentInfo from "@/app/ui/components/appointment-card/appointment-info/AppointmentInfo";
import React from "react";
import {
  newAppointmentActions,
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";

interface IAppointmentInfoProps {
  onComplete: () => void;
}
export default function FourthStep(props: IAppointmentInfoProps) {
  const resetState = useNewAppointmentStore(newAppointmentActions.resetState);

  const selectedTreatments = useNewAppointmentStore(
    newAppointmentSelectors.selectedTreatments,
  );

  const selectedTimeSlot = useNewAppointmentStore(
    newAppointmentSelectors.selectedTimeSlot,
  );
  const handleResetState = () => {
    resetState();
    props.onComplete();
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>Agendamento concluído com sucesso!</h1>

        <AppointmentInfo
          selectedTreatments={selectedTreatments}
          selectedTimeSlot={selectedTimeSlot}
        />
      </div>

      <div className={styles.appointmentButtons}>
        <Button
          color={ButtonColors.WHITE}
          className={styles.button}
          onClick={handleResetState}
        >
          Fazer outro
        </Button>

        <Button
          color={ButtonColors.BROWN}
          className={styles.button}
          onClick={handleResetState}
        >
          Terminar
        </Button>
      </div>
    </div>
  );
}
