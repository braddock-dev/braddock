"use client";

import styles from "./AppointmentSteps.module.scss";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import React, { ReactElement, useState } from "react";
import AuthButtonWrapper from "@/app/ui/components/AuthButtonWrapper";
import { toast } from "sonner";
import FirstStep from "@/app/ui/components/appointment-card/appointment-steps/first-step/FirstStep";
import SecondStep from "@/app/ui/components/appointment-card/appointment-steps/second-step/SecondStep";
import ThirdStep from "@/app/ui/components/appointment-card/appointment-steps/third-step/ThirdStep";

enum APPOINTMENT_STEPS {
  SERVICES_SELECTION = "SERVICES_SELECTION",
  DATE_SELECTION = "DATE_SELECTION",
  COMPLETE_APPOINTMENT = "COMPLETE_APPOINTMENT",
}

function AppointmentSteps() {
  const [currentStep, setCurrentStep] = useState<APPOINTMENT_STEPS>(
    APPOINTMENT_STEPS.SERVICES_SELECTION,
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
    [APPOINTMENT_STEPS.SERVICES_SELECTION]: <FirstStep />,
    [APPOINTMENT_STEPS.DATE_SELECTION]: (
      <SecondStep
        onError={() => handleChangeStep(APPOINTMENT_STEPS.SERVICES_SELECTION)}
      />
    ),
    [APPOINTMENT_STEPS.COMPLETE_APPOINTMENT]: <ThirdStep />,
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
