"use client";

import { z } from "zod";
import { PHONE_NUMBER_VALIDATION_RULE } from "@/lib/utils";

export interface UserInfoForm {
  name: string;
  phoneNumber: string;
  email: string;
}

export const userInfoFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phoneNumber: PHONE_NUMBER_VALIDATION_RULE,
});
