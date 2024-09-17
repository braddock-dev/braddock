"use client";

import styles from "./AppointmentCard.module.scss";
import { motion } from "framer-motion";
import { fadeInAnimation } from "@/app/utils/animations";
import AppointmentSteps from "@/app/ui/components/appointment-card/appointment-steps/AppointmentSteps";

interface IAppointmentCardProps {
  className?: string;
}
export default function AppointmentCard(props: IAppointmentCardProps) {
  return (
    <motion.div
      {...fadeInAnimation}
      className={`${styles.container} ${props.className}`}
    >
      <h1 className={styles.title}>AGENDE UM HORÁRIO</h1>

      <AppointmentSteps />
    </motion.div>
  );
}
