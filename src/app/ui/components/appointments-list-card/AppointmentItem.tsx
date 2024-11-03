import { Button } from "@/components/ui/button";
import { IAppointment } from "@/app/backend/business/treatments/data/AppointmentData";
import dayjs from "dayjs";
import { Constants } from "@/app/utils/Constants";
import React, { useState } from "react";
import AlertDialogWrapper from "@/app/ui/components/alert-dialog-wrapper/AlertDialogWrapper";
import { useMutation } from "@tanstack/react-query";
import { deleteAppointment } from "@/app/backend/actions/appointmentActions";
import { toast } from "sonner";

interface IAppointmentItemProps {
  appointment: IAppointment;
  onCancelSuccess: () => void;
}
export default function AppointmentItem(props: IAppointmentItemProps) {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const { mutate: deleteAppointmentMutation, isPending: isPendingDeletion } =
    useMutation({
      mutationKey: ["deleteAppointment"],
      mutationFn: () => deleteAppointment(props.appointment.id ?? ""),
      onError: () => {
        toast.error("Erro ao cancelar este agendamento");
      },
      onSuccess: () => {
        toast.success("Agendamento cancelado com sucesso");
        props.onCancelSuccess?.();
      },
    });

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
            )} até ${dayjs(props.appointment.endTimeInMillis).format(Constants.DATE_FORMAT.TIME)}`}
          </span>
          <span className={"text-sm text-neutral-400"}>
            {props.appointment.treatments
              .map((treatment) => treatment.name)
              .join(", ")}
          </span>
        </div>
      </div>

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
        >
          Reagendar
        </Button>
      </div>

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
