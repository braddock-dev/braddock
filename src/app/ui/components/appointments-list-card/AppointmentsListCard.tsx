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

export default function AppointmentsListCard() {
  const [filter, setFilter] = useState<IAppointmentQueryData>({});

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["appointments", filter],
    queryFn: () => getAppointments(filter),
  });

  const handleRefetch = () => {
    refetch();
  };

  return (
    <motion.div className={`${styles.container}`}>
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
          <p className={"w-[85%] text-center text-xl"}>
            Você ainda não possui agendamentos
          </p>
        </div>
      )}
    </motion.div>
  );
}
