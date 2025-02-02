import React from "react";
import "./LightPhoneNumberInput.scss";
import PhoneNumberInput from "@/app/ui/components/phone-number-input/PhoneNumberInput";

interface IPhoneNumberInputProps {
  errorMessage?: string;
  value?: string;
  onChange: (value: string) => void;
}
export default function LightPhoneNumberInput(props: IPhoneNumberInputProps) {
  return <PhoneNumberInput {...props} />;
}
