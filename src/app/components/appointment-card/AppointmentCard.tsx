"use client";

import styles from "./AppointmentCard.module.scss";
import ButtonGroup from "@/app/components/button-group/ButtonGroup";
import {
  ButtonType,
  ISelectButton,
} from "@/app/components/select-button/SelectButton";
import { useQuery } from "@tanstack/react-query";
import { getAppointmentInfo } from "@/app/backend/actions/appointmentActions";
import { IDateSlot } from "@/app/backend/appointments/AppointmentsData";
import { Constants } from "@/app/utils/Constants";
import dayjs from "dayjs";
import Button, { ButtonColors } from "@/app/components/button/Button";

export default function AppointmentCard() {
  const { data, isFetching } = useQuery({
    queryKey: ["appointmentInfo"],
    queryFn: () => getAppointmentInfo(),
  });

  if (isFetching || !data) return <div>Carregando...</div>;

  const barberServices = data.services.map((service): ISelectButton => {
    return {
      text: <span className={styles.buttonText}>{service.name}</span>,
      type: ButtonType.horizontal,
      value: service.name,
    };
  });

  const dateSlots = data.dateSlots.map((dateSlot, index): ISelectButton => {
    return {
      text: <DateSlot key={index} dateSlot={dateSlot} />,
      type: ButtonType.vertical,
      value: dateSlot.date,
    };
  });

  const timeSlots = data.dateSlots[0].timeSlots.map(
    (timeSlot, index): ISelectButton => {
      return {
        text: (
          <span className={styles.buttonText}>
            {dayjs(timeSlot.time).format(Constants.DATE_FORMAT.TIME)}
          </span>
        ),
        type: ButtonType.horizontal,
        value: timeSlot,
      };
    },
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AGENDE UM HORÁRIO</h1>

      <div className={styles.groupButtonsContainer}>
        <div className={styles.servicesContainer}>
          <ButtonGroup
            buttonItems={barberServices}
            title={"SERVIÇOS"}
            defaultSelected={barberServices[0].value}
            isMultiple
          />
        </div>

        <div className={styles.servicesContainer}>
          <ButtonGroup
            buttonItems={dateSlots}
            title={"DATA"}
            defaultSelected={dateSlots[0].value}
          />
        </div>

        <div className={styles.servicesContainer}>
          <ButtonGroup
            buttonItems={timeSlots}
            title={"HORA"}
            defaultSelected={timeSlots[0].value}
          />
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <Button fullWidth color={ButtonColors.WHITE} className={styles.button}>
          AGENDAR AGORA
        </Button>
      </div>
    </div>
  );
}

function DateSlot({ dateSlot }: { dateSlot: IDateSlot }) {
  return (
    <div className={styles.dateSlot}>
      <span className={styles.date}>
        {dayjs(dateSlot.date).format(Constants.DATE_FORMAT.DAY)}
      </span>
      <span className={styles.weekday}>
        {dayjs(dateSlot.date).format(Constants.DATE_FORMAT.WEEKDAY)}
      </span>
    </div>
  );
}
