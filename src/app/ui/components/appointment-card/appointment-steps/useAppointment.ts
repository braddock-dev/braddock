import { useMutation } from "@tanstack/react-query";
import { IBaseNewAppointmentInfo } from "@/app/backend/business/appointments/data/AppointmentData";
import {
  editAppointment,
  scheduleAppointment,
} from "@/app/backend/actions/appointmentActions";
import { toast } from "sonner";
import JSConfetti from "js-confetti";
import {
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import { useMemo } from "react";
import { Constants } from "@/app/utils/Constants";

export function useAppointment(onAppointmentSuccess: () => void) {
  const isRescheduleMode = useNewAppointmentStore(
    newAppointmentSelectors.isRescheduleMode,
  );
  const appointmentId = useNewAppointmentStore(
    newAppointmentSelectors.appointmentId,
  );

  const { mutate: mutateNewAppointment, isPending: isPendingNewAppointment } =
    useMutation({
      mutationKey: ["newAppointment"],
      mutationFn: (newAppointmentData: IBaseNewAppointmentInfo) => {
        const appointmentData = {
          selectedTreatments: newAppointmentData.selectedTreatments,
          customerName: newAppointmentData.customerName,
          phoneNumber: newAppointmentData.phoneNumber,
          customerEmail: newAppointmentData.customerEmail,
          selectedTimeSlot: newAppointmentData.selectedTimeSlot,
          requestedBy: newAppointmentData.requestedBy,
          employeeId: newAppointmentData.employeeId!,
        };

        if (isRescheduleMode && appointmentId) {
          return editAppointment(appointmentId, appointmentData);
        } else {
          return scheduleAppointment(
            appointmentData,
            Constants.TIMESLOTS.DEFAULT_DAYS_FORWARD,
          );
        }
      },
      onError: () => {
        toast.error("Erro ao agendar, tente novamente");
      },
      onSuccess: () => {
        toast.success("Agendamento realizado com sucesso");
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
        onAppointmentSuccess();
      },
    });

  return {
    isPendingNewAppointment,
    mutateNewAppointment,
  };
}

export function useAppointmentInfo() {
  const selectedTreatments = useNewAppointmentStore(
    newAppointmentSelectors.selectedTreatments,
  );

  const totalDurationInMinutes = useMemo(() => {
    return selectedTreatments.reduce(
      (acc, treatment) => acc + treatment.durationInMinutes,
      0,
    );
  }, [selectedTreatments]);

  const totalDurationInHours = totalDurationInMinutes / 60;

  return {
    totalDurationInHours,
    totalDurationInMinutes,
  };
}
