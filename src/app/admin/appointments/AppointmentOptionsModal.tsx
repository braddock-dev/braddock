"use client";

import OperatorSelector from "@/app/ui/components/operators/operator-selector/OperatorSelector";
import { CalendarIcon, CircleX } from "lucide-react";
import { useState } from "react";

enum CardOptions {
  NEW_APPOINTMENT = "new-appointment",
  BLOCK_TIME = "block-time",
}

interface IAppointmentOptionsModalProps {
  onNewAppointment: () => void;
  onBlockTime: (operatorId: string) => void;
  operatorId?: string;
}
export default function AppointmentOptionsModal(props: IAppointmentOptionsModalProps) {
  const [selectedOperator, setSelectedOperator] = useState(props.operatorId);
  const [showOperatorSelector, setShowOperatorSelector] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardOptions>();

  return (
    <div className="flex flex-col gap-4">
      <div className={"flex p-4 gap-4 items-center justify-center py-6"}>
        <div
          className={`flex items-center justify-center flex-col gap-4 rounded-xl bg-gray-50 p-6 hover:bg-gray-200/90 hover:cursor-pointer ${selectedCard === CardOptions.NEW_APPOINTMENT ? "bg-gray-200/90" : ""}`}
          onClick={() => {
            setSelectedCard(CardOptions.NEW_APPOINTMENT);
            props.onNewAppointment();
          }}
        >
          <CalendarIcon size={48} className={"stroke-green-400"} />
          <span className={"text-md text-neutral-700 text-center"}>Novo Agendamento</span>
        </div>

        <div
          className={`flex items-center justify-center flex-col bg-gray-50 gap-4 rounded-xl p-6 hover:bg-gray-200/90 hover:cursor-pointer ${selectedCard === CardOptions.BLOCK_TIME ? "bg-gray-200/90" : ""}`}
          onClick={() => {
            setSelectedCard(CardOptions.BLOCK_TIME);
            if (selectedOperator) {
              props.onBlockTime(selectedOperator);
            } else {
              setShowOperatorSelector(true);
            }
          }}
        >
          <CircleX size={48} className={"stroke-red-400"} />
          <span className={"text-md text-neutral-700 text-center"}>Bloquear Horário</span>
        </div>
      </div>

      {showOperatorSelector && (
        <div className="w-full">
          <OperatorSelector
            setSelectedOperator={(operator) => {
              if (operator?.id) {
                setSelectedOperator(operator.id);
                props.onBlockTime(operator.id);
              }
            }}
            selectedOperator={props.operatorId}
          />
        </div>
      )}
    </div>
  );
}
