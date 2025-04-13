"use client";

import Spinner from "@/app/ui/components/spinner/Spinner";
import { Card } from "@/components/ui/card";

import * as React from "react";
import { Fragment, useState } from "react";
import TreatmentsTable from "@/app/admin/services/TreatmentsTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteTreatment, getTreatmentsList } from "@/app/backend/actions/treatmentsActions";
import { ITreatment, SortOrder } from "@/app/backend/business/treatments/data/TreatmentsData";
import SidePanelWrapper from "@/app/ui/components/side-panel-wrapper/SidePanelWrapper";
import NewTreatment from "@/app/ui/components/treatments/new-treatment/NewTreatment";
import EditTreatment from "@/app/ui/components/treatments/edit-treatment/EditTreatment";
import AlertDialogWrapper from "@/app/ui/components/alert-dialog-wrapper/AlertDialogWrapper";
import { toast } from "sonner";

export default function Page() {
  const [showAddTreatmentModal, setShowAddTreatmentModal] = useState(false);
  const [treatmentToBeEdited, setTreatmentToBeEdited] = useState<ITreatment>();
  const [treatmentToBeDeleted, setTreatmentToBeDeleted] = useState<ITreatment>();

  const {
    data: treatmentsList,
    isPending: isPendingTreatmentsList,
    error: errorTreatmentsList,
    refetch,
  } = useQuery({
    queryKey: ["treatments"],
    queryFn: () => getTreatmentsList(undefined, SortOrder.DESC),
  });

  const { mutate: deleteServiceMutation, isPending } = useMutation({
    mutationKey: ["removeTreatment"],
    mutationFn: (serviceId: string) => deleteTreatment(serviceId),
    onError: () => {
      toast.error("Erro ao remover o serviço, tente novamente");
    },
    onSuccess: () => {
      toast.success("Serviço removido com sucesso");
      refetch();
    },
  });

  const handleRemoveService = (serviceId?: string) => {
    if (serviceId) {
      deleteServiceMutation(serviceId);
    } else {
      toast.error("Erro ao remover o serviço, ID do serviço não encontrado");
    }
  };

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
        treatmentsList && (
          <Fragment>
            <TreatmentsTable
              treatments={treatmentsList}
              onAddTreatment={() => setShowAddTreatmentModal(true)}
              onDeleteTreatment={(tratment) => {
                setTreatmentToBeDeleted(tratment);
              }}
              onEditTreatment={(treatment) => {
                setTreatmentToBeEdited(treatment);
              }}
            />

            <SidePanelWrapper onClose={() => setShowAddTreatmentModal(false)} title={"Novo Serviço"} isOpen={showAddTreatmentModal}>
              <NewTreatment
                onClose={() => setShowAddTreatmentModal(false)}
                onCreated={() => {
                  setShowAddTreatmentModal(false);
                  refetch();
                }}
              />
            </SidePanelWrapper>

            <SidePanelWrapper onClose={() => setTreatmentToBeEdited(undefined)} title={"Actualizar Serviço"} isOpen={!!treatmentToBeEdited}>
              {treatmentToBeEdited && (
                <EditTreatment
                  onClose={() => setTreatmentToBeEdited(undefined)}
                  onCreated={() => {
                    setTreatmentToBeEdited(undefined);
                    refetch();
                  }}
                  treatment={treatmentToBeEdited}
                />
              )}
            </SidePanelWrapper>

            <AlertDialogWrapper
              isOpen={!!treatmentToBeDeleted}
              onOpenChange={(isOpen) => {
                if (!isOpen) {
                  setTreatmentToBeDeleted(undefined);
                }
              }}
              title={"Remover Serviço"}
              description={"Tem a certeza que deseja remover este serviço?"}
              onCancel={() => setTreatmentToBeDeleted(undefined)}
              onConfirm={() => handleRemoveService(treatmentToBeDeleted?.id)}
              confirmText={"Remover"}
            ></AlertDialogWrapper>
          </Fragment>
        )
      )}
    </Card>
  );
}
