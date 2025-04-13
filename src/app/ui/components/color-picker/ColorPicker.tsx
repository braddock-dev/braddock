import React from "react";
import Input from "../input/Input";
import { UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";

interface IColorPickerProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  trigger: UseFormTrigger<any>;
  getValues: () => any;
  errors?: { message?: string };
  touched?: boolean;
  name: string;
  label?: string;
  defaultValue?: string;
}

export default function ColorPicker({ register, setValue, trigger, getValues, name, label = "Cor", defaultValue = "#b47866" }: IColorPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-md font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          className="w-10 h-10 rounded cursor-pointer w-full"
          {...register(name)}
          value={getValues()[name] || defaultValue}
          onChange={(e) => {
            setValue(name, e.target.value);
            trigger(name);
          }}
        />
      </div>
    </div>
  );
}
