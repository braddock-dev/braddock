import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ICompleteAuthData,
  IOtpRequestData,
} from "@/app/backend/business/auth/data/OtpData";
import { sendOtp, verifyOtp } from "@/app/backend/actions/authActions";
import { useOtpValidationStore } from "@/app/store/otpValidationStore";
import { useAuthStore } from "@/app/store/authStore";
import { AuthRoles } from "@/app/backend/business/auth/data/AuthDtos";

const LOADING_TOAST_ID = "loading-toast";

export const useOTPValidationCode = (
  onVerifySuccess?: (userRole: AuthRoles) => void,
) => {
  const store = useOtpValidationStore((state) => state);
  const setAuthUser = useAuthStore((state) => state.setUserInfo);

  const {
    mutateAsync: mutateSendOtp,
    isError: isErrorSendOpt,
    isPending: isPendingSendOtp,
  } = useMutation({
    mutationKey: ["sendOTP"],
    mutationFn: (phoneNumber: string) => sendOtp(phoneNumber),
    onSuccess: (requestId: string) => {
      toast.success("Código de verificação enviado com sucesso");
      store.setRequestId(requestId);
    },
    onError: () => {
      toast.error("Erro ao enviar código de verificação");
    },
    onMutate: () => {
      store.resetState();
      toast.loading("Enviando código...", { id: LOADING_TOAST_ID });
    },
    onSettled: () => {
      toast.dismiss(LOADING_TOAST_ID);
    },
  });

  const {
    mutate: mutateVerifyCode,
    isPending: isPendingVerifyCode,
    isError: isErrorVerifyOtp,
  } = useMutation({
    mutationKey: ["verifyOTP"],
    mutationFn: (data: IOtpRequestData) => verifyOtp(data),
    onSuccess: (data: ICompleteAuthData) => {
      toast.success("Código de verificação validado com sucesso");
      store.setIsValid(true);
      setAuthUser(data.userInfo);
      onVerifySuccess?.(data.userInfo.role);
    },
    onError: () => {
      toast.error("Erro ao validar código de verificação, tente novamente");
      store.setShowResendCode(true);
    },
    onMutate: () => {
      toast.loading("Validando o código...", { id: LOADING_TOAST_ID });
    },
    onSettled: () => {
      toast.dismiss(LOADING_TOAST_ID);
    },
  });

  return {
    mutateSendOtp,
    isPendingSendOtp,
    mutateVerifyCode,
    isPendingVerifyCode,
    isErrorSendOpt,
    isErrorVerifyOtp,
  };
};
