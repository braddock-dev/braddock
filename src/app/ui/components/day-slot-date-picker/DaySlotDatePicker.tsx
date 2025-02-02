import styles from "./DaySlotDatePicker.module.scss";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import dayjs from "@/app/utils/dayjs";
import { Constants } from "@/app/utils/Constants";
import { Calendar } from "@/components/ui/calendar";
import React, { useCallback, useMemo, useState } from "react";
import { IDaySlot } from "@/app/backend/business/treatments/data/TreatmentsData";
import { Theme } from "@/app/ui/components/button-group/ButtonGroup";

interface ITreatmentTimeslot {
  treatmentTimeslots?: IDaySlot[];
  selectedDaySlot?: IDaySlot;
  onSetSelectedDaySlot: (daySlot: IDaySlot) => void;
  theme?: Theme;
}
function DaySlotDatePicker({
  treatmentTimeslots,
  selectedDaySlot,
  onSetSelectedDaySlot,
  theme = Theme.DARK,
}: ITreatmentTimeslot) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Memoize today's timestamp for faster comparison
  const todayTimestamp = useMemo(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  }, []);

  // Create a Set of available date timestamps for O(1) lookup
  const availableDatesSet = useMemo(() => {
    if (!treatmentTimeslots) return new Set<number>();
    return new Set(
      treatmentTimeslots.map((slot) => {
        const date = new Date(slot.dayInMillis);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
      })
    );
  }, [treatmentTimeslots]);

  // Optimized disabled function using timestamp comparison
  const isDateDisabled = useCallback(
    (date: Date) => {
      const timestamp = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).getTime();
      return timestamp < todayTimestamp || !availableDatesSet.has(timestamp);
    },
    [availableDatesSet, todayTimestamp]
  );

  return (
    <div className={styles.container} data-theme={theme}>
      <h3 className={styles.title}>DATA</h3>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal h-12",
              !selectedDaySlot && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDaySlot ? (
              dayjs(selectedDaySlot.dayInMillis).format(
                Constants.DATE_FORMAT.FULL_DATE,
              )
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={
              selectedDaySlot
                ? new Date(selectedDaySlot.dayInMillis)
                : undefined
            }
            onSelect={(date) => {
              if (date) {
                const selectedDate = treatmentTimeslots?.find((slot) =>
                  dayjs(slot.dayInMillis).isSame(date, "day"),
                );
                if (selectedDate) {
                  onSetSelectedDaySlot(selectedDate);
                  setIsCalendarOpen(false);
                }
              }
            }}
            disabled={isDateDisabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default React.memo(DaySlotDatePicker);
