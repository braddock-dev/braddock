import styles from "./FourthStep.module.scss";
import AppointmentInfo from "@/app/ui/components/appointment-card/appointment-info/AppointmentInfo";
import React from "react";
import {
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";

export default function FourthStep() {
  const selectedTreatments = useNewAppointmentStore(
    newAppointmentSelectors.selectedTreatments,
  );

  const selectedTimeSlot = useNewAppointmentStore(
    newAppointmentSelectors.selectedTimeSlot,
  );

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>Agendamento concluído com sucesso!</h1>

        <AppointmentInfo
          selectedTreatments={selectedTreatments}
          selectedTimeSlot={selectedTimeSlot}
        />
      </div>
    </div>
  );
}
