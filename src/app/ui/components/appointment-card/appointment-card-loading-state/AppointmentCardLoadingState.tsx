import styles from "./AppointmentCardLoadingState.module.scss";
import SkeletonLoader from "@/app/ui/components/skeleton-loader/SkeletonLoader";

export default function AppointmentCardLoadingState() {
  return (
    <div className={styles.container}>
      <div className={styles.mainTitle}>
        <SkeletonLoader />
      </div>

      <div className={styles.items}>
        {Array.from({ length: 12 }).map((_, key) => (
          <div key={key} className={styles.item}>
            <SkeletonLoader />
          </div>
        ))}
      </div>
    </div>
  );
}
