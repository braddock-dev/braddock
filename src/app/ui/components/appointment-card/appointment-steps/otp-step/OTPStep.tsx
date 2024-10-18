import { OtpInput } from "@/app/ui/components/otp-input/OtpInput";

interface IOTPStepProps {
  isValidChange: (isValid: boolean) => void;
}
export default function OTPStep(props: IOTPStepProps) {
  const handleResendCode = () => {
    console.log("Resend code");
  };

  const handleOnComplete = (otp: string) => {
    console.log(otp);
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
          <OtpInput onComplete={handleOnComplete} />

          <span
            className={"text-white underline text-sm"}
            onClick={handleResendCode}
          >
            Reenviar código de verificação
          </span>
        </div>
      </div>
    </div>
  );
}
