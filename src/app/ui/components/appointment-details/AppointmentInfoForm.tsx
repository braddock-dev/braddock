"use client";

import SectionInfo from "@/app/ui/components/appointment-details/SectionInfo";
import React, { useMemo } from "react";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import SecondStep from "@/app/ui/components/appointment-card/appointment-steps/second-step/SecondStep";
import FirstStep, {
  SelectionMode,
} from "@/app/ui/components/appointment-card/appointment-steps/first-step/FirstStep";
import {
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";
import { Theme } from "@/app/ui/components/button-group/ButtonGroup";

interface IAppointmentInfoFormProps {
  onCancel: () => void;
  onSave: () => void;
  isSaving: boolean;
  isValid?: boolean;
}
export default function AppointmentInfoForm({
  ...props
}: IAppointmentInfoFormProps) {
  const selectedTreatments = useNewAppointmentStore(
    newAppointmentSelectors.selectedTreatments,
  );

  const totalDuration = useMemo(() => {
    return selectedTreatments.reduce(
      (acc, treatment) => acc + treatment.durationInMinutes,
      0,
    );
  }, [selectedTreatments]);

  return (
    <div className="p-4 flex flex-col gap-6">
      <SectionInfo title={`Serviços (Duração: ${totalDuration} Min)`}>
        <FirstStep
          selectionMode={SelectionMode.SELECT}
          isValidChange={() => {}}
        />
      </SectionInfo>

      <SectionInfo title={"Quando?"}>
        <SecondStep
          isValidChange={() => {}}
          onError={() => {}}
          noPadding
          theme={Theme.LIGHT}
        />
      </SectionInfo>
      <hr className={"border-neutral-200"} />

      <SectionInfo title={"Acções"}>
        <div className={"grid grid-cols-2 gap-3"}>
          <Button color={ButtonColors.BLACK} onClick={props.onCancel}>
            CANCELAR
          </Button>

          <Button
            color={ButtonColors.BROWN}
            onClick={props.onSave}
            disabled={props.isSaving || !props.isValid}
            isLoading={props.isSaving}
          >
            SALVAR
          </Button>
        </div>
      </SectionInfo>
    </div>
  );
}
