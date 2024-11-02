import { INewAppointmentRequestData } from "@/app/backend/business/appointments/data/AppointmentData";
import AppointmentInfoForm from "@/app/ui/components/appointment-details/AppointmentInfoForm";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { scheduleAppointment } from "@/app/backend/actions/appointmentActions";
import {
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import { toast } from "sonner";

interface INewAppointmentProps {
  onClose: () => void;
}
export default function NewAppointment(props: INewAppointmentProps) {
  const appointmentStore = useNewAppointmentStore(
    newAppointmentSelectors.appointmentStore,
  );

  const isAppointmentValid = useNewAppointmentStore(
    newAppointmentSelectors.isAppointmentValidWithoutCustomer,
  );

  const { mutate: newAppointmentMutation, isPending } = useMutation({
    mutationKey: ["newAppointment"],
    mutationFn: (data: { appointmentData: INewAppointmentRequestData }) =>
      scheduleAppointment(data.appointmentData),
    onError: () => {
      toast.error("Erro ao agendar o horário");
    },
    onSuccess: () => {
      toast.success("Horário agendado com sucesso");
      props.onClose();
    },
  });

  return (
    <AppointmentInfoForm
      onCancel={props.onClose}
      onSave={() => {
        newAppointmentMutation({
          appointmentData: {
            customerEmail: appointmentStore.customerEmail,
            customerName: appointmentStore.customerName,
            phoneNumber: appointmentStore.phoneNumber,
            selectedTimeSlot: appointmentStore.selectedTimeSlot,
            selectedTreatments: appointmentStore.selectedTreatments,
          } satisfies INewAppointmentRequestData,
        });
      }}
      isSaving={isPending}
      isValid={isAppointmentValid}
    />
  );
}
