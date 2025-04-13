"use client";

import { CalendarIcon, CircleX } from "lucide-react";

interface IAppointmentOptionsModalProps {
  onNewAppointment: () => void;
  onBlockTime: () => void;
}
export default function AppointmentOptionsModal(
  props: IAppointmentOptionsModalProps,
) {
  return (
    <div className={"flex p-4 gap-4 items-center justify-center py-6"}>
      <div
        className={
          "flex items-center justify-center flex-col gap-4 rounded-xl bg-gray-50 p-6 hover:bg-gray-200/90 hover:cursor-pointer"
        }
        onClick={props.onNewAppointment}
      >
        <CalendarIcon size={48} className={"stroke-green-400"} />
        <span className={"text-md text-neutral-700 text-center"}>
          Novo Agendamento
        </span>
      </div>

      <div
        className={
          "flex items-center justify-center flex-col bg-gray-50 gap-4 rounded-xl p-6 hover:bg-gray-200/90 hover:cursor-pointer"
        }
        onClick={props.onBlockTime}
      >
        <CircleX size={48} className={"stroke-red-400"} />
        <span className={"text-md text-neutral-700 text-center"}>
          Bloquear Horário
        </span>
      </div>
    </div>
  );
}
