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

export default function AppointmentsPageContent() {
  const [appointmentDetailsModalOpen, setAppointmentDetailsModalOpen] =
    useState(false);

  const resetNewAppointmentStore = useNewAppointmentStore(
    newAppointmentActions.resetState,
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
    console.log("event", event);
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
        onClose={() => {
          setSelectedAppointment(undefined);
          setAppointmentDetailsModalOpen(false);
          resetNewAppointmentStore();
          refetch();
        }}
        title={"Detalhes do Agendamento"}
        isOpen={appointmentDetailsModalOpen}
      >
        <AppointmentDetails
          appointment={selectedAppointment}
          onClose={() => {
            setSelectedAppointment(undefined);
            setAppointmentDetailsModalOpen(false);
          }}
        />
      </SidePanelWrapper>
    </div>
  );
}
