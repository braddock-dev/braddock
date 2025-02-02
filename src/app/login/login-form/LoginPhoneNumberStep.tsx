import { useForm } from "react-hook-form";
import {
  loginFormSchema,
  LoginFormSchema,
} from "@/app/login/login-form/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import React from "react";
import { useOTPValidationCode } from "@/app/ui/components/appointment-card/appointment-steps/otp-step/useOTPData";
import DarkPhoneNumberInput from "@/app/ui/components/phone-number-input/DarkPhoneNumberInput";

interface LoginPhoneNumberStepProps {
  onComplete: (phoneNumber: string) => void;
}
export default function LoginPhoneNumberStep(props: LoginPhoneNumberStepProps) {
  const {
    formState: { isValid, errors },
    getValues,
    setValue,
    trigger,
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
      <DarkPhoneNumberInput
        value={getValues().phoneNumber}
        errorMessage={errors.phoneNumber?.message}
        onChange={(phoneNumber) => {
          setValue("phoneNumber", phoneNumber);
          trigger("phoneNumber");
        }}
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
