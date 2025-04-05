"use client";

import { Card } from "@/components/ui/card";
import * as React from "react";
import { Fragment, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOperators, deleteOperator } from "@/app/backend/actions/operatorActions";
import { toast } from "sonner";
import Spinner from "@/app/ui/components/spinner/Spinner";
import { OperatorsTable } from "./OperatorsTable";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";
import SidePanelWrapper from "@/app/ui/components/side-panel-wrapper/SidePanelWrapper";
import { EditOperator } from "@/app/ui/components/operators/edit-operator/EditOperator";
import { CreateOperator } from "@/app/ui/components/operators/create-operator/CreateOperator";
import AlertDialogWrapper from "@/app/ui/components/alert-dialog-wrapper/AlertDialogWrapper";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";

export default function Page() {
  const [operatorToBeEdited, setOperatorToBeEdited] = useState<IOperator>();
  const [operatorToBeDeleted, setOperatorToBeDeleted] = useState<IOperator>();
  const [isCreatingOperator, setIsCreatingOperator] = useState(false);

  const {
    data: operatorsList,
    isPending: isPendingOperatorsList,
    error: errorOperatorsList,
    refetch,
  } = useQuery({
    queryKey: ["operators"],
    queryFn: () => getOperators(),
  });

  const { mutate: deleteOperatorMutation, isPending: isPendingDelete } = useMutation({
    mutationKey: ["deleteOperator"],
    mutationFn: (operatorId: string) => deleteOperator(operatorId),
    onError: () => {
      toast.error("Erro ao remover o operador");
    },
    onSuccess: () => {
      toast.success("Operador removido com sucesso");
      refetch();
    },
  });

  const handleDeleteOperator = (operatorId?: string) => {
    if (operatorId) {
      deleteOperatorMutation(operatorId);
    } else {
      toast.error("Erro ao remover o operador, ID não encontrado");
    }
  };

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
          <Fragment>
            <OperatorsTable
              operators={operatorsList || []}
              onEditOperator={(operator) => setOperatorToBeEdited(operator)}
              onDeleteOperator={(operator) => setOperatorToBeDeleted(operator)}
              onAddOperator={() => setIsCreatingOperator(true)}
            />

            <SidePanelWrapper
              onClose={() => setOperatorToBeEdited(undefined)}
              title={"Editar Operador"}
              isOpen={!!operatorToBeEdited}
            >
              {operatorToBeEdited && (
                <EditOperator
                  operator={operatorToBeEdited}
                  onClose={() => setOperatorToBeEdited(undefined)}
                  onUpdated={() => {
                    setOperatorToBeEdited(undefined);
                    refetch();
                  }}
                />
              )}
            </SidePanelWrapper>

            <SidePanelWrapper
              onClose={() => setIsCreatingOperator(false)}
              title={"Criar Operador"}
              isOpen={isCreatingOperator}
            >
              <CreateOperator
                onClose={() => setIsCreatingOperator(false)}
                onCreated={() => {
                  setIsCreatingOperator(false);
                  refetch();
                }}
              />
            </SidePanelWrapper>

            <AlertDialogWrapper
              isOpen={!!operatorToBeDeleted}
              onOpenChange={(isOpen) => {
                if (!isOpen) {
                  setOperatorToBeDeleted(undefined);
                }
              }}
              title={"Remover Operador"}
              description={"Tem a certeza que deseja remover este operador?"}
              onCancel={() => setOperatorToBeDeleted(undefined)}
              onConfirm={() => handleDeleteOperator(operatorToBeDeleted?.id)}
              confirmText={"Remover"}
            />
          </Fragment>
        )}
      </Card>
    </div>
  );
} 