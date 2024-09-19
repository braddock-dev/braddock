import styles from "./ThirdStep.module.scss";
import Input from "@/app/ui/components/input/Input";
import React, { useEffect } from "react";
import {
  newAppointmentActions,
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserInfoForm,
  userInfoFormSchema,
} from "@/app/ui/components/appointment-card/appointment-steps/third-step/FormSchema";
import AppointmentInfo from "@/app/ui/components/appointment-card/appointment-info/AppointmentInfo";

interface IThirdStepProps {
  isValidChange: (isValid: boolean) => void;
}
export default function ThirdStep(props: IThirdStepProps) {
  const selectedTreatments = useNewAppointmentStore(
    newAppointmentSelectors.selectedTreatments,
  );

  const selectedTimeSlot = useNewAppointmentStore(
    newAppointmentSelectors.selectedTimeSlot,
  );

  const setCustomerName = useNewAppointmentStore(
    newAppointmentActions.setCustomerName,
  );
  const setPhoneNumber = useNewAppointmentStore(
    newAppointmentActions.setPhoneNumber,
  );

  const {
    register,
    formState: { isValid, errors, touchedFields },
    getValues,
    watch,
  } = useForm<UserInfoForm>({
    resolver: zodResolver(userInfoFormSchema),
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  });

  const customerName = watch("name");
  const phoneNumber = watch("phoneNumber");

  useEffect(() => {
    props.isValidChange(isValid);
  }, [isValid]);

  useEffect(() => {
    if (!errors.phoneNumber) {
      setPhoneNumber(phoneNumber);
    }
  }, [phoneNumber, errors.phoneNumber]);

  useEffect(() => {
    if (!errors.name) {
      setCustomerName(customerName);
    }
  }, [customerName, errors.name]);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <p className={styles.title}>INFORMAÇÃO PESSOAL:</p>
        <form className={styles.formInputs}>
          <Input
            type={"text"}
            inputMode={"text"}
            placeholder={"Seu Nome"}
            floatingMode
            autoComplete={"name"}
            {...register("name")}
            errorMessage={errors.name?.message}
            touched={touchedFields.name}
            isValid={!errors.name && !!getValues().name}
            hasValue={!!getValues().name}
          />

          <Input
            type={"tel"}
            inputMode={"tel"}
            autoComplete={"none"}
            placeholder={"Seu Contacto"}
            floatingMode
            {...register("phoneNumber", { required: true, min: 10 })}
            touched={touchedFields.phoneNumber}
            errorMessage={errors.phoneNumber?.message}
            isValid={!errors.phoneNumber && !!getValues().phoneNumber}
            hasValue={!!getValues().phoneNumber}
          />
        </form>
      </div>

      <div className={styles.section}>
        <p className={styles.title}>MEU AGENDAMENTO:</p>
        <AppointmentInfo
          selectedTreatments={selectedTreatments}
          selectedTimeSlot={selectedTimeSlot}
        />
      </div>
    </div>
  );
}
