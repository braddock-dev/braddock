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

  const setCustomerInfo = useNewAppointmentStore(
    newAppointmentActions.setCustomerInfo,
  );

  const appointmentInfo = useNewAppointmentStore(
    newAppointmentSelectors.appointmentStore,
  );

  const {
    register,
    formState: { isValid, errors, touchedFields },
    getValues,
    watch,
  } = useForm<UserInfoForm>({
    resolver: zodResolver(userInfoFormSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      name: appointmentInfo.customerName || "",
      email: appointmentInfo.customerEmail || "",
      phoneNumber: appointmentInfo.phoneNumber || "",
    },
  });

  const customerName = watch("name");
  const phoneNumber = watch("phoneNumber");
  const email = watch("email");

  useEffect(() => {
    props.isValidChange(isValid);
  }, [isValid]);

  useEffect(() => {
    if (isValid) {
      setCustomerInfo(customerName, phoneNumber, email);
    }
  }, [customerName, email, isValid, phoneNumber]);

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
            type={"email"}
            inputMode={"email"}
            placeholder={"Seu Email"}
            floatingMode
            autoComplete={"email"}
            {...register("email")}
            errorMessage={errors.email?.message}
            touched={touchedFields.email}
            isValid={!errors.email && !!getValues().email}
            hasValue={!!getValues().email}
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
