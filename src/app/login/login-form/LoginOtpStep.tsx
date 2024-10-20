import { OtpInput } from "@/app/ui/components/otp-input/OtpInput";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import React, { useState } from "react";
import { useOtpValidationStore } from "@/app/store/otpValidationStore";
import { useOTPValidationCode } from "@/app/ui/components/appointment-card/appointment-steps/otp-step/useOTPData";
import Logger from "@/app/utils/Logger";
import { toast } from "sonner";

const LOG_TAG = "LoginOtpStep";

interface LoginOtpStepProps {
  phoneNumber: string;
  onBack: () => void;
}
export default function LoginOtpStep(props: LoginOtpStepProps) {
  const otpStore = useOtpValidationStore((state) => state);

  const [otpValue, setOtpValue] = useState("");

  const {
    mutateSendOtp,
    isErrorSendOpt,
    mutateVerifyCode,
    isPendingSendOtp,
    isPendingVerifyCode,
  } = useOTPValidationCode();

  const handleResendCode = () => {
    mutateSendOtp(props.phoneNumber);
    setOtpValue("");
  };

  const handleOnComplete = (otp: string) => {
    if (!otpStore.requestId) {
      Logger.error(LOG_TAG, "RequestId not found");
      toast.error("Não foi possível verificar o código de verificação");
      return;
    }

    mutateVerifyCode({
      otpCode: otp,
      requestId: otpStore.requestId,
    });
  };

  return (
    <div className={"flex flex-col gap-8 items-center justify-center"}>
      <div className={"mt-5 flex justify-center items-center flex-col gap-5"}>
        <OtpInput
          onComplete={handleOnComplete}
          disabled={false}
          value={otpValue}
          onChange={setOtpValue}
        />

        {(otpStore.showResendCode || isErrorSendOpt) && (
          <span
            className={"text-white underline text-sm cursor-pointer"}
            onClick={handleResendCode}
          >
            Reenviar código de verificação
          </span>
        )}
      </div>

      <div className={"flex flex-col gap-3 justify-center items-center"}>
        <Button
          color={ButtonColors.WHITE}
          className={"!w-32"}
          disabled
          isLoading={isPendingSendOtp || isPendingVerifyCode}
        >
          ENTRAR
        </Button>

        <span
          className={"text-neutral-400 underline text-sm cursor-pointer"}
          onClick={props.onBack}
        >
          Voltar
        </span>
      </div>
    </div>
  );
}
