"use client";

import Spinner from "@/app/ui/components/spinner/Spinner";
import { Card } from "@/components/ui/card";

import * as React from "react";
import TreatmentsTable from "@/app/admin/services/TreatmentsTable";
import { useQuery } from "@tanstack/react-query";
import { getTreatmentsList } from "@/app/backend/actions/treatmentsActions";

export default function Page() {
  const {
    data: treatmentsList,
    isPending: isPendingTreatmentsList,
    error: errorTreatmentsList,
  } = useQuery({
    queryKey: ["treatments"],
    queryFn: () => getTreatmentsList(),
  });

  return (
    <Card className={"p-5"}>
      {isPendingTreatmentsList ? (
        <div className="flex items-center justify-center w-full h-[100vh]">
          <Spinner />
        </div>
      ) : errorTreatmentsList ? (
        <div className="flex items-center justify-center h-40 w-full">
          <p>Erro ao buscar clientes</p>
        </div>
      ) : (
        treatmentsList && <TreatmentsTable treatments={treatmentsList} />
      )}
    </Card>
  );
}
