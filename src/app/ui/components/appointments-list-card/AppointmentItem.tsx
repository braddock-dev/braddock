import { Button } from "@/components/ui/button";
import { IAppointment } from "@/app/backend/business/treatments/data/AppointmentData";
import dayjs from "@/app/utils/dayjs";
import { Constants } from "@/app/utils/Constants";
import React, { useState } from "react";
import AlertDialogWrapper from "@/app/ui/components/alert-dialog-wrapper/AlertDialogWrapper";
import { useMutation } from "@tanstack/react-query";
import { deleteAppointment } from "@/app/backend/actions/appointmentActions";
import { toast } from "sonner";
import { HeroCardType, uiActions, useUIStore } from "@/app/store/uiStore";
import {
  newAppointmentActions,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import { isDateInFuture } from "@/app/utils/functions";

interface IAppointmentItemProps {
  appointment: IAppointment;
  onCancelSuccess: () => void;
}
export default function AppointmentItem(props: IAppointmentItemProps) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const setHeroCardType = useUIStore(uiActions.setHeroCardType);
  const setAppointmentStore = useNewAppointmentStore(
    newAppointmentActions.setAppointmentStore,
  );

  const { mutate: deleteAppointmentMutation, isPending: isPendingDeletion } =
    useMutation({
      mutationKey: ["deleteAppointment"],
      mutationFn: () => deleteAppointment(props.appointment.id),
      onError: () => {
        toast.error("Erro ao cancelar este agendamento");
      },
      onSuccess: () => {
        toast.success("Agendamento cancelado com sucesso");
        props.onCancelSuccess?.();
      },
    });

  const handleReschedule = () => {
    setAppointmentStore(props.appointment);
    setHeroCardType(HeroCardType.NEW_APPOINTMENT);
  };

  return (
    <div
      className={"flex flex-col gap-3 justify-between bg-white rounded-md p-3"}
    >
      <div className={"flex items-center gap-3"}>
        <div
          className={
            "flex flex-col bg-lightBrown01 py-2 px-3 rounded-lg items-center"
          }
        >
          <span className={"font-bold text-sm text-brown"}>
            {dayjs(props.appointment.startTimeInMillis).format(
              Constants.DATE_FORMAT.DAY,
            )}
          </span>
          <span className={"font-bold text-sm text-brown capitalize"}>
            {dayjs(props.appointment.startTimeInMillis).format(
              Constants.DATE_FORMAT.SHORT_MONTH,
            )}
          </span>
        </div>

        <div className={"flex flex-col py-3"}>
          <span className={"font-bold text-sm text-brown"}>
            Agendamento para:{" "}
            {`${dayjs(props.appointment.startTimeInMillis).format(
              Constants.DATE_FORMAT.TIME,
            )} ${props.appointment.endTimeInMillis ? "até " + dayjs(props.appointment.endTimeInMillis).format(Constants.DATE_FORMAT.TIME) : ""}`}
          </span>
          <span className={"text-sm text-neutral-400"}>
            {props.appointment.treatments
              .map((treatment) => treatment.name)
              .join(", ")}
          </span>
        </div>
      </div>

      {isDateInFuture(props.appointment.startTimeInMillis) && (
        <div className={"grid grid-cols-2 gap-3 w-full"}>
          <Button
            className={"bg-red-500 w-full"}
            size={"sm"}
            onClick={() => {
              setShowCancelModal(true);
            }}
            disabled={isPendingDeletion}
          >
            Cancelar
          </Button>
          <Button
            className={"bg-brown w-full"}
            size={"sm"}
            disabled={isPendingDeletion}
            onClick={() => {
              handleReschedule();
            }}
          >
            Reagendar
          </Button>
        </div>
      )}

      <AlertDialogWrapper
        isOpen={showCancelModal}
        title={"Cancelar Agendamento?"}
        description={"Deseja realmente cancelar este agendamento?"}
        onOpenChange={setShowCancelModal}
        onCancel={() => {}}
        onConfirm={() => deleteAppointmentMutation()}
      />
    </div>
  );
}
