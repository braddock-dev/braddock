"use client";

import * as React from "react";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOperator } from "@/app/backend/actions/operatorActions";
import { toast } from "sonner";
import OperatorForm from "../operator-form/OperatorForm";

interface EditOperatorProps {
  operator: IOperator;
  onClose: () => void;
  onUpdated: () => void;
}

export function EditOperator(props: EditOperatorProps) {
  const queryClient = useQueryClient();

  const { mutate: updateOperatorMutation, isPending } = useMutation({
    mutationKey: ["updateOperator"],
    mutationFn: (data: IOperator) => updateOperator(props.operator.id, data),
    onError: () => {
      toast.error("Erro ao atualizar operador");
    },
    onSuccess: () => {
      toast.success("Operador atualizado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["operators"] });
      props.onUpdated();
    },
  });

  return (
    <OperatorForm
      onCancel={props.onClose}
      onSave={(data) => updateOperatorMutation(data)}
      isSaving={isPending}
      defaultValues={{
        name: props.operator.name,
        msisdn: props.operator.msisdn,
        email: props.operator.email,
        description: props.operator.description,
      }}
    />
  );
}
