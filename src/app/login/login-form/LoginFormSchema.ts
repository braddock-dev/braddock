"use client";

import { z } from "zod";
import { Constants } from "@/app/utils/Constants";

export interface LoginFormSchema {
  phoneNumber: string;
}

export const loginFormSchema = z.object({
  phoneNumber: z
    .string()
    .regex(Constants.REGEX_PATTERS.PHONE_NUMBER, "Número de telefone inválido"),
});
