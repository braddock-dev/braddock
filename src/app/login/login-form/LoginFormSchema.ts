"use client";

import { z } from "zod";
import { PHONE_NUMBER_VALIDATION_RULE } from "@/lib/utils";

export interface LoginFormSchema {
  phoneNumber: string;
}

export const loginFormSchema = z.object({
  phoneNumber: PHONE_NUMBER_VALIDATION_RULE,
});
