"use client";

import styles from "./AppointmentSteps.module.scss";
import ButtonGroup, {
  DISPLAY_MODE,
} from "@/app/ui/components/button-group/ButtonGroup";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import {
  IDateSlot,
  IService,
} from "@/app/backend/appointments/AppointmentsData";
import {
  ButtonType,
  ISelectButton,
} from "@/app/ui/components/select-button/SelectButton";
import dayjs from "dayjs";
import { Constants } from "@/app/utils/Constants";
import DateSlot from "@/app/ui/components/appointment-card/date-slot/DateSlot";
import React, { ReactElement, useState } from "react";
import Input from "@/app/ui/components/input/Input";
import AuthButtonWrapper from "@/app/ui/components/AuthButtonWrapper";
import { toast } from "sonner";

enum APPOINTMENT_STEPS {
  SERVICES_SELECTION = "SERVICES_SELECTION",
  DATE_SELECTION = "DATE_SELECTION",
  COMPLETE_APPOINTMENT = "COMPLETE_APPOINTMENT",
}

interface IAppointmentStepsProps {
  services: IService[];
  dateSlots: IDateSlot[];
}
function AppointmentSteps(props: IAppointmentStepsProps) {
  const [currentStep, setCurrentStep] = useState<APPOINTMENT_STEPS>(
    APPOINTMENT_STEPS.SERVICES_SELECTION,
  );

  const barberServices = props.services.map((service): ISelectButton => {
    return {
      text: <span className={styles.buttonText}>{service.name}</span>,
      type: ButtonType.horizontal,
      value: service.name,
    };
  });

  const dateSlots = props.dateSlots.map((dateSlot, index): ISelectButton => {
    return {
      text: <DateSlot key={index} dateSlot={dateSlot} />,
      type: ButtonType.vertical,
      value: dateSlot.date,
    };
  });

  const timeSlots = props.dateSlots[0].timeSlots.map(
    (timeSlot): ISelectButton => {
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

  const handleChangeStep = (goTo: APPOINTMENT_STEPS) => {
    setCurrentStep(goTo);
  };

  const handleStartAppointment = () => {
    alert("Start appointment");
  };

  const handleStarAuth = () => {};

  const handleErrorAuth = () => {
    toast.error("Erro ao autenticar");
    handleChangeStep(APPOINTMENT_STEPS.DATE_SELECTION);
  };

  const handleSuccessAuth = () => {
    toast.success("Autenticado com sucesso");
    handleChangeStep(APPOINTMENT_STEPS.COMPLETE_APPOINTMENT);
  };

  const renderStep: Record<APPOINTMENT_STEPS, ReactElement> = {
    [APPOINTMENT_STEPS.SERVICES_SELECTION]: (
      <div
        className={styles.servicesContainer}
        key={APPOINTMENT_STEPS.SERVICES_SELECTION}
      >
        <ButtonGroup
          buttonItems={barberServices}
          title={"SERVIÇOS"}
          defaultSelected={barberServices[0].value}
          isMultiple
          displayMode={DISPLAY_MODE.LIST}
        />
      </div>
    ),
    [APPOINTMENT_STEPS.DATE_SELECTION]: (
      <>
        <div
          className={styles.servicesContainer}
          key={APPOINTMENT_STEPS.DATE_SELECTION}
        >
          <ButtonGroup
            buttonItems={dateSlots}
            title={"DATA"}
            defaultSelected={dateSlots[0].value}
            displayMode={DISPLAY_MODE.SWIPER}
          />
        </div>

        <div
          className={styles.servicesContainer}
          key={APPOINTMENT_STEPS.DATE_SELECTION}
        >
          <ButtonGroup
            buttonItems={timeSlots}
            title={"HORA"}
            defaultSelected={timeSlots[0].value}
            displayMode={DISPLAY_MODE.SWIPER}
          />
        </div>
      </>
    ),
    [APPOINTMENT_STEPS.COMPLETE_APPOINTMENT]: (
      <div className={styles.completeStepContainer}>
        <div className={styles.section}>
          <p className={styles.title}>INFORMAÇÃO PESSOAL:</p>
          <div className={styles.formInputs}>
            <Input
              type={"text"}
              inputMode={"text"}
              name={"name"}
              placeholder={"Seu Nome"}
              floatingMode
              autoComplete={"name"}
            />

            <Input
              type={"tel"}
              inputMode={"tel"}
              name={"phone"}
              autoComplete={"tel"}
              placeholder={"Seu Contacto"}
              floatingMode
            />
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.title}>MEU AGENDAMENTO:</p>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <p className={styles.itemName}>Serviço:</p>
              <p className={styles.itemValue}>Corte de Cabelo</p>
            </div>

            <div className={styles.infoItem}>
              <p className={styles.itemName}>Data:</p>
              <p className={styles.itemValue}>10 de Agosto às 10PM</p>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  const renderButtons: Record<APPOINTMENT_STEPS, ReactElement> = {
    [APPOINTMENT_STEPS.SERVICES_SELECTION]: (
      <Button
        fullWidth
        color={ButtonColors.WHITE}
        className={styles.button}
        onClick={() => handleChangeStep(APPOINTMENT_STEPS.DATE_SELECTION)}
      >
        CONTINUAR
      </Button>
    ),
    [APPOINTMENT_STEPS.DATE_SELECTION]: (
      <>
        <div className={styles.fullWidth}>
          <Button
            fullWidth
            color={ButtonColors.WHITE}
            outline
            className={styles.button}
            onClick={() =>
              handleChangeStep(APPOINTMENT_STEPS.SERVICES_SELECTION)
            }
          >
            VOLTAR
          </Button>
        </div>

        <AuthButtonWrapper
          className={styles.fullWidth}
          onError={handleErrorAuth}
          onSuccess={handleSuccessAuth}
        >
          <Button
            fullWidth
            color={ButtonColors.WHITE}
            className={styles.button}
            onClick={handleStarAuth}
          >
            CONTINUAR
          </Button>
        </AuthButtonWrapper>
      </>
    ),
    [APPOINTMENT_STEPS.COMPLETE_APPOINTMENT]: (
      <>
        <Button
          fullWidth
          color={ButtonColors.LIGHT_BROWN}
          className={styles.button}
          outline
          onClick={() => handleChangeStep(APPOINTMENT_STEPS.DATE_SELECTION)}
        >
          VOLTAR
        </Button>
        <Button
          fullWidth
          color={ButtonColors.WHITE}
          className={styles.button}
          onClick={handleStartAppointment}
        >
          AGENDAR AGORA
        </Button>
      </>
    ),
  };

  return (
    <div className={styles.container}>
      <div className={styles.groupButtonsContainer}>
        {renderStep[currentStep]}
      </div>

      <div className={styles.buttonContainer}>{renderButtons[currentStep]}</div>
    </div>
  );
}

export default React.memo(AppointmentSteps);
