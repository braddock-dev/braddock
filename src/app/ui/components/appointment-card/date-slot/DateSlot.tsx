import styles from "./DateSlot.module.scss";
import { IDateSlot } from "@/app/backend/appointments/AppointmentsData";
import dayjs from "dayjs";
import { Constants } from "@/app/utils/Constants";

export default function DateSlot({ dateSlot }: { dateSlot: IDateSlot }) {
  return (
    <div className={styles.container}>
      <span className={styles.date}>
        {dayjs(dateSlot.date).format(Constants.DATE_FORMAT.DAY)}
      </span>
      <span className={styles.weekday}>
        {dayjs(dateSlot.date).format(Constants.DATE_FORMAT.WEEKDAY)}
      </span>
    </div>
  );
}
