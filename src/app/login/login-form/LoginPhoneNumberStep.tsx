import { useForm } from "react-hook-form";
import {
  loginFormSchema,
  LoginFormSchema,
} from "@/app/login/login-form/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/app/ui/components/input/Input";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import React from "react";
import { useOTPValidationCode } from "@/app/ui/components/appointment-card/appointment-steps/otp-step/useOTPData";

interface LoginPhoneNumberStepProps {
  onComplete: (phoneNumber: string) => void;
}
export default function LoginPhoneNumberStep(props: LoginPhoneNumberStepProps) {
  const {
    register,
    formState: { isValid, errors, touchedFields },
    getValues,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
    },
  });

  const { mutateSendOtp, isPendingSendOtp } = useOTPValidationCode();

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    const phoneNumber = getValues().phoneNumber;

    if (isValid) {
      mutateSendOtp(phoneNumber).then(() => {
        props.onComplete(phoneNumber);
      });
    }
  };

  return (
    <form className={"flex flex-col gap-10 items-center"}>
      <Input
        type={"tel"}
        inputMode={"tel"}
        autoComplete={"none"}
        placeholder={"Introduza o Número (PT)"}
        floatingMode
        {...register("phoneNumber", { required: true, min: 10 })}
        touched={touchedFields.phoneNumber}
        errorMessage={errors.phoneNumber?.message}
        isValid={!errors.phoneNumber && !!getValues().phoneNumber}
        hasValue={!!getValues().phoneNumber}
      />

      <Button
        color={ButtonColors.WHITE}
        className={"!w-32"}
        onClick={handleFormSubmit}
        disabled={!isValid || isPendingSendOtp}
        isLoading={isPendingSendOtp}
      >
        CONTINUAR
      </Button>
    </form>
  );
}
