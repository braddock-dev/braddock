import React, { useEffect } from "react";
import { IAppointment } from "@/app/backend/business/treatments/data/AppointmentData";
import AppointmentInfo from "@/app/ui/components/appointment-details/AppointmentInfo";
import { useMutation } from "@tanstack/react-query";
import { deleteAppointment } from "@/app/backend/actions/appointmentActions";
import { toast } from "sonner";
import EditAppointmentWrapper from "@/app/ui/components/appointment-details/EditAppointmentWrapper";

interface IAppointmentDetailsProps {
  appointment?: IAppointment;
  onClose: () => void;
}
export default function AppointmentDetails({
  appointment,
  ...props
}: IAppointmentDetailsProps) {
  const [editMode, setEditMode] = React.useState(false);

  const { mutate: deleteAppointmentMutation, isPending: isPendingDeletion } =
    useMutation({
      mutationKey: ["deleteAppointment"],
      mutationFn: () => deleteAppointment(appointment?.id ?? ""),
      onError: () => {
        toast.error("Erro ao deletar o agendamento");
      },
      onSuccess: () => {
        toast.success("Agendamento deletado com sucesso");
        setEditMode(false);
        props.onClose?.();
      },
    });

  useEffect(() => {
    setEditMode(false);
  }, [appointment]);

  if (!appointment) {
    return <div>No Details</div>;
  }

  return editMode ? (
    <EditAppointmentWrapper
      appointment={appointment}
      onCancel={() => {
        setEditMode(false);
      }}
      onSave={() => {
        props.onClose();
      }}
    />
  ) : (
    <AppointmentInfo
      appointment={appointment}
      onEdit={() => setEditMode(true)}
      onDelete={() => deleteAppointmentMutation()}
      isDeleting={isPendingDeletion}
    />
  );
}
