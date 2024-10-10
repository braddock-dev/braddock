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

export default function Page() {
  const [filter, setFilter] = useState<IAppointmentQueryData>({});

  const { isPending, data, error } = useQuery({
    queryKey: ["appointments", filter],
    queryFn: () => getAppointments(filter),
  });

  const events = useMemo(() => {
    if (!data) return [];

    return AppointmentDataAdapter.convertAppointmentsToEvents(data);
  }, [data]);

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
