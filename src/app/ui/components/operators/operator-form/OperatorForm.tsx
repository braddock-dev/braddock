import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import SectionInfo from "@/app/ui/components/appointment-details/SectionInfo";
import React from "react";
import Input from "@/app/ui/components/input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";
import { z } from "zod";
import { PHONE_NUMBER_VALIDATION_RULE } from "@/lib/utils";
import LightPhoneNumberInput from "../../phone-number-input/LightPhoneNumberInput";
import ColorPicker from "../../color-picker/ColorPicker";

export const operatorFormSchema = z.object({
  name: z.string().min(3, "Mínimo 3 Caracteres").max(255),
  msisdn: PHONE_NUMBER_VALIDATION_RULE,
  email: z.string().email("Email inválido"),
  description: z.string().min(3, "Mínimo 3 Caracteres").max(255),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Cor inválida"),
});

interface IOperatorFormProps {
  onCancel: () => void;
  onSave: (data: IOperator) => void;
  isSaving: boolean;
  defaultValues?: Partial<IOperator>;
}

export default function OperatorForm(props: IOperatorFormProps) {
  const {
    register,
    formState: { isValid, errors, touchedFields },
    getValues,
    setValue,
    trigger,
  } = useForm<IOperator>({
    resolver: zodResolver(operatorFormSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: props.defaultValues,
  });

  return (
    <div className="p-4 flex flex-col gap-4">
      <form className={"flex gap-4 flex-col"}>
        <Input
          type={"text"}
          inputMode={"text"}
          placeholder={"Nome"}
          floatingMode
          {...register("name")}
          errorMessage={errors.name?.message}
          touched={touchedFields.name}
          isValid={!errors.name && !!getValues().name}
          hasValue={!!getValues().name}
          themeMode={"light"}
        />

        <LightPhoneNumberInput
          value={getValues().msisdn}
          errorMessage={errors.msisdn?.message}
          onChange={(phoneNumber) => {
            setValue("msisdn", phoneNumber);
            trigger("msisdn");
          }}
        />

        <Input
          type={"email"}
          inputMode={"email"}
          placeholder={"Email"}
          floatingMode
          {...register("email")}
          errorMessage={errors.email?.message}
          touched={touchedFields.email}
          isValid={!errors.email && !!getValues().email}
          hasValue={!!getValues().email}
          themeMode={"light"}
        />

        <Input
          type={"text"}
          inputMode={"text"}
          placeholder={"Cargo"}
          floatingMode
          {...register("description")}
          errorMessage={errors.description?.message}
          touched={touchedFields.description}
          isValid={!errors.description && !!getValues().description}
          hasValue={!!getValues().description}
          themeMode={"light"}
        />

        <ColorPicker
          register={register}
          setValue={setValue}
          trigger={trigger}
          getValues={getValues}
          errors={errors.color}
          touched={touchedFields.color}
          name="color"
          label="Cor para agendamentos"
        />
      </form>

      <SectionInfo title={"Acções"}>
        <div className={"grid grid-cols-2 gap-3"}>
          <Button color={ButtonColors.BLACK} onClick={props.onCancel}>
            CANCELAR
          </Button>

          <Button
            color={ButtonColors.BROWN}
            onClick={() => props.onSave(getValues())}
            disabled={props.isSaving || !isValid}
            isLoading={props.isSaving}
          >
            SALVAR
          </Button>
        </div>
      </SectionInfo>
    </div>
  );
}
