"use client";

import * as React from "react";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOperator } from "@/app/backend/actions/operatorActions";
import { toast } from "sonner";
import OperatorForm from "../operator-form/OperatorForm";

interface CreateOperatorProps {
  onClose: () => void;
  onCreated: () => void;
}

export function CreateOperator(props: CreateOperatorProps) {
  const queryClient = useQueryClient();

  const { mutate: createOperatorMutation, isPending } = useMutation({
    mutationKey: ["createOperator"],
    mutationFn: (data: IOperator) => createOperator(data),
    onError: () => {
      toast.error("Erro ao criar operador");
    },
    onSuccess: () => {
      toast.success("Operador criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["operators"] });
      props.onCreated();
    },
  });

  return (
    <OperatorForm
      onCancel={props.onClose}
      onSave={(data) => createOperatorMutation(data as IOperator)}
      isSaving={isPending}
    />
  );
} 