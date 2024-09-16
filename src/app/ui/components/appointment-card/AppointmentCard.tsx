"use client";

import styles from "./AppointmentCard.module.scss";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { fadeInAnimation } from "@/app/utils/animations";
import AppointmentSteps from "@/app/ui/components/appointment-card/appointment-steps/AppointmentSteps";
import { toast } from "sonner";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import AppointmentCardLoadingState from "@/app/ui/components/appointment-card/appointment-card-loading-state/AppointmentCardLoadingState";
import { getTreatmentsList } from "@/app/backend/actions/treatmentsActions";

interface IAppointmentCardProps {
  className?: string;
}
export default function AppointmentCard(props: IAppointmentCardProps) {
  const {
    data: treatments,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["treatmentsList"],
    queryFn: () => getTreatmentsList(),
  });

  if (isLoading) {
    return (
      <div className={styles.container} data-loading-state={true}>
        <AppointmentCardLoadingState />
      </div>
    );
  }

  if (isError || error) {
    toast.error("Erro ao carregar os Serviços");
    return (
      <div className={styles.container} data-error-state={true}>
        <p className={styles.errorMessage}>Erro ao carregar os tratamentos</p>
        <Button color={ButtonColors.WHITE} onClick={() => refetch()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      {...fadeInAnimation}
      className={`${styles.container} ${props.className}`}
    >
      <h1 className={styles.title}>AGENDE UM HORÁRIO</h1>

      <AppointmentSteps dateSlots={[]} treatments={treatments || []} />
    </motion.div>
  );
}
