"use client";

import SectionInfo from "@/app/ui/components/appointment-details/SectionInfo";
import React, { Fragment, useMemo } from "react";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import SecondStep from "@/app/ui/components/appointment-card/appointment-steps/second-step/SecondStep";
import FirstStep, { SelectionMode } from "@/app/ui/components/appointment-card/appointment-steps/first-step/FirstStep";
import { newAppointmentActions, newAppointmentSelectors, useNewAppointmentStore } from "@/app/store/newAppointmentStore";
import { Theme } from "@/app/ui/components/button-group/ButtonGroup";
import { ICustomer } from "@/app/backend/business/customer/CustomerDto";
import CustomerSelection from "@/app/ui/components/customer-selection/CustomerSelection";
import { ICustomerForm } from "@/app/ui/components/customer-form/CustomerForm";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";
import OperatorSelector from "../operators/operator-selector/OperatorSelector";

interface IAppointmentInfoFormProps {
  onCancel: () => void;
  onSave: () => void;
  isSaving: boolean;
  isValid?: boolean;
}
export default function AppointmentInfoForm({ ...props }: IAppointmentInfoFormProps) {
  const selectedCustomerInfo = useNewAppointmentStore(newAppointmentSelectors.selectedCustomerInfo);

  const setSelectedCustomerInfo = useNewAppointmentStore(newAppointmentActions.setCustomerInfo);

  const selectedTreatments = useNewAppointmentStore(newAppointmentSelectors.selectedTreatments);

  const setSelectedTreatment = useNewAppointmentStore(newAppointmentActions.setSelectedTreatment);

  const setEmployeeId = useNewAppointmentStore(newAppointmentActions.setEmployeeId);
  const employeeId = useNewAppointmentStore(newAppointmentSelectors.employeeId);

  const totalDuration = useMemo(() => {
    return selectedTreatments.reduce((acc, treatment) => acc + treatment.durationInMinutes, 0);
  }, [selectedTreatments]);

  const handleSelectCustomer = (customer?: ICustomer) => {
    if (customer) {
      setSelectedCustomerInfo(customer.name, customer.msisdn, customer.email);
    } else {
      setSelectedCustomerInfo("", "", "");
    }
  };

  const handleAddNewCustomer = (customer: ICustomerForm) => {
    setSelectedCustomerInfo(customer.name, customer.phoneNumber, "");
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <SectionInfo title={`Operador`}>
        <OperatorSelector
          selectedOperator={employeeId}
          setSelectedOperator={(operator) => {
            setEmployeeId(operator?.id);
            setSelectedTreatment([]);
          }}
        />
      </SectionInfo>

      {employeeId && (
        <SectionInfo title={`Serviços (Duração: ${totalDuration} Min)`}>
          <FirstStep selectionMode={SelectionMode.SELECT} isValidChange={() => {}} />
        </SectionInfo>
      )}

      {!!selectedTreatments.length && (
        <Fragment>
          <hr className={"border-neutral-200"} />
          <SectionInfo title={"Selecione o Cliente"}>
            <CustomerSelection
              onSelectCustomer={handleSelectCustomer}
              selectedCustomerNumber={selectedCustomerInfo.phoneNumber}
              onAddNewCustomer={handleAddNewCustomer}
            />
          </SectionInfo>
        </Fragment>
      )}

      {!!selectedCustomerInfo.phoneNumber && (
        <Fragment>
          <hr className={"border-neutral-200"} />
          <SectionInfo title={"Quando?"}>
            <SecondStep isValidChange={() => {}} onError={() => {}} noPadding theme={Theme.LIGHT} />
          </SectionInfo>

          <SectionInfo title={"Acções"}>
            <div className={"grid grid-cols-2 gap-3"}>
              <Button color={ButtonColors.BLACK} onClick={props.onCancel}>
                CANCELAR
              </Button>

              <Button color={ButtonColors.BROWN} onClick={props.onSave} disabled={props.isSaving || !props.isValid} isLoading={props.isSaving}>
                SALVAR
              </Button>
            </div>
          </SectionInfo>
        </Fragment>
      )}
    </div>
  );
}
