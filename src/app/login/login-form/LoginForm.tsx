"use client";

import React, { ReactElement, useEffect } from "react";
import Image from "next/image";
import HeroImage from "@/app/ui/images/hero-image.jpg";
import LoginPhoneNumberStep from "@/app/login/login-form/LoginPhoneNumberStep";
import LoginOtpStep from "@/app/login/login-form/LoginOtpStep";
import { AuthRoles } from "@/app/backend/business/auth/data/AuthDtos";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { Constants } from "@/app/utils/Constants";
import { formatPhoneNumber } from "@/app/utils/functions";

enum LoginSteps {
  PHONE_NUMBER,
  OTP,
}

export default function LoginForm() {
  const authUser = useAuthStore((state) => state.userInfo);
  const [currentStep, setCurrentStep] = React.useState(LoginSteps.PHONE_NUMBER);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const router = useRouter();

  const currentStepComponent: Record<LoginSteps, ReactElement> = {
    [LoginSteps.PHONE_NUMBER]: (
      <LoginPhoneNumberStep onComplete={handlePhoneNumberSuccess} />
    ),
    [LoginSteps.OTP]: (
      <LoginOtpStep phoneNumber={phoneNumber} onBack={handleBack} />
    ),
  };

  function handleBack() {
    setCurrentStep(LoginSteps.PHONE_NUMBER);
  }

  function handlePhoneNumberSuccess(phoneNumber: string) {
    setPhoneNumber(phoneNumber);
    setCurrentStep(LoginSteps.OTP);
  }

  useEffect(() => {
    switch (authUser?.role) {
      case AuthRoles.BUSINESS:
        {
          router.replace(Constants.APP_ROUTES.ADMIN);
        }
        break;
      case AuthRoles.CUSTOMER: {
        router.replace(Constants.APP_ROUTES.HOME);
      }
    }
  }, [authUser?.role, router]);

  return (
    <div
      className={
        "w-full h-[100vh] bg-brown/15 flex justify-center items-center"
      }
    >
      <div
        className={
          "flex flex-col md:grid grid-cols-none md:grid-cols-2 gap-0 md:gap-7 bg-black/85 h-full md:h-[60vh] w-[100vw] md:w-[65vw] max-w-[850px] rounded-none md:rounded-2xl overflow-hidden  aspect-square"
        }
      >
        <div className={"h-[30vh] md:h-auto"}>
          <Image
            src={HeroImage}
            alt={"Hero Image"}
            className={"filter grayscale object-cover h-full"}
            width={600}
            height={900}
          />
        </div>

        <div className={"flex flex-col gap-2 p-5 justify-center items-center"}>
          <div className={"flex flex-col gap-6"}>
            <div className={"flex flex-col gap-2"}>
              <h1
                className={"text-3xl md:text-4xl font-bold text-lightBrown01"}
              >
                Entrar na plataforma
              </h1>

              {currentStep === LoginSteps.OTP && phoneNumber ? (
                <p className={"text-gray-100 text-sm"}>
                  Foi enviado um código de verificação para o número de telefone
                  <span className={"font-bold text-lightBrown01"}>
                    {formatPhoneNumber(
                      ` (${Constants.UI.PHONE_PREFIX.PT}${phoneNumber})`,
                    )}
                  </span>
                </p>
              ) : (
                <p className={"text-gray-100 text-sm"}>
                  Bem-vindo ao sistema de gestão de agendamentos online.
                </p>
              )}
            </div>

            {currentStepComponent[currentStep]}
          </div>
        </div>
      </div>
    </div>
  );
}
