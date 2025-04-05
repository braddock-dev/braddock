"use client";

import { Card } from "@/components/ui/card";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOperators } from "@/app/backend/actions/operatorActions";
import { toast } from "sonner";
import Spinner from "@/app/ui/components/spinner/Spinner";
import { OperatorsTable } from "./OperatorsTable";

export default function Page() {
  const {
    data: operatorsList,
    isPending: isPendingOperatorsList,
    error: errorOperatorsList,
  } = useQuery({
    queryKey: ["operators"],
    queryFn: () => getOperators(),
  });

  if (errorOperatorsList) {
    toast.error("Erro ao buscar operadores");
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="p-6">
        {isPendingOperatorsList ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : (
          <OperatorsTable operators={operatorsList || []} />
        )}
      </Card>
    </div>
  );
} 