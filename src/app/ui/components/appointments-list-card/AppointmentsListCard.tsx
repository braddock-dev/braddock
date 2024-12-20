"use client";
import styles from "./AppointmentsListCard.module.scss";
import { motion } from "framer-motion";
import AppointmentItem from "@/app/ui/components/appointments-list-card/AppointmentItem";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/app/backend/actions/appointmentActions";
import React, { useState } from "react";
import { IAppointmentQueryData } from "@/app/backend/business/treatments/data/AppointmentData";
import AppointmentListLoadingState from "@/app/ui/components/appointments-list-card/AppointmentListLoadingState";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import { HeroCardType, uiActions, useUIStore } from "@/app/store/uiStore";
import { getFutureXDaysDate, getPastXDaysDate } from "@/app/utils/functions";
import { Constants } from "@/app/utils/Constants";

interface IAppointmentCardProps {
  className?: string;
}
export default function AppointmentsListCard(props: IAppointmentCardProps) {
  const [filter] = useState<IAppointmentQueryData>({
    startDate: getPastXDaysDate(
      Constants.APPOINTMENTS.CUSTOMER_FILTER.DEFAULT_PAST_DAYS,
    ),
    endDate: getFutureXDaysDate(
      Constants.APPOINTMENTS.CUSTOMER_FILTER.DEFAULT_FUTURE_DAYS,
    ),
  });
  const setHeroCardType = useUIStore(uiActions.setHeroCardType);

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["appointments", filter],
    queryFn: () => getAppointments(filter),
  });

  const handleRefetch = () => {
    refetch();
  };

  return (
    <motion.div className={`${styles.container} ${props.className}`}>
      <h1 className={styles.title}>MEUS AGENDAMENTOS</h1>

      {isPending ? (
        <AppointmentListLoadingState />
      ) : error ? (
        <div
          className={"flex flex-col gap-4 pr-2  justify-center items-center"}
        >
          <p className={"w-[90%] text-red-500 text-center text-lg"}>
            Erro ao carregar os agendamentos
          </p>
          <Button
            color={ButtonColors.WHITE}
            onClick={() => {
              handleRefetch();
            }}
          >
            Tentar novamente
          </Button>
        </div>
      ) : data?.length ? (
        <div className={`flex flex-col gap-4 pr-2 h-full ${styles.content}`}>
          {data.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              appointment={appointment}
              onCancelSuccess={() => {
                refetch();
              }}
            />
          ))}
        </div>
      ) : (
        <div
          className={"flex flex-col gap-4 pr-2  justify-center items-center"}
        >
          <p className={"w-[95%] text-center text-xl text-white"}>
            Você ainda não possui agendamentos
          </p>
          <Button
            color={ButtonColors.BROWN}
            onClick={() => {
              setHeroCardType(HeroCardType.NEW_APPOINTMENT);
            }}
          >
            AGENDAR AGORA
          </Button>
        </div>
      )}
    </motion.div>
  );
}
