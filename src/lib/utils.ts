import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PHONE_NUMBER_VALIDATION_RULE = z
  .string()
  .min(11, "Número de telefone inválido")
  .regex(/^\+?[1-9]\d{1,14}$/, "Número de telefone inválido");

export const isValidImageUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
