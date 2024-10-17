import SectionInfo from "@/app/ui/components/appointment-details/SectionInfo";
import React from "react";
import { IAppointment } from "@/app/backend/business/treatments/data/AppointmentData";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import SelectComponent, {
  ISelectItem,
} from "@/app/ui/components/select/Select";

interface IAppointmentInfoFormProps {
  appointment: IAppointment;
  onCancel: () => void;
  onSave: () => void;
}
export default function AppointmentInfoForm({
  appointment,
  ...props
}: IAppointmentInfoFormProps) {
  const { treatments } = appointment;

  const handleSelectedButtonsChange = (selectedButtons: string[]) => {
    console.log(selectedButtons);
  };

  const options: ISelectItem[] = [
    { value: "Corte de cabelo", label: "Corte de cabelo" },
    { value: "barba", label: "Corte e Barba" },
    { value: "Barbaterapia", label: "Barbaterapia" },
  ];

  return (
    <div className="p-4 flex flex-col gap-6">
      <SectionInfo title={"Serviços"}>
        <SelectComponent
          placeholder={"Selecione os serviços"}
          onChange={() => {}}
          items={options}
          defaultValue={["barba"]}
        />
      </SectionInfo>

      <hr className={"border-neutral-200"} />

      <SectionInfo title={"Acções"}>
        <div className={"grid grid-cols-2 gap-3"}>
          <Button color={ButtonColors.BLACK} onClick={props.onCancel}>
            CANCELAR
          </Button>

          <Button color={ButtonColors.BROWN} onClick={props.onSave}>
            SALVAR
          </Button>
        </div>
      </SectionInfo>
    </div>
  );
}
