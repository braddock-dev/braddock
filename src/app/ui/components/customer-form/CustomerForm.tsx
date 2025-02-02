import Input from "@/app/ui/components/input/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import {
  UserInfoForm,
  userInfoFormSchema,
} from "@/app/ui/components/customer-form/FormSchema";
import LightPhoneNumberInput from "@/app/ui/components/phone-number-input/LightPhoneNumberInput";

export interface ICustomerForm {
  name: string;
  phoneNumber: string;
  email?: string;
}

interface ICustomerFormProps {
  onSubmit: (customer: ICustomerForm) => void;
  onCancel: () => void;
  defaultValues?: ICustomerForm;
  isLoading?: boolean;
}
export default function CustomerForm(props: ICustomerFormProps) {
  const {
    register,
    formState: { isValid, errors, touchedFields },
    getValues,
    setValue,
    trigger,
  } = useForm<UserInfoForm>({
    resolver: zodResolver(userInfoFormSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      name: props.defaultValues?.name || "",
      phoneNumber: props.defaultValues?.phoneNumber || "",
      email: props.defaultValues?.email || "",
    },
  });

  return (
    <div className={"flex gap-4 flex-col w-full"}>
      <form className={"flex gap-4 flex-col"}>
        <Input
          type={"text"}
          inputMode={"text"}
          placeholder={"Seu Nome"}
          floatingMode
          autoComplete={"name"}
          {...register("name")}
          errorMessage={errors.name?.message}
          touched={touchedFields.name}
          isValid={!errors.name && !!getValues().name}
          hasValue={!!getValues().name}
          themeMode={"light"}
        />

        <LightPhoneNumberInput
          value={getValues().phoneNumber}
          errorMessage={errors.phoneNumber?.message}
          onChange={(phoneNumber) => {
            setValue("phoneNumber", phoneNumber);
            trigger("phoneNumber");
          }}
        />

        <Input
          type={"email"}
          inputMode={"email"}
          autoComplete={"none"}
          placeholder={"Email (Opcional)"}
          floatingMode
          {...register("email", { required: false })}
          touched={touchedFields.email}
          errorMessage={errors.email?.message}
          isValid={!errors.email && !!getValues().email}
          hasValue={!!getValues().email}
          themeMode={"light"}
        />
      </form>

      <div className={"grid grid-cols-2 w-full gap-2"}>
        <Button
          color={ButtonColors.BLACK}
          onClick={props.onCancel}
          disabled={props.isLoading}
        >
          CANCELAR
        </Button>

        <Button
          color={ButtonColors.BROWN}
          onClick={() => props.onSubmit(getValues())}
          disabled={!isValid || props.isLoading}
          isLoading={props.isLoading}
        >
          SALVAR
        </Button>
      </div>
    </div>
  );
}
