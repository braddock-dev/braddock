"use client";

import styles from "./AppointmentSteps.module.scss";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import React, { ReactElement, useCallback, useState } from "react";
import { toast } from "sonner";
import FirstStep from "@/app/ui/components/appointment-card/appointment-steps/first-step/FirstStep";
import SecondStep from "@/app/ui/components/appointment-card/appointment-steps/second-step/SecondStep";
import ThirdStep from "@/app/ui/components/appointment-card/appointment-steps/third-step/ThirdStep";
import { useMutation } from "@tanstack/react-query";
import { scheduleAppointment } from "@/app/backend/actions/treatmentsActions";
import {
  newAppointmentActions,
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import { IBaseNewAppointmentInfo } from "@/app/backend/business/treatments/data/TreatmentsData";
import JSConfetti from "js-confetti";
import FourthStep from "@/app/ui/components/appointment-card/appointment-steps/fourth-step/FourthStep";
import OTPStep from "@/app/ui/components/appointment-card/appointment-steps/otp-step/OTPStep";
import { useOTPValidationCode } from "@/app/ui/components/appointment-card/appointment-steps/otp-step/useOTPData";

enum APPOINTMENT_STEPS {
  SERVICES_SELECTION = "SERVICES_SELECTION",
  DATE_SELECTION = "DATE_SELECTION",
  COMPLETE_APPOINTMENT = "COMPLETE_APPOINTMENT",
  OTP_STEP = "OTP_STEP",
  SUCCESS_STEP = "SUCCESS_STEP",
}

interface IAvailableSteps {
  isValid: boolean;
}

type IAvailableStepsMap = Record<APPOINTMENT_STEPS, IAvailableSteps>;

const defaultAvailableSteps: IAvailableStepsMap = {
  [APPOINTMENT_STEPS.SERVICES_SELECTION]: { isValid: false },
  [APPOINTMENT_STEPS.DATE_SELECTION]: { isValid: false },
  [APPOINTMENT_STEPS.COMPLETE_APPOINTMENT]: { isValid: false },
  [APPOINTMENT_STEPS.OTP_STEP]: { isValid: false },
  [APPOINTMENT_STEPS.SUCCESS_STEP]: { isValid: false },
};

function AppointmentSteps() {
  const resetState = useNewAppointmentStore(newAppointmentActions.resetState);
  const appointmentStore = useNewAppointmentStore(
    newAppointmentSelectors.appointmentStore,
  );

  const { mutate, isPending } = useMutation({
    mutationKey: ["newAppointment"],
    mutationFn: (newAppointmentData: IBaseNewAppointmentInfo) => {
      return scheduleAppointment({
        selectedTreatments: newAppointmentData.selectedTreatments,
        customerName: newAppointmentData.customerName,
        phoneNumber: newAppointmentData.phoneNumber,
        customerEmail: newAppointmentData.customerEmail,
        selectedTimeSlot: newAppointmentData.selectedTimeSlot,
      });
    },
    onError: () => {
      toast.error("Erro ao agendar, tente novamente");
    },
    onSuccess: () => {
      toast.success("Agendamento realizado com sucesso");
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
      handleChangeStep(APPOINTMENT_STEPS.SUCCESS_STEP);
    },
  });

  const { mutateSendOtp, isPendingSendOtp } = useOTPValidationCode();

  const [currentStep, setCurrentStep] = useState<APPOINTMENT_STEPS>(
    APPOINTMENT_STEPS.SERVICES_SELECTION,
  );

  const [availableSteps, setAvailableSteps] = useState<IAvailableStepsMap>(
    defaultAvailableSteps,
  );

  const handleChangeStep = (goTo: APPOINTMENT_STEPS) => {
    setCurrentStep(goTo);
  };

  const handleStartAppointment = () => {
    mutate(appointmentStore);
  };

  const changeStepValidState = useCallback(
    (step: APPOINTMENT_STEPS, isValid: boolean) => {
      setAvailableSteps((prev) => ({
        ...prev,
        [step]: { isValid },
      }));
    },
    [],
  );

  const handleCompleteAppointment = () => {
    resetState();
    setCurrentStep(APPOINTMENT_STEPS.SERVICES_SELECTION);
  };

  const handleSendOTP = () => {
    mutateSendOtp(appointmentStore.phoneNumber).then(() => {
      handleChangeStep(APPOINTMENT_STEPS.OTP_STEP);
    });
  };

  const renderStep: Record<APPOINTMENT_STEPS, ReactElement> = {
    [APPOINTMENT_STEPS.SERVICES_SELECTION]: (
      <FirstStep
        isValidChange={(isValid) =>
          changeStepValidState(APPOINTMENT_STEPS.SERVICES_SELECTION, isValid)
        }
      />
    ),
    [APPOINTMENT_STEPS.DATE_SELECTION]: (
      <SecondStep
        isValidChange={(isValid) => {
          changeStepValidState(APPOINTMENT_STEPS.DATE_SELECTION, isValid);
        }}
        onError={() => handleChangeStep(APPOINTMENT_STEPS.SERVICES_SELECTION)}
      />
    ),
    [APPOINTMENT_STEPS.COMPLETE_APPOINTMENT]: (
      <ThirdStep
        isValidChange={(isValid) =>
          changeStepValidState(APPOINTMENT_STEPS.COMPLETE_APPOINTMENT, isValid)
        }
      />
    ),
    [APPOINTMENT_STEPS.SUCCESS_STEP]: <FourthStep />,
    [APPOINTMENT_STEPS.OTP_STEP]: (
      <OTPStep
        isValidChange={() => {
          handleStartAppointment();
        }}
      />
    ),
  };

  const renderButtons: Record<APPOINTMENT_STEPS, ReactElement> = {
    [APPOINTMENT_STEPS.SERVICES_SELECTION]: (
      <Button
        fullWidth
        color={ButtonColors.WHITE}
        className={styles.button}
        disabled={!availableSteps[APPOINTMENT_STEPS.SERVICES_SELECTION].isValid}
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

        <Button
          fullWidth
          color={ButtonColors.WHITE}
          className={styles.button}
          disabled={!availableSteps[APPOINTMENT_STEPS.DATE_SELECTION].isValid}
          onClick={() => {
            handleChangeStep(APPOINTMENT_STEPS.COMPLETE_APPOINTMENT);
          }}
        >
          CONTINUAR
        </Button>
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
          disabled={isPending}
        >
          VOLTAR
        </Button>
        <Button
          fullWidth
          color={ButtonColors.WHITE}
          className={styles.button}
          onClick={handleSendOTP}
          isLoading={isPendingSendOtp}
          disabled={
            !availableSteps[APPOINTMENT_STEPS.COMPLETE_APPOINTMENT].isValid ||
            isPendingSendOtp
          }
        >
          Continuar
        </Button>
      </>
    ),
    [APPOINTMENT_STEPS.OTP_STEP]: (
      <>
        <Button
          fullWidth
          color={ButtonColors.LIGHT_BROWN}
          className={styles.button}
          outline
          onClick={() =>
            handleChangeStep(APPOINTMENT_STEPS.COMPLETE_APPOINTMENT)
          }
          disabled={isPending}
        >
          VOLTAR
        </Button>
        <Button
          fullWidth
          color={ButtonColors.WHITE}
          className={styles.button}
          onClick={handleStartAppointment}
          isLoading={isPending}
          disabled={
            !availableSteps[APPOINTMENT_STEPS.SUCCESS_STEP].isValid || isPending
          }
        >
          FINALIZAR
        </Button>
      </>
    ),
    [APPOINTMENT_STEPS.SUCCESS_STEP]: (
      <>
        <Button
          fullWidth
          color={ButtonColors.BLACK}
          className={styles.button}
          outline
          onClick={handleCompleteAppointment}
        >
          FAZER OUTRO
        </Button>

        <Button
          fullWidth
          color={ButtonColors.WHITE}
          className={styles.button}
          onClick={handleCompleteAppointment}
        >
          TERMINAR
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
