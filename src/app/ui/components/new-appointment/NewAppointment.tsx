import { INewAppointmentRequestData } from "@/app/backend/business/appointments/data/AppointmentData";
import AppointmentInfoForm from "@/app/ui/components/appointment-details/AppointmentInfoForm";
import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { scheduleAppointment } from "@/app/backend/actions/appointmentActions";
import {
  newAppointmentActions,
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import { toast } from "sonner";
import { AuthRoles } from "@/app/backend/business/auth/data/AuthDtos";
import { Constants } from "@/app/utils/Constants";

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

  const setRequestedBy = useNewAppointmentStore(
    newAppointmentActions.setRequestedBy,
  );

  useEffect(() => {
    setRequestedBy(AuthRoles.BUSINESS);
  }, [setRequestedBy]);

  const { mutate: newAppointmentMutation, isPending } = useMutation({
    mutationKey: ["newAppointment"],
    mutationFn: (data: { appointmentData: INewAppointmentRequestData }) =>
      scheduleAppointment(
        data.appointmentData,
        Constants.TIMESLOTS.DEFAULT_DAYS_FORWARD,
      ),
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
            employeeId: appointmentStore.employeeId!,
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
