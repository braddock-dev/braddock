"use client";

import styles from "./AppointmentCard.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentInfo } from "@/app/backend/actions/appointmentActions";
import { motion } from "framer-motion";
import { fadeInAnimation } from "@/app/utils/animations";
import AppointmentSteps from "@/app/ui/components/appointment-card/appointment-steps/AppointmentSteps";

interface IAppointmentCardProps {
  className?: string;
}
export default function AppointmentCard(props: IAppointmentCardProps) {
  const { data, isFetching } = useQuery({
    queryKey: ["appointmentInfo"],
    queryFn: () => getAppointmentInfo(),
  });

  if (isFetching || !data) return <div>Carregando...</div>;

  return (
    <motion.div
      {...fadeInAnimation}
      className={`${styles.container} ${props.className}`}
    >
      <h1 className={styles.title}>AGENDE UM HORÁRIO</h1>

      <AppointmentSteps dateSlots={data.dateSlots} services={data.services} />
    </motion.div>
  );
}
