import { IOperator, IToggleTreatment } from "@/app/backend/business/operators/data/OperatorDtos";
import AddOperatorSelector from "./AddTreatmentSelector";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTreatmentsList } from "@/app/backend/actions/treatmentsActions";
import { toggleTreatment } from "@/app/backend/actions/operatorActions";
import { useMemo } from "react";
import { toast } from "sonner";

interface IAddOperatorTreatmentsProps {
  operator: IOperator;
  onClose: () => void;
}
export default function AddOperatorTreatments({ operator, onClose }: IAddOperatorTreatmentsProps) {
  const {
    data: treatments,
    isLoading: isTreatmentsLoading,
    refetch,
  } = useQuery({
    queryKey: ["operatorTreatmentsList", operator.id],
    queryFn: () => getTreatmentsList(operator.id),
  });

  const { mutate: toggleTreatmentMutation, isPending: isTogglingTreatment } = useMutation({
    mutationKey: ["toggleTreatment"],
    mutationFn: (toggleTreatmentData: IToggleTreatment) => toggleTreatment(toggleTreatmentData),
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      toast.error("Erro ao associar/desassociar serviço");
    },
  });

  const selectedTreatmentsIds = useMemo(() => {
    return treatments?.map((treatment) => treatment.id) || [];
  }, [treatments]);

  const handleSelectTreatment = (treatmentId: string) => {
    toggleTreatmentMutation({
      operatorId: operator.id,
      treatmentId,
      isActive: false,
    });
  };

  const handleDeselectTreatment = (treatmentId: string) => {
    toggleTreatmentMutation({
      operatorId: operator.id,
      treatmentId,
      isActive: true,
    });
  };

  const isLoading = isTreatmentsLoading || isTogglingTreatment;

  return (
    <AddOperatorSelector
      selectedTreatments={selectedTreatmentsIds}
      onSelect={handleSelectTreatment}
      onDeselect={handleDeselectTreatment}
      isLoading={isLoading}
    />
  );
}
