import { cn } from "@/lib/utils";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "./PhoneNumberInput.scss";

interface IPhoneNumberInputProps {
  errorMessage?: string;
  value?: string;
  onChange: (value: string) => void;
}
export default function PhoneNumberInput(props: IPhoneNumberInputProps) {
  return (
    <div className={"relative w-full"}>
      <PhoneInput
        country={"pt"}
        value={props.value}
        onChange={(phone) => {
          props.onChange(phone);
        }}
        inputProps={{
          name: "phoneNumber",
          required: true,
          autoComplete: "tel",
        }}
        containerClass={cn(
          "w-full",
          "dark:bg-background",
          props.errorMessage ? "phone-input-error" : "",
        )}
        inputClass={cn(
          "w-full !h-10 !text-base",
          "dark:!bg-background dark:!text-foreground",
          "focus:!border-primary focus:!ring-primary",
          props.errorMessage ? "!border-destructive" : "!border-input",
        )}
        buttonClass={cn(
          "dark:!bg-background dark:!border-input",
          "hover:dark:!bg-accent",
        )}
        dropdownClass="dark:!bg-background dark:!text-foreground"
        searchClass="dark:!bg-background dark:!text-foreground"
        enableSearch
        disableSearchIcon
        countryCodeEditable={false}
        preferredCountries={["pt", "br", "es", "fr", "gb"]}
      />
      {props.errorMessage && (
        <span className="text-sm text-red-500 mt-1">{props.errorMessage}</span>
      )}
    </div>
  );
}
