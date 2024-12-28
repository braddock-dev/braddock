import styles from "./AppointmentInfo.module.scss";
import dayjs from "@/app/utils/dayjs";
import { Constants } from "@/app/utils/Constants";
import React from "react";
import {
  ITimeSlot,
  ITreatment,
} from "@/app/backend/business/treatments/data/TreatmentsData";
import { useAppointmentInfo } from "@/app/ui/components/appointment-card/appointment-steps/useAppointment";

interface IAppointmentInfoProps {
  selectedTreatments: ITreatment[];
  selectedTimeSlot?: ITimeSlot;
}
export default function AppointmentInfo(props: IAppointmentInfoProps) {
  const { totalDurationInMinutes } = useAppointmentInfo();

  return (
    <div className={styles.container}>
      <div className={styles.infoItem}>
        <p className={styles.itemName}>Serviço:</p>
        <p className={styles.itemValue}>
          {props.selectedTreatments
            .map((treatment) => treatment.name)
            .join(", ")}
        </p>
      </div>

      <div className={styles.infoItem}>
        <p className={styles.itemName}>Data:</p>
        <p className={styles.itemValue}>
          {dayjs(props.selectedTimeSlot?.timeInMillis).format(
            Constants.DATE_FORMAT.CUSTOM_FULL_DATE_TIME,
          )}
        </p>
      </div>

      <div className={styles.infoItem}>
        <p className={styles.itemName}>Duração do serviço</p>
        <p className={styles.itemValue}>{totalDurationInMinutes} Min</p>
      </div>
    </div>
  );
}
