"use client";

import { Toaster } from "sonner";
import {
  responsivenessSelectors,
  useResponsiveness,
} from "@/app/store/responsivenessStore";

export default function ToastWrapper() {
  const isSmallTabletOrLess = useResponsiveness(
    responsivenessSelectors.isSmallTabletOrLess,
  );

  return (
    <Toaster
      richColors
      position={isSmallTabletOrLess ? "top-center" : "bottom-right"}
    />
  );
}
