"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { EventObject, TZDate } from "@toast-ui/calendar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { initialCalendars } from "@/app/admin/appointments/utils";
import { SelectDateTimeInfo } from "@/app/backend/business/treatments/data/AppointmentData";
import { calendarTheme } from "@/app/utils/calendar";

const enum CalendarActions {
  MOVE_PREV = "move-prev",
  MOVE_NEXT = "move-next",
  MOVE_TODAY = "move-today",
}

const today = new TZDate();
today.setHours(10, 0, 0);

const viewModeOptions = [
  {
    title: "Mês",
    value: "month",
  },
  {
    title: "Semana",
    value: "week",
  },
  {
    title: "Dia",
    value: "day",
  },
];

interface ICalendarWrapperProps {
  events: Partial<EventObject>[];
  onSelectEvent?: (event: any) => void;
  onSelectDateTime?: (event: SelectDateTimeInfo) => void;
}
export default function CalendarWrapper(props: ICalendarWrapperProps) {
  const [viewMode, setViewMode] = useState(viewModeOptions[1].value);
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef<typeof Calendar>(null);

  const calendarInstance = useMemo(() => {
    if (calendarRef.current && calendarRef.current.getInstance) {
      return calendarRef.current.getInstance();
    }
  }, [calendarRef.current]);

  const onClickNavigation = (actionName: CalendarActions) => {
    if (!calendarInstance) return;

    switch (actionName) {
      case CalendarActions.MOVE_PREV:
        calendarInstance.prev();
        break;
      case CalendarActions.MOVE_NEXT:
        calendarInstance.next();
        break;
      case CalendarActions.MOVE_TODAY:
        calendarInstance.today();
        break;
    }

    // Update current date after navigation
    setCurrentDate(calendarInstance.getDate().toDate());
  };

  // Update current date when component mounts
  useMemo(() => {
    if (calendarInstance) {
      setCurrentDate(calendarInstance.getDate().toDate());
    }
  }, [calendarInstance]);

  const formattedMonth = currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  useEffect(() => {
    if (calendarRef.current && calendarRef.current.containerElementRef.current) {
      calendarRef.current.containerElementRef.current.style.maxWidth = "100%";
    }
  }, [calendarRef]);

  return (
    <div className={"h-[90vh] w-full pb-5 flex flex-col gap-5 overflow-hidden"}>
      <div className={"flex justify-between items-center"}>
        <div className={"flex gap-1"}>
          <Button variant="outline" size={"lg"} onClick={() => onClickNavigation(CalendarActions.MOVE_PREV)}>
            Anterior
          </Button>

          <Button variant="outline" size={"lg"} onClick={() => onClickNavigation(CalendarActions.MOVE_TODAY)}>
            Hoje
          </Button>

          <Button variant="outline" size={"lg"} onClick={() => onClickNavigation(CalendarActions.MOVE_NEXT)}>
            Próximo
          </Button>

          <div className="flex items-center ml-4 text-lg font-medium text-gray-500">
            {formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1)}
          </div>
        </div>
        <ToggleGroup
          type="single"
          variant={"outline"}
          size={"lg"}
          defaultValue={viewMode}
          onValueChange={(value) => {
            if (value) {
              setViewMode(value);
            }
          }}
        >
          {viewModeOptions.map((option) => (
            <ToggleGroupItem key={option.value} value={option.value}>
              {option.title}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <Calendar
        view={viewMode}
        week={{
          dayNames: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
          taskView: false,
          startDayOfWeek: 1,
          hourStart: 8,
          hourEnd: 19,
          showNowIndicator: true,
        }}
        useFormPopup={false}
        useDetailPopup={false}
        month={{ startDayOfWeek: 1 }}
        ref={calendarRef}
        events={props.events}
        calendars={initialCalendars}
        usageStatistics={false}
        onSelectDateTime={props.onSelectDateTime}
        onClickEvent={props.onSelectEvent}
        gridSelection={{ enableClick: true, enableDblClick: true }}
        theme={calendarTheme}
      />
    </div>
  );
}
