"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/app/backend/actions/appointmentActions";
import { useMemo, useState } from "react";
import { IAppointmentQueryData } from "@/app/backend/business/treatments/data/AppointmentData";
import AppointmentDataAdapter from "@/app/backend/business/treatments/AppointmentDataAdapter";
import ptLocale from "@fullcalendar/core/locales/pt";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import { toast } from "sonner";

export default function Page() {
  const [filter, setFilter] = useState<IAppointmentQueryData>({});

  const { data, error, refetch, isLoading, isPending } = useQuery({
    queryKey: ["appointments", filter],
    queryFn: () => getAppointments(filter),
  });

  const events = useMemo(() => {
    if (!data) return [];

    return AppointmentDataAdapter.convertAppointmentsToEvents(data);
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

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridDay,dayGridMonth,dayGridWeek,listWeek",
        }}
        nowIndicator
        selectMirror
        eventInteractive={false}
        events={events}
        locale={ptLocale}
      />
    </div>
  );
}
