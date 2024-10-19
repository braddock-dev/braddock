import { useMutation } from "@tanstack/react-query";
import { IBaseNewAppointmentInfo } from "@/app/backend/business/appointments/data/AppointmentData";
import { scheduleAppointment } from "@/app/backend/actions/appointmentActions";
import { toast } from "sonner";
import JSConfetti from "js-confetti";

export function useAppointment(onAppointmentSuccess: () => void) {
  const { mutate: mutateNewAppointment, isPending: isPendingNewAppointment } =
    useMutation({
      mutationKey: ["newAppointment"],
      mutationFn: (newAppointmentData: IBaseNewAppointmentInfo) => {
        return scheduleAppointment({
          selectedTreatments: newAppointmentData.selectedTreatments,
          customerName: newAppointmentData.customerName,
          phoneNumber: newAppointmentData.phoneNumber,
          customerEmail: newAppointmentData.customerEmail,
          selectedTimeSlot: newAppointmentData.selectedTimeSlot,
        });
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
