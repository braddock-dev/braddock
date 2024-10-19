import { create } from "zustand";

export interface OtpValidationStore {
  isValid: boolean;
  requestId: string | undefined;
  showResendCode: boolean;
  setIsValid: (isValid: boolean) => void;
  setRequestId: (requestId: string) => void;
  setShowResendCode: (showResendCode: boolean) => void;
  resetState: () => void;
}
export const useOtpValidationStore = create<OtpValidationStore>((set, get) => ({
  isValid: false,
  requestId: undefined,
  showResendCode: false,
  setIsValid: (isValid: boolean) => set({ isValid }),
  setRequestId: (requestId: string) => set({ requestId }),
  setShowResendCode: (showResendCode: boolean) => set({ showResendCode }),
  resetState: () =>
    set({ isValid: false, requestId: undefined, showResendCode: false }),
}));
