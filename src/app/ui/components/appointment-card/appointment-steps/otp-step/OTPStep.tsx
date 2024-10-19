import { OtpInput } from "@/app/ui/components/otp-input/OtpInput";
import {
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import { useOTPValidationCode } from "@/app/ui/components/appointment-card/appointment-steps/otp-step/useOTPData";
import { useOtpValidationStore } from "@/app/store/otpValidationStore";
import Logger from "@/app/utils/Logger";

const LOG_TAG = "OTPStep";
interface IOTPStepProps {
  isValidChange: (isValid: boolean) => void;
}
export default function OTPStep(props: IOTPStepProps) {
  const otpStore = useOtpValidationStore((state) => state);

  const phoneNumber = useNewAppointmentStore(
    newAppointmentSelectors.phoneNumber,
  );

  const { mutateSendOtp, isErrorSendOpt, mutateVerifyCode } =
    useOTPValidationCode();

  const handleResendCode = () => {
    mutateSendOtp(phoneNumber);
  };

  const handleOnComplete = (otp: string) => {
    if (!otpStore.requestId) {
      Logger.error(LOG_TAG, "RequestId not found");
      return;
    }

    mutateVerifyCode({
      otpCode: otp,
      requestId: otpStore.requestId,
    }).then(() => {
      props.isValidChange(true);
    });
  };

  return (
    <div className={"flex flex-col gap-5"}>
      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-white font-bold text-xl"}>
          Insira o código de verificação
        </h1>
        <p className={"text-white/80 text-sm"}>
          Enviamos um código de verificação para o número de telefone
          cadastrado. Insira o código abaixo.
        </p>

        <div className={"mt-5 flex justify-center items-center flex-col gap-5"}>
          <OtpInput onComplete={handleOnComplete} disabled={isErrorSendOpt} />

          {otpStore.showResendCode && (
            <span
              className={"text-white underline text-sm cursor-pointer"}
              onClick={handleResendCode}
            >
              Reenviar código de verificação
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
