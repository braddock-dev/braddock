import React, { useEffect } from "react";
import { IAppointment } from "@/app/backend/business/treatments/data/AppointmentData";
import AppointmentInfo from "@/app/ui/components/appointment-details/AppointmentInfo";
import AppointmentInfoForm from "@/app/ui/components/appointment-details/AppointmentInfoForm";
import { useMutation } from "@tanstack/react-query";
import { deleteAppointment } from "@/app/backend/actions/appointmentActions";
import { toast } from "sonner";

interface IAppointmentDetailsProps {
  appointment?: IAppointment;
  onClose?: () => void;
}
export default function AppointmentDetails({
  appointment,
  ...props
}: IAppointmentDetailsProps) {
  const [editMode, setEditMode] = React.useState(false);

  const { mutate: deleteAppointmentMutation, isPending: isPendingDeletion } =
    useMutation({
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
    <AppointmentInfoForm
      appointment={appointment}
      onCancel={() => {
        setEditMode(false);
      }}
      onSave={() => setEditMode(false)}
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
