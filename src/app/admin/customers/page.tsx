"use client";

import { Card } from "@/components/ui/card";
import * as React from "react";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { getCustomers } from "@/app/backend/actions/customerActions";
import { toast } from "sonner";
import Spinner from "@/app/ui/components/spinner/Spinner";
import { CustomersTable } from "@/app/admin/customers/CustomerTable";

export default function Page() {
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

  useEffect(() => {
    getCustomersList({ searchValue: "" });
  }, []);

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
        customersList && <CustomersTable customers={customersList} />
      )}
    </Card>
  );
}
