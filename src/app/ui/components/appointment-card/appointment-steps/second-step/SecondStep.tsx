import styles from "./SecondStep.module.scss";
import ButtonGroup, {
  DISPLAY_MODE,
} from "@/app/ui/components/button-group/ButtonGroup";
import React, { useEffect, useMemo } from "react";
import {
  ButtonType,
  ISelectButton,
} from "@/app/ui/components/select-button/SelectButton";
import DateSlot from "@/app/ui/components/appointment-card/date-slot/DateSlot";
import dayjs from "@/app/utils/dayjs";
import { Constants } from "@/app/utils/Constants";
import {
  newAppointmentActions,
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import { useQuery } from "@tanstack/react-query";
import { getTreatmentTimeslots } from "@/app/backend/actions/treatmentsActions";
import AppointmentCardLoadingState from "@/app/ui/components/appointment-card/appointment-card-loading-state/AppointmentCardLoadingState";
import { toast } from "sonner";

interface ITimeSlot {
  onError: () => void;
  isValidChange: (isValid: boolean) => void;
}
export default function SecondStep(props: ITimeSlot) {
  const selectedTreatmentIds = useNewAppointmentStore(
    newAppointmentSelectors.selectedTreatmentsIds,
  );

  const selectedDaySlot = useNewAppointmentStore(
    newAppointmentSelectors.selectedDaySlot,
  );
  const setSelectedDaySlot = useNewAppointmentStore(
    newAppointmentActions.setSelectedDaySlot,
  );

  const selectedTimeSlot = useNewAppointmentStore(
    newAppointmentSelectors.selectedTimeSlot,
  );
  const setSelectedTimeSlot = useNewAppointmentStore(
    newAppointmentActions.setSelectedTimeSlot,
  );

  useEffect(() => {
    props.isValidChange(!!selectedDaySlot && !!selectedTimeSlot);
  }, [selectedDaySlot, selectedTimeSlot]);

  const {
    data: treatmentTimeslots,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getTreatmentTimeslots", selectedTreatmentIds.join()],
    queryFn: () => getTreatmentTimeslots(selectedTreatmentIds),
  });

  useEffect(() => {
    if (
      treatmentTimeslots &&
      treatmentTimeslots.length > 0 &&
      !selectedDaySlot
    ) {
      setSelectedDaySlot(treatmentTimeslots[0]);
    }
  }, [treatmentTimeslots, selectedDaySlot]);

  const dateSlots = useMemo(() => {
    if (!treatmentTimeslots) {
      return [];
    }

    return treatmentTimeslots.map((dateSlot, index): ISelectButton => {
      return {
        text: <DateSlot key={index} dateSlot={dateSlot} />,
        type: ButtonType.vertical,
        value: dateSlot.dayInMillis,
        data: dateSlot,
      };
    });
  }, [treatmentTimeslots]);

  const timeSlots = useMemo(() => {
    if (!selectedDaySlot || !selectedDaySlot?.timeslots) {
      return [];
    }

    return selectedDaySlot.timeslots.map((timeSlot): ISelectButton => {
      return {
        text: (
          <span className={styles.buttonText}>
            {dayjs(timeSlot.timeInMillis).format(Constants.DATE_FORMAT.TIME)}
          </span>
        ),
        type: ButtonType.horizontal,
        value: timeSlot.timeInMillis,
        data: timeSlot,
      };
    });
  }, [selectedDaySlot]);

  if (isLoading) {
    return (
      <div className={styles.container} data-loading-state={true}>
        <AppointmentCardLoadingState itemsCount={7} />
      </div>
    );
  }

  if (isError || error) {
    toast.error("Erro ao carregar os Horários");
    props.onError();
    return <></>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.item} key={"DAY_SELECTION"}>
        <ButtonGroup
          buttonItems={dateSlots}
          title={"DATA"}
          defaultSelectedKey={selectedDaySlot?.dayInMillis}
          displayMode={DISPLAY_MODE.SWIPER}
          onSelectedButtonsChange={(_, [daySlot]) =>
            setSelectedDaySlot(daySlot)
          }
        />
      </div>

      <div className={styles.item} key={"TIME_SELECTION"}>
        <ButtonGroup
          buttonItems={timeSlots}
          title={"HORA"}
          defaultSelectedKey={selectedTimeSlot?.timeInMillis}
          displayMode={DISPLAY_MODE.SWIPER}
          onSelectedButtonsChange={(_, [timeSlot]) =>
            setSelectedTimeSlot(timeSlot)
          }
        />
      </div>
    </div>
  );
}