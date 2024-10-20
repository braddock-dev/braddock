"use client";

import styles from "./AppointmentSteps.module.scss";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import FirstStep from "@/app/ui/components/appointment-card/appointment-steps/first-step/FirstStep";
import SecondStep from "@/app/ui/components/appointment-card/appointment-steps/second-step/SecondStep";
import ThirdStep from "@/app/ui/components/appointment-card/appointment-steps/third-step/ThirdStep";
import {
  newAppointmentActions,
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import FourthStep from "@/app/ui/components/appointment-card/appointment-steps/fourth-step/FourthStep";
import OTPStep from "@/app/ui/components/appointment-card/appointment-steps/otp-step/OTPStep";
import { useOTPValidationCode } from "@/app/ui/components/appointment-card/appointment-steps/otp-step/useOTPData";
import { useAppointment } from "@/app/ui/components/appointment-card/appointment-steps/useAppointment";
import { useCustomerInfo } from "@/app/ui/components/appointment-card/appointment-steps/useCustomerInfo";
import { authSelectors, useAuthStore } from "@/app/store/authStore";

export enum APPOINTMENT_STEPS {
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
  const authUser = useAuthStore((state) => state.userInfo);

  const resetState = useNewAppointmentStore(newAppointmentActions.resetState);
  const isUserAuthenticated = useAuthStore(authSelectors.isAuthenticated);

  const appointmentStore = useNewAppointmentStore(
    newAppointmentSelectors.appointmentStore,
  );

  const setCustomerInfo = useNewAppointmentStore(
    newAppointmentActions.setCustomerInfo,
  );

  const [currentStep, setCurrentStep] = useState<APPOINTMENT_STEPS>(
    APPOINTMENT_STEPS.SERVICES_SELECTION,
  );

  const [availableSteps, setAvailableSteps] = useState<IAvailableStepsMap>(
    defaultAvailableSteps,
  );

  const { isPendingNewAppointment, mutateNewAppointment } = useAppointment(
    handleOnAppointmentSuccess,
  );

  const { mutateSendOtp, isPendingSendOtp } = useOTPValidationCode();

  const { mutateUpdateCustomer } = useCustomerInfo();

  useEffect(() => {
    if (authUser) {
      setCustomerInfo(authUser.name, authUser.phoneNumber, authUser.email);
      debugger;
    }
  }, [authUser]);

  function handleChangeStep(goTo: APPOINTMENT_STEPS) {
    setCurrentStep(goTo);
  }

  function handleOnAppointmentSuccess() {
    mutateUpdateCustomer({
      customerName: appointmentStore.customerName,
      customerEmail: appointmentStore.customerEmail,
    });

    handleChangeStep(APPOINTMENT_STEPS.SUCCESS_STEP);
  }

  const handleStartAppointment = () => {
    mutateNewAppointment(appointmentStore);
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

  const handleClickConfirmUserInfo = () => {
    if (isUserAuthenticated) {
      handleStartAppointment();
    } else {
      handleSendOTP();
    }
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
        isValidChange={(isValid) => {
          changeStepValidState(APPOINTMENT_STEPS.OTP_STEP, isValid);
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
          disabled={isPendingNewAppointment || isPendingSendOtp}
        >
          VOLTAR
        </Button>
        <Button
          fullWidth
          color={ButtonColors.WHITE}
          className={styles.button}
          onClick={handleClickConfirmUserInfo}
          isLoading={isPendingSendOtp}
          disabled={
            !availableSteps[APPOINTMENT_STEPS.COMPLETE_APPOINTMENT].isValid ||
            isPendingSendOtp
          }
        >
          CONTINUAR
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
          disabled={isPendingNewAppointment}
        >
          VOLTAR
        </Button>
        <Button
          fullWidth
          color={ButtonColors.WHITE}
          className={styles.button}
          onClick={handleStartAppointment}
          isLoading={isPendingNewAppointment}
          disabled={
            !availableSteps[APPOINTMENT_STEPS.OTP_STEP].isValid ||
            isPendingNewAppointment
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
