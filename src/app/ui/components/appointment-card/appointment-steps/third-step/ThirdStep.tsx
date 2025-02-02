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
import { useAuthStore } from "@/app/store/authStore";
import DarkPhoneNumberInput from "@/app/ui/components/phone-number-input/DarkPhoneNumberInput";

interface IThirdStepProps {
  isValidChange: (isValid: boolean) => void;
}
export default function ThirdStep(props: IThirdStepProps) {
  const authUser = useAuthStore((state) => state.userInfo);

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
    setValue,
    trigger,
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

  useEffect(() => {
    if (authUser) {
      setValue("name", authUser.name);
      setValue("email", authUser.email);
      setValue("phoneNumber", authUser.phoneNumber);
      trigger();
    }
  }, [authUser]);

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

          <DarkPhoneNumberInput
            value={getValues().phoneNumber}
            errorMessage={errors.phoneNumber?.message}
            onChange={(phoneNumber) => {
              setValue("phoneNumber", phoneNumber);
              trigger("phoneNumber");
            }}
          />
        </form>
      </div>
    </div>
  );
}
