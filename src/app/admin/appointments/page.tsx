"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/interaction";

export default function Page() {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridDay,dayGridMonth,dayGridWeek",
        }}
        nowIndicator
        editable
        droppable
        selectable
        selectMirror
        events={[
          { title: "event 1", date: "2024-10-08" },
          { title: "event 2", date: "2024-10-08" },
        ]}
      />
    </div>
  );
}
