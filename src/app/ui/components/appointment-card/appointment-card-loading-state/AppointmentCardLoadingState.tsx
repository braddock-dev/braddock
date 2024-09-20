import styles from "./AppointmentCardLoadingState.module.scss";
import SkeletonLoader from "@/app/ui/components/skeleton-loader/SkeletonLoader";

interface IAppointmentCardLoadingStateProps {
  itemsCount: number;
}
export default function AppointmentCardLoadingState(
  props: IAppointmentCardLoadingStateProps,
) {
  return (
    <div className={styles.container}>
      <div className={styles.mainTitle}>
        <SkeletonLoader />
      </div>

      <div className={styles.items}>
        {Array.from({ length: props.itemsCount }).map((_, key) => (
          <div key={key} className={styles.item}>
            <SkeletonLoader />
          </div>
        ))}
      </div>
    </div>
  );
}
