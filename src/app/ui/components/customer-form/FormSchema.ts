"use client";

import { z } from "zod";
import { PHONE_NUMBER_VALIDATION_RULE } from "@/lib/utils";

export interface UserInfoForm {
  name: string;
  phoneNumber: string;
  email?: string;
}

export const userInfoFormSchema = z.object({
  name: z.string().min(3, "Mínimo 3 Caracteres").max(255),
  phoneNumber: PHONE_NUMBER_VALIDATION_RULE,
  email: z.string().optional(),
});
