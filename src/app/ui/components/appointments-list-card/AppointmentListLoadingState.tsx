import SkeletonLoader from "@/app/ui/components/skeleton-loader/SkeletonLoader";
import styles from "./AppointmentListLoadingState.module.scss";

export default function AppointmentListLoadingState() {
  return (
    <div className={`flex flex-col gap-4 pr-2 h-full`}>
      <AppointmentItemLoadingState />
      <AppointmentItemLoadingState />
    </div>
  );
}

function AppointmentItemLoadingState() {
  return (
    <div
      className={"flex flex-col gap-3 justify-between bg-white rounded-md p-3"}
    >
      <div className={"flex items-center gap-3"}>
        <div
          className={
            "flex flex-col bg-lightBrown01 rounded-lg items-center relative"
          }
        >
          <div className={`${styles.loadingContainer} w-10 h-12`}>
            <SkeletonLoader />
          </div>
        </div>

        <div className={"flex flex-col gap-1 py-3 relative"}>
          <div className={`${styles.loadingContainer} w-[190px] h-4`}>
            <SkeletonLoader />
          </div>
          <div className={`${styles.loadingContainer}  w-24 h-3`}>
            <SkeletonLoader />
          </div>
        </div>
      </div>

      <div className={"grid grid-cols-2 gap-3 w-full relative"}>
        <div className={`${styles.loadingContainer} w-full h-9`}>
          <SkeletonLoader />
        </div>
        <div className={`${styles.loadingContainer} w-full h-9`}>
          <SkeletonLoader />
        </div>
      </div>
    </div>
  );
}
