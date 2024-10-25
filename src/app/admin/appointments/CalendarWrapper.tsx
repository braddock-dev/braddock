import { useMemo, useRef, useState } from "react";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { EventObject, TZDate } from "@toast-ui/calendar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { initialCalendars } from "@/app/admin/appointments/utils";

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
}
export default function CalendarWrapper(props: ICalendarWrapperProps) {
  const [viewMode, setViewMode] = useState(viewModeOptions[1].value);
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
  };

  return (
    <div className={"h-[100vh] w-full pb-10 flex flex-col gap-5"}>
      <div className={"flex justify-between items-center"}>
        <div className={"flex gap-1"}>
          <Button
            variant="outline"
            size={"lg"}
            onClick={() => onClickNavigation(CalendarActions.MOVE_PREV)}
          >
            Anterior
          </Button>

          <Button
            variant="outline"
            size={"lg"}
            onClick={() => onClickNavigation(CalendarActions.MOVE_TODAY)}
          >
            Hoje
          </Button>

          <Button
            variant="outline"
            size={"lg"}
            onClick={() => onClickNavigation(CalendarActions.MOVE_NEXT)}
          >
            Próximo
          </Button>
        </div>
        <ToggleGroup
          type="single"
          variant={"outline"}
          size={"lg"}
          defaultValue={viewMode}
          onValueChange={(value) => setViewMode(value)}
        >
          {viewModeOptions.map((option) => (
            <ToggleGroupItem key={option.value} value={option.value}>
              {option.title}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <Calendar
        height={"100%"}
        view={viewMode}
        week={{
          dayNames: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
          taskView: false,
          startDayOfWeek: 1,
          hourStart: 8,
          hourEnd: 20,
          showNowIndicator: true,
        }}
        month={{ startDayOfWeek: 1 }}
        ref={calendarRef}
        events={props.events}
        calendars={initialCalendars}
      />
    </div>
  );
}
