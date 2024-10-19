"use client";

import { z } from "zod";
import { Constants } from "@/app/utils/Constants";

export interface UserInfoForm {
  name: string;
  phoneNumber: string;
  email: string;
}

export const userInfoFormSchema = z.object({
  name: z.string().min(3, "Mínimo 3 Caracteres").max(255),
  phoneNumber: z
    .string()
    .regex(Constants.REGEX_PATTERS.PHONE_NUMBER, "Número de telefone inválido"),
  email: z.string().email("Email inválido"),
});
