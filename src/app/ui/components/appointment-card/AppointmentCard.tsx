"use client";

import styles from "./AppointmentCard.module.scss";
import { motion } from "framer-motion";
import AppointmentSteps from "@/app/ui/components/appointment-card/appointment-steps/AppointmentSteps";
import { useAppointmentInfo } from "@/app/ui/components/appointment-card/appointment-steps/useAppointment";
import { defaultAppearAnimation } from "@/app/utils/animations";

interface IAppointmentCardProps {
  className?: string;
}
export default function AppointmentCard(props: IAppointmentCardProps) {
  const { totalDurationInMinutes } = useAppointmentInfo();

  return (
    <motion.div className={`${styles.container} ${props.className}`}>
      <div className={"flex gap-2 justify-between items-center"}>
        <h1 className={styles.title}>AGENDE UM HORÁRIO</h1>

        {totalDurationInMinutes > 0 && (
          <motion.span
            {...defaultAppearAnimation}
            className={"font-bold text-lightBrown01 md:pr-4 pr-1  md:text-md"}
          >
            ({totalDurationInMinutes} Min)
          </motion.span>
        )}
      </div>

      <AppointmentSteps />
    </motion.div>
  );
}
