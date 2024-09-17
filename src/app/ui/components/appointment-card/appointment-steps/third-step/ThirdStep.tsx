import styles from "./ThirdStep.module.scss";
import Input from "@/app/ui/components/input/Input";
import React from "react";
import {
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import { Constants } from "@/app/utils/Constants";
import dayjs from "@/app/utils/dayjs";

export default function ThirdStep() {
  const selectedTreatments = useNewAppointmentStore(
    newAppointmentSelectors.selectedTreatments,
  );
  const selectedDaySlot = useNewAppointmentStore(
    newAppointmentSelectors.selectedDaySlot,
  );
  const selectedTimeSlot = useNewAppointmentStore(
    newAppointmentSelectors.selectedTimeSlot,
  );

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <p className={styles.title}>INFORMAÇÃO PESSOAL:</p>
        <div className={styles.formInputs}>
          <Input
            type={"text"}
            inputMode={"text"}
            name={"name"}
            placeholder={"Seu Nome"}
            floatingMode
            autoComplete={"name"}
          />

          <Input
            type={"tel"}
            inputMode={"tel"}
            name={"phone"}
            autoComplete={"tel"}
            placeholder={"Seu Contacto"}
            floatingMode
          />
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.title}>MEU AGENDAMENTO:</p>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <p className={styles.itemName}>Serviço:</p>
            <p className={styles.itemValue}>
              {selectedTreatments.map((treatment) => treatment.name).join(", ")}
            </p>
          </div>

          <div className={styles.infoItem}>
            <p className={styles.itemName}>Data:</p>
            <p className={styles.itemValue}>
              {dayjs(selectedTimeSlot?.timeInMillis).format(
                Constants.DATE_FORMAT.CUSTOM_FULL_DATE_TIME,
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
