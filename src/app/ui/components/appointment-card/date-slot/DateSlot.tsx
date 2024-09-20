import styles from "./DateSlot.module.scss";
import dayjs from "dayjs";
import { Constants } from "@/app/utils/Constants";
import { IDaySlot } from "@/app/backend/business/treatments/data/TreatmentsData";

export default function DateSlot({ dateSlot }: { dateSlot: IDaySlot }) {
  return (
    <div className={styles.container}>
      <span className={styles.date}>
        {dayjs(dateSlot.dayInMillis).format(Constants.DATE_FORMAT.DAY)}
      </span>
      <span className={styles.weekday}>
        {dayjs(dateSlot.dayInMillis).format(Constants.DATE_FORMAT.WEEKDAY)}
      </span>
    </div>
  );
}
