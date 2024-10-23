"use client";

import SectionInfo from "@/app/ui/components/appointment-details/SectionInfo";
import React, { useMemo } from "react";
import { IAppointment } from "@/app/backend/business/treatments/data/AppointmentData";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import SelectComponent, {
  ISelectItem,
  ItemType,
} from "@/app/ui/components/select/Select";
import { useQuery } from "@tanstack/react-query";
import { getTreatmentsList } from "@/app/backend/actions/treatmentsActions";
import { ITreatment } from "@/app/backend/business/treatments/data/TreatmentsData";

interface IAppointmentInfoFormProps {
  appointment: IAppointment;
  onCancel: () => void;
  onSave: () => void;
}
export default function AppointmentInfoForm({
  appointment,
  ...props
}: IAppointmentInfoFormProps) {
  const [selectedTreatments, setSelectedTreatments] = React.useState<
    ITreatment[]
  >(appointment.treatments);

  const {
    data: allTreatments,
    isLoading: isTreatmentsLoading,
    refetch: refetchTreatments,
    isError: isTreatmentsError,
    error: treatmentsError,
  } = useQuery({
    queryKey: ["treatmentsList"],
    queryFn: () => getTreatmentsList(),
  });

  const handleSelectedButtonsChange = (selectedButtons: string[]) => {
    console.log(selectedButtons);
  };

  const options = useMemo((): ISelectItem[] => {
    if (!allTreatments) return [];

    return allTreatments.map((treatment) => ({
      label: `${treatment.name} - ${treatment.durationInMinutes} Min`,
      selectedDisplay: treatment.name,
      value: treatment.id,
      type: ItemType.SIMPLE,
      data: treatment,
    }));
  }, [allTreatments]);

  const defaultSelectedIds = useMemo(() => {
    return appointment.treatments.map((treatment) => treatment.id);
  }, [appointment.treatments]);

  const totalDuration = useMemo(() => {
    return selectedTreatments.reduce(
      (acc, treatment) => acc + treatment.durationInMinutes,
      0,
    );
  }, [selectedTreatments]);

  return (
    <div className="p-4 flex flex-col gap-6">
      <SectionInfo title={`Serviços (Duração: ${totalDuration} Min)`}>
        <SelectComponent
          placeholder={"Selecione os serviços"}
          onChange={(selected) => {
            setSelectedTreatments(
              selected.map((selectedItem) => selectedItem.data),
            );
          }}
          items={options}
          defaultValue={defaultSelectedIds}
          maxHeight={500}
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
