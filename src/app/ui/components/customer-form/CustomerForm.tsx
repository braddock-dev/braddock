import Input from "@/app/ui/components/input/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import {
  UserInfoForm,
  userInfoFormSchema,
} from "@/app/ui/components/customer-form/FormSchema";

export interface ICustomerForm {
  name: string;
  phoneNumber: string;
}

interface ICustomerFormProps {
  onSubmit: (customer: ICustomerForm) => void;
  onCancel: () => void;
  defaultValues?: ICustomerForm;
}
export default function CustomerForm(props: ICustomerFormProps) {
  const {
    register,
    formState: { isValid, errors, touchedFields },
    getValues,
  } = useForm<UserInfoForm>({
    resolver: zodResolver(userInfoFormSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      name: props.defaultValues?.name || "",
      phoneNumber: props.defaultValues?.phoneNumber || "",
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

        <Input
          type={"tel"}
          inputMode={"tel"}
          autoComplete={"none"}
          placeholder={"Seu Contacto (PT)"}
          floatingMode
          {...register("phoneNumber", { required: true, min: 10 })}
          touched={touchedFields.phoneNumber}
          errorMessage={errors.phoneNumber?.message}
          isValid={!errors.phoneNumber && !!getValues().phoneNumber}
          hasValue={!!getValues().phoneNumber}
          themeMode={"light"}
        />
      </form>

      <div className={"grid grid-cols-2 w-full gap-2"}>
        <Button color={ButtonColors.BLACK} onClick={props.onCancel}>
          CANCELAR
        </Button>

        <Button
          color={ButtonColors.BROWN}
          onClick={() => props.onSubmit(getValues())}
          disabled={!isValid}
        >
          SALVAR
        </Button>
      </div>
    </div>
  );
}
