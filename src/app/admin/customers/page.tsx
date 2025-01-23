"use client";

import { Card } from "@/components/ui/card";
import * as React from "react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  getCustomers,
  updateCustomerInfo,
} from "@/app/backend/actions/customerActions";
import { toast } from "sonner";
import Spinner from "@/app/ui/components/spinner/Spinner";
import { CustomersTable } from "@/app/admin/customers/CustomerTable";
import CustomerForm, {
  ICustomerForm,
} from "@/app/ui/components/customer-form/CustomerForm";
import DialogWrapper from "@/app/ui/components/dialog-wrapper/DialogWrapper";
import { ICustomer } from "@/app/backend/business/customer/CustomerDto";
import { Constants } from "@/app/utils/Constants";

export default function Page() {
  const [customerToUpdate, setCustomerToUpdate] = useState<ICustomer>();

  const {
    data: customersList,
    isPending: isPendingCustomerList,
    error: errorCustomerList,
    mutate: getCustomersList,
  } = useMutation({
    mutationKey: ["getCustomers"],
    mutationFn: (data: { searchValue: string }) =>
      getCustomers(data.searchValue, data.searchValue),
    onError: () => {
      toast.error("Erro ao buscar clientes");
    },
  });

  const { isPending: isPendingUpdateCustomer, mutate: mutateUpdateCustomer } =
    useMutation({
      mutationKey: ["editCustomer"],
      mutationFn: (data: { form: ICustomerForm; customerId?: string }) =>
        updateCustomerInfo(
          {
            customerEmail: data.form.email,
            customerName: data.form.name,
            customerPhoneNumber: `${Constants.UI.PHONE_PREFIX.PT}${data.form.phoneNumber}`,
          },
          data.customerId,
        ),
      onError: () => {
        toast.error("Erro ao atualizar informações do cliente");
      },
      onSuccess: () => {
        toast.success("Informações do cliente atualizadas com sucesso");
        setCustomerToUpdate(undefined);
        getCustomersList({ searchValue: "" });
      },
    });

  useEffect(() => {
    getCustomersList({ searchValue: "" });
  }, []);

  const onUpdateCustomer = (customer: ICustomerForm) => {
    mutateUpdateCustomer({
      form: customer,
      customerId: customerToUpdate?.id,
    });
  };

  return (
    <Card className={"p-5"}>
      {isPendingCustomerList ? (
        <div className="flex items-center justify-center w-full h-[100vh]">
          <Spinner />
        </div>
      ) : errorCustomerList ? (
        <div className="flex items-center justify-center h-40 w-full">
          <p>Erro ao buscar clientes</p>
        </div>
      ) : (
        customersList && (
          <CustomersTable
            customers={customersList}
            onEditCustomer={(customer) => {
              setCustomerToUpdate(customer);
            }}
            onDeleteCustomer={(customer) => {
              console.log(customer);
            }}
          />
        )
      )}

      <DialogWrapper
        isOpen={!!customerToUpdate}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setCustomerToUpdate(undefined);
          }
        }}
        title={"Editar Cliente"}
        description={"Actualizar informações do cliente"}
        contentClassName={"max-w-[450px]"}
      >
        <CustomerForm
          onSubmit={(customerForm) => {
            onUpdateCustomer(customerForm);
          }}
          onCancel={() => {
            setCustomerToUpdate(undefined);
          }}
          defaultValues={{
            name: customerToUpdate?.name || "",
            phoneNumber: customerToUpdate?.msisdn || "",
            email: customerToUpdate?.email,
          }}
          isLoading={isPendingUpdateCustomer}
        />
      </DialogWrapper>
    </Card>
  );
}
