import AppointmentInfoForm from "@/app/ui/components/appointment-details/AppointmentInfoForm";
import React, { useEffect } from "react";
import { IAppointment } from "@/app/backend/business/treatments/data/AppointmentData";
import {
  newAppointmentActions,
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import { useMutation } from "@tanstack/react-query";
import { editAppointment } from "@/app/backend/actions/appointmentActions";
import { INewAppointmentRequestData } from "@/app/backend/business/appointments/data/AppointmentData";
import { toast } from "sonner";
import { AuthRoles } from "@/app/backend/business/auth/data/AuthDtos";

interface IAppointmentInfoFormProps {
  appointment: IAppointment;
  onCancel: () => void;
  onSave: () => void;
}
export default function EditAppointmentWrapper(
  props: IAppointmentInfoFormProps,
) {
  const setAppointmentStore = useNewAppointmentStore(
    newAppointmentActions.setAppointmentStore,
  );

  const appointmentStore = useNewAppointmentStore(
    newAppointmentSelectors.appointmentStore,
  );

  const isAppointmentValid = useNewAppointmentStore(
    newAppointmentSelectors.isAppointmentValid,
  );

  const setRequestedBy = useNewAppointmentStore(
    newAppointmentActions.setRequestedBy,
  );

  useEffect(() => {
    setRequestedBy(AuthRoles.BUSINESS);
  }, [setRequestedBy]);

  const { mutate: editAppointmentMutation, isPending } = useMutation({
    mutationKey: ["editAppointment"],
    mutationFn: (data: {
      id: string;
      appointmentData: INewAppointmentRequestData;
    }) => editAppointment(data.id, data.appointmentData),
    onError: () => {
      toast.error("Erro ao editar o agendamento");
    },
    onSuccess: () => {
      toast.success("Agendamento editado com sucesso");
      props.onSave();
    },
  });

  useEffect(() => {
    setAppointmentStore(props.appointment);
  }, [props.appointment]);

  return (
    <AppointmentInfoForm
      onCancel={props.onCancel}
      onSave={() => {
        editAppointmentMutation({
          id: props.appointment.id,
          appointmentData: {
            customerEmail: appointmentStore.customerEmail,
            customerName: appointmentStore.customerName,
            phoneNumber: appointmentStore.phoneNumber,
            selectedTimeSlot: appointmentStore.selectedTimeSlot,
            selectedTreatments: appointmentStore.selectedTreatments,
            requestedBy: appointmentStore.requestedBy,
          } satisfies INewAppointmentRequestData,
        });
      }}
      isSaving={isPending}
      isValid={isAppointmentValid}
    />
  );
}
