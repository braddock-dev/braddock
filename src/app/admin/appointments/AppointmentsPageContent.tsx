"use client";

import { useMemo, useRef, useState } from "react";
import {
  IAppointment,
  IAppointmentQueryData,
  SelectDateTimeInfo,
} from "@/app/backend/business/treatments/data/AppointmentData";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/app/backend/actions/appointmentActions";
import { convertAppointmentsToEvents } from "@/app/admin/appointments/utils";
import { toast } from "sonner";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import CalendarWrapper from "@/app/admin/appointments/CalendarWrapper";
import AppointmentDetails from "@/app/ui/components/appointment-details/AppointmentDetails";
import SidePanelWrapper from "@/app/ui/components/side-panel-wrapper/SidePanelWrapper";
import {
  newAppointmentActions,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import NewAppointment from "@/app/ui/components/new-appointment/NewAppointment";
import dayjs from "dayjs";
import DialogWrapper from "@/app/ui/components/dialog-wrapper/DialogWrapper";
import AppointmentOptionsModal from "@/app/admin/appointments/AppointmentOptionsModal";

export default function AppointmentsPageContent() {
  const [showNewEventModal, setShowNewEventModal] = useState(false);

  const [appointmentDetailsModalOpen, setAppointmentDetailsModalOpen] =
    useState(false);

  const [newAppointmentModalOpen, setNewAppointmentModalOpen] = useState(false);

  const resetNewAppointmentStore = useNewAppointmentStore(
    newAppointmentActions.resetState,
  );

  const setRecommendedDate = useNewAppointmentStore(
    newAppointmentActions.setRecommendedDate,
  );

  const overlayButtonRef = useRef<HTMLButtonElement | null>(null);
  const [filter, setFilter] = useState<IAppointmentQueryData>({});
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment>();

  const { data, error, refetch } = useQuery({
    queryKey: ["appointments", filter],
    queryFn: () => getAppointments(filter),
  });

  const events = useMemo(() => {
    if (!data) return [];

    return convertAppointmentsToEvents(data);
  }, [data]);

  if (error) {
    toast.error("Erro ao carregar os agendamentos");

    return (
      <div
        className={
          "flex flex-col w-full justify-center items-center h-[80vh] gap-5"
        }
      >
        <h2 className={"text-xl font-bold text-brown"}>
          Erro ao carregar os agendamentos
        </h2>
        <Button color={ButtonColors.BLACK} onClick={() => refetch()}>
          Tentar Novamente
        </Button>
      </div>
    );
  }

  function openOverlay(appointmentId: string) {
    if (data) {
      const appointment = data.find(
        (appointment) => appointment.id === appointmentId,
      );

      if (!appointment) {
        toast.error("Erro ao carregar os detalhes do agendamento");
        return;
      }

      setSelectedAppointment(appointment);
      setAppointmentDetailsModalOpen(true);
    }
  }

  const handleClickEvent = (event: any) => {
    openOverlay(event.event.id);
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

  const handleBlockTime = () => {
    toast.warning("Funcionalidade em desenv");
    setNewAppointmentModalOpen(false);
  };

  return (
    <div>
      <CalendarWrapper
        events={events}
        onSelectDateTime={handleSelectDateTime}
        onSelectEvent={handleClickEvent}
      />

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

      <SidePanelWrapper
        onClose={handleCloseDetailsSidePanel}
        title={"Detalhes do Agendamento"}
        isOpen={appointmentDetailsModalOpen}
      >
        <AppointmentDetails
          appointment={selectedAppointment}
          onClose={handleCloseDetailsSidePanel}
        />
      </SidePanelWrapper>

      <SidePanelWrapper
        onClose={handleCloseNewAppointmentSidePanel}
        title={"Novo Agendamento"}
        isOpen={newAppointmentModalOpen}
      >
        <NewAppointment onClose={handleCloseNewAppointmentSidePanel} />
      </SidePanelWrapper>

      <DialogWrapper
        isOpen={showNewEventModal}
        onOpenChange={setShowNewEventModal}
        title={"Escolha a opção"}
        contentClassName={"max-w-[450px]"}
      >
        <AppointmentOptionsModal
          onNewAppointment={handleNewAppointment}
          onBlockTime={handleBlockTime}
        />
      </DialogWrapper>
    </div>
  );
}
