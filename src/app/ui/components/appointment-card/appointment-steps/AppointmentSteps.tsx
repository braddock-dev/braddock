"use client";

import styles from "./AppointmentSteps.module.scss";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { AuthRoles } from "@/app/backend/business/auth/data/AuthDtos";
import { toast } from "sonner";
import { HeroCardType, uiActions, useUIStore } from "@/app/store/uiStore";
import { NotAllowedServiceModal } from "@/app/ui/components/not-allowed-service-modal/NotAllowedServiceModal";
import {
  isNotAllowedServiceSelected,
  notAllowedServicesSelected,
} from "@/app/admin/appointments/utils";
import SelectEmployeeStep from "@/app/ui/components/appointment-card/appointment-steps/select-employee-step/SelectEmployeeStep";
import { Constants } from "@/app/utils/Constants";

export enum APPOINTMENT_STEPS {
  SELECT_EMPLOYEE = "SELECT_EMPLOYEE",
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
  [APPOINTMENT_STEPS.SELECT_EMPLOYEE]: { isValid: false },
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
  const setHeroCardType = useUIStore(uiActions.setHeroCardType);
  const [isNotAllowedModalOpen, setIsNotAllowedModalOpen] = useState(false);
  const selectedEmployee = useNewAppointmentStore(
    newAppointmentSelectors.employeeId,
  );

  const selectedTreatments = useNewAppointmentStore(
    newAppointmentSelectors.selectedTreatments,
  );

  const setRequestedBy = useNewAppointmentStore(
    newAppointmentActions.setRequestedBy,
  );

  const isNotAllowedServicesSelected = useMemo(() => {
    return isNotAllowedServiceSelected(selectedTreatments);
  }, [selectedTreatments]);

  const appointmentStore = useNewAppointmentStore(
    newAppointmentSelectors.appointmentStore,
  );

  const [currentStep, setCurrentStep] = useState<APPOINTMENT_STEPS>(
    APPOINTMENT_STEPS.SELECT_EMPLOYEE,
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
    setRequestedBy(AuthRoles.CUSTOMER);
  }, [setRequestedBy]);

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

  const handleShowAppointments = () => {
    resetState();
    setHeroCardType(HeroCardType.APPOINTMENTS_LIST);
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

  const handleSelectEmployee = useCallback(() => {
    if (isNotAllowedServicesSelected) {
      setIsNotAllowedModalOpen(true);
      return;
    }

    if (!selectedEmployee) {
      toast.info("Selecione um profissional para continuar");
      return;
    }

    //TODO: Remove this after employee selection is implemented in the backend
    if (selectedEmployee === "2") {
      window.location.href = Constants.FALLBACK_APPOINTMENT_URL;
      return;
    }

    handleChangeStep(APPOINTMENT_STEPS.SERVICES_SELECTION);
  }, [authUser?.role, isNotAllowedServicesSelected, selectedEmployee]);

  const handleSelectServices = useCallback(() => {
    if (isNotAllowedServicesSelected) {
      setIsNotAllowedModalOpen(true);
      return;
    }

    if (authUser?.role === AuthRoles.BUSINESS) {
      toast.info(
        "Apenas clientes podem agendar, entre com uma conta de cliente",
      );
      return;
    }

    handleChangeStep(APPOINTMENT_STEPS.DATE_SELECTION);
  }, [authUser?.role, isNotAllowedServicesSelected]);

  const renderStep: Record<APPOINTMENT_STEPS, ReactElement> = {
    [APPOINTMENT_STEPS.SELECT_EMPLOYEE]: (
      <SelectEmployeeStep
        isValidChange={(isValid) =>
          changeStepValidState(APPOINTMENT_STEPS.SELECT_EMPLOYEE, isValid)
        }
      />
    ),
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
    [APPOINTMENT_STEPS.OTP_STEP]: (
      <OTPStep
        isValidChange={(isValid) => {
          changeStepValidState(APPOINTMENT_STEPS.OTP_STEP, isValid);
          handleStartAppointment();
        }}
      />
    ),
    [APPOINTMENT_STEPS.SUCCESS_STEP]: <FourthStep />,
  };

  const renderButtons: Record<APPOINTMENT_STEPS, ReactElement> = {
    [APPOINTMENT_STEPS.SELECT_EMPLOYEE]: (
      <Button
        fullWidth
        color={ButtonColors.WHITE}
        className={styles.button}
        disabled={!availableSteps[APPOINTMENT_STEPS.SELECT_EMPLOYEE].isValid}
        onClick={handleSelectEmployee}
      >
        CONTINUAR
      </Button>
    ),
    [APPOINTMENT_STEPS.SERVICES_SELECTION]: (
      <>
        <div className={styles.fullWidth}>
          <Button
            fullWidth
            color={ButtonColors.WHITE}
            outline
            className={styles.button}
            onClick={() => handleChangeStep(APPOINTMENT_STEPS.SELECT_EMPLOYEE)}
          >
            VOLTAR
          </Button>
        </div>

        <Button
          fullWidth
          color={ButtonColors.WHITE}
          className={styles.button}
          disabled={
            !availableSteps[APPOINTMENT_STEPS.SERVICES_SELECTION].isValid
          }
          onClick={handleSelectServices}
        >
          CONTINUAR
        </Button>
      </>
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
          isLoading={isPendingSendOtp || isPendingNewAppointment}
          disabled={
            !availableSteps[APPOINTMENT_STEPS.COMPLETE_APPOINTMENT].isValid ||
            isPendingSendOtp ||
            isPendingNewAppointment
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
          onClick={handleShowAppointments}
        >
          AGENDAMENTOS
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

      <NotAllowedServiceModal
        open={isNotAllowedModalOpen}
        setOpen={setIsNotAllowedModalOpen}
        serviceNames={notAllowedServicesSelected(selectedTreatments)}
      />
    </div>
  );
}

export default React.memo(AppointmentSteps);
