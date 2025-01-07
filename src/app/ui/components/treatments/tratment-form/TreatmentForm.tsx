import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import SectionInfo from "@/app/ui/components/appointment-details/SectionInfo";
import React from "react";
import Input from "@/app/ui/components/input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ITreatmentFormData } from "@/app/backend/business/treatments/data/TreatmentsData";
import { z } from "zod";

export const treatmentInfoFormSchema = z.object({
  name: z.string().min(3, "Mínimo 3 Caracteres").max(255),
  duration: z.number().int().min(0, "Mínimo 0"),
  price: z.string().optional(),
});

interface ITreatmentFormProps {
  onCancel: () => void;
  onSave: (data: ITreatmentFormData) => void;
  isSaving: boolean;
  defaultValues?: ITreatmentFormData;
}
export default function TreatmentForm(props: ITreatmentFormProps) {
  const {
    register,
    formState: { isValid, errors, touchedFields },
    getValues,
  } = useForm<ITreatmentFormData>({
    resolver: zodResolver(treatmentInfoFormSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: props.defaultValues,
  });

  const showPrice = false;

  return (
    <div className="p-4 flex flex-col gap-4">
      <form className={"flex gap-4 flex-col"}>
        <Input
          type={"text"}
          inputMode={"text"}
          placeholder={"Seu Nome"}
          floatingMode
          {...register("name")}
          errorMessage={errors.name?.message}
          touched={touchedFields.name}
          isValid={!errors.name && !!getValues().name}
          hasValue={!!getValues().name}
          themeMode={"light"}
        />

        <Input
          type={"number"}
          inputMode={"numeric"}
          placeholder={"Duração em Minutos"}
          floatingMode
          {...register("duration", { valueAsNumber: true })}
          errorMessage={errors.duration?.message}
          touched={touchedFields.duration}
          isValid={!errors.duration && !!getValues().duration}
          hasValue={!!getValues().duration}
          themeMode={"light"}
        />

        {showPrice && (
          <Input
            type={"number"}
            inputMode={"numeric"}
            placeholder={"Preço"}
            floatingMode
            {...register("price", { valueAsNumber: true })}
            errorMessage={errors.price?.message}
            touched={touchedFields.price}
            isValid={!errors.price && !!getValues().price}
            hasValue={!!getValues().price}
            themeMode={"light"}
          />
        )}
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
