"use client";

import { useMemo, useRef, useState } from "react";
import { EventType, IAppointment, IAppointmentQueryData, SelectDateTimeInfo } from "@/app/backend/business/treatments/data/AppointmentData";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/app/backend/actions/appointmentActions";
import { convertAppointmentsToEvents, convertTimeOffsToEvents } from "@/app/admin/appointments/utils";
import { toast } from "sonner";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import CalendarWrapper from "@/app/admin/appointments/CalendarWrapper";
import AppointmentDetails from "@/app/ui/components/appointment-details/AppointmentDetails";
import SidePanelWrapper from "@/app/ui/components/side-panel-wrapper/SidePanelWrapper";
import { newAppointmentActions, useNewAppointmentStore } from "@/app/store/newAppointmentStore";
import NewAppointment from "@/app/ui/components/new-appointment/NewAppointment";
import DialogWrapper from "@/app/ui/components/dialog-wrapper/DialogWrapper";
import AppointmentOptionsModal from "@/app/admin/appointments/AppointmentOptionsModal";
import { deleteTimeOff, getTimeOffs, registerTimeOff } from "@/app/backend/actions/timeOffActions";
import { IDateInterval } from "@/app/backend/business/appointments/data/AppointmentData";
import AlertDialogWrapper from "@/app/ui/components/alert-dialog-wrapper/AlertDialogWrapper";
import dayjs from "@/app/utils/dayjs";
import { Constants } from "@/app/utils/Constants";
import { getFutureXDaysDate, getPastXDaysDate } from "@/app/utils/functions";
import { operatorSelectors, useOperatorStore } from "@/app/store/operatorStore";

export default function AppointmentsPageContent() {
  const [selectedDateInterval, setSelectedDateInterval] = useState<IDateInterval>();

  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [removeTimeOffModalOpen, setRemoveTimeOffModalOpen] = useState(false);
  const [selectedTimeOff, setSelectedTimeOff] = useState<string | undefined>();

  const [appointmentDetailsModalOpen, setAppointmentDetailsModalOpen] = useState(false);

  const [newAppointmentModalOpen, setNewAppointmentModalOpen] = useState(false);

  const resetNewAppointmentStore = useNewAppointmentStore(newAppointmentActions.resetState);

  const setRecommendedDate = useNewAppointmentStore(newAppointmentActions.setRecommendedDate);

  const selectedOperator = useOperatorStore(operatorSelectors.selectedOperator);

  const operators = useOperatorStore(operatorSelectors.operators);

  const overlayButtonRef = useRef<HTMLButtonElement | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment>();

  const filter = useMemo(
    (): IAppointmentQueryData => ({
      startDate: getPastXDaysDate(Constants.APPOINTMENTS.BUSINESS_FILTER.DEFAULT_PAST_DAYS),
      endDate: getFutureXDaysDate(Constants.APPOINTMENTS.BUSINESS_FILTER.DEFAULT_FUTURE_DAYS),
      operatorId: selectedOperator?.id,
    }),
    [selectedOperator?.id]
  );

  const { data, error, refetch } = useQuery({
    queryKey: ["appointments", filter],
    queryFn: () => getAppointments(filter),
    refetchInterval: Constants.APPOINTMENTS.REFETCH_INTERVAL,
  });

  const { data: timeOffs, refetch: refetchTimeOffs } = useQuery({
    queryKey: ["timeOffs", selectedOperator?.id],
    queryFn: () => getTimeOffs(selectedOperator?.id),
    refetchInterval: Constants.APPOINTMENTS.REFETCH_INTERVAL,
  });

  const { mutate: removeTimeOffMutation } = useMutation({
    mutationKey: ["removeTimeOff"],
    mutationFn: deleteTimeOff,
    onError: () => {
      toast.error("Erro ao remover o horário de folga");
    },
    onSuccess: () => {
      toast.success("Horário de folga removido com sucesso");
      refetchTimeOffs();
    },
  });

  const { mutate: mutateRegisterTimeOff } = useMutation({
    mutationKey: ["registerTimeOff"],
    mutationFn: registerTimeOff,
    onError: () => {
      toast.error("Erro ao registrar o horário de folga");
    },
    onSuccess: () => {
      toast.success("Horário de folga registrado com sucesso");
      refetchTimeOffs();
      refetch();
    },
  });

  const events = useMemo(() => {
    return [...convertAppointmentsToEvents(data || [], operators), ...convertTimeOffsToEvents(timeOffs || [], operators)];
  }, [data, timeOffs, operators]);

  if (error) {
    toast.error("Erro ao carregar os agendamentos.");

    return (
      <div className={"flex flex-col w-full justify-center items-center h-[80vh] gap-5"}>
        <h2 className={"text-xl font-bold text-brown"}>Erro ao carregar os agendamentos</h2>
        <Button color={ButtonColors.BLACK} onClick={() => refetch()}>
          Tentar Novamente
        </Button>
      </div>
    );
  }

  function openEventDetails(appointmentId: string) {
    if (data) {
      const appointment = data.find((appointment) => appointment.id === appointmentId);

      if (!appointment) {
        toast.error("Erro ao carregar os detalhes do agendamento");
        return;
      }

      setSelectedAppointment(appointment);
      setAppointmentDetailsModalOpen(true);
    }
  }

  const openTimeOffDetails = (timeOffId: string) => {
    setRemoveTimeOffModalOpen(true);
    setSelectedTimeOff(timeOffId);
  };

  const handleClickEvent = (event: any) => {
    switch (event.event.raw?.type) {
      case EventType.APPOINTMENT:
        openEventDetails(event.event.id);
        break;
      case EventType.TIME_OFF:
        openTimeOffDetails(event.event.id);
        break;
    }
  };

  const handleSelectDateTime = (event: SelectDateTimeInfo) => {
    if (event.start.getDay() === 0) {
      toast.warning("Não é possível agendar para domingo");
      return;
    }

    if (dayjs().isAfter(event.start)) {
      toast.warning("Não é possível agendar para datas passadas");
      return;
    }

    setSelectedDateInterval({
      start: event.start.getTime(),
      end: event.end.getTime(),
    });

    setShowNewEventModal(true);
    setRecommendedDate(event.start);
  };

  const handleCloseDetailsSidePanel = () => {
    setSelectedAppointment(undefined);
    setAppointmentDetailsModalOpen(false);
    resetNewAppointmentStore();
    refetch();
  };

  const handleCloseNewAppointmentSidePanel = () => {
    setNewAppointmentModalOpen(false);
    resetNewAppointmentStore();
    refetch();
  };

  const handleNewAppointment = () => {
    setShowNewEventModal(false);
    setNewAppointmentModalOpen(true);
  };

  const handleBlockTime = (operatorId: string) => {
    setShowNewEventModal(false);

    if (selectedDateInterval && operatorId) {
      mutateRegisterTimeOff({
        startTimeInMillis: selectedDateInterval.start,
        endTimeInMillis: selectedDateInterval.end,
        operatorId: operatorId,
      });
    }
  };

  const handleRemoveTimeOff = () => {
    if (selectedTimeOff) {
      removeTimeOffMutation(Number(selectedTimeOff));
    }
  };

  return (
    <div>
      <CalendarWrapper events={events} onSelectDateTime={handleSelectDateTime} onSelectEvent={handleClickEvent} />

      <button
        type="button"
        className="hidden"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="hs-offcanvas-custom-backdrop-color"
        data-hs-overlay="#hs-offcanvas-custom-backdrop-color"
        ref={overlayButtonRef}
      >
        Open offcanvas
      </button>

      <SidePanelWrapper onClose={handleCloseDetailsSidePanel} title={"Detalhes do Agendamento"} isOpen={appointmentDetailsModalOpen}>
        <AppointmentDetails appointment={selectedAppointment} onClose={handleCloseDetailsSidePanel} />
      </SidePanelWrapper>

      <SidePanelWrapper onClose={handleCloseNewAppointmentSidePanel} title={"Novo Agendamento"} isOpen={newAppointmentModalOpen}>
        <NewAppointment onClose={handleCloseNewAppointmentSidePanel} />
      </SidePanelWrapper>

      <DialogWrapper
        isOpen={showNewEventModal}
        onOpenChange={setShowNewEventModal}
        title={"Escolha a opção"}
        description={"Criar um Novo Agendamento ou Bloquear o Horário?"}
        contentClassName={"max-w-[450px]"}
      >
        <AppointmentOptionsModal onNewAppointment={handleNewAppointment} onBlockTime={handleBlockTime} />
      </DialogWrapper>

      <AlertDialogWrapper
        isOpen={removeTimeOffModalOpen}
        onOpenChange={setRemoveTimeOffModalOpen}
        title={"Remover Horário de Folga"}
        description={"Deseja realmente remover este horário?"}
        onCancel={() => setRemoveTimeOffModalOpen(false)}
        onConfirm={() => handleRemoveTimeOff()}
        confirmText={"Remover"}
      ></AlertDialogWrapper>
    </div>
  );
}
