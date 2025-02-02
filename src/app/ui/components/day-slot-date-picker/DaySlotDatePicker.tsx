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
import React, { useMemo, useState } from "react";
import { IDaySlot } from "@/app/backend/business/treatments/data/TreatmentsData";

interface ITreatmentTimeslot {
  treatmentTimeslots?: IDaySlot[];
  selectedDaySlot?: IDaySlot;
  onSetSelectedDaySlot: (daySlot: IDaySlot) => void;
}
export default function DaySlotDatePicker({
  treatmentTimeslots,
  selectedDaySlot,
  onSetSelectedDaySlot,
}: ITreatmentTimeslot) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const availableDates = useMemo(() => {
    if (!treatmentTimeslots) return [];
    return treatmentTimeslots.map((slot) => new Date(slot.dayInMillis));
  }, [treatmentTimeslots]);

  const isDateAvailable = (date: Date) => {
    return availableDates.some((availableDate) =>
      dayjs(availableDate).isSame(date, "day"),
    );
  };

  return (
    <div className={styles.container}>
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
            disabled={(date) => !isDateAvailable(date) || date < new Date()}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
