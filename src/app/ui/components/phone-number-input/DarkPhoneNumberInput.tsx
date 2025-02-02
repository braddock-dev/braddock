import React from "react";
import "./DarkPhoneNumberInput.scss";
import PhoneNumberInput from "@/app/ui/components/phone-number-input/PhoneNumberInput";

interface IPhoneNumberInputProps {
  errorMessage?: string;
  value?: string;
  onChange: (value: string) => void;
}
export default function DarkPhoneNumberInput(props: IPhoneNumberInputProps) {
  return <PhoneNumberInput {...props} />;
}
