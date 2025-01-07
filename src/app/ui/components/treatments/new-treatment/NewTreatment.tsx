import TreatmentForm from "@/app/ui/components/treatments/tratment-form/TreatmentForm";
import { useMutation } from "@tanstack/react-query";
import { createTreatment } from "@/app/backend/actions/treatmentsActions";
import { ITreatmentFormData } from "@/app/backend/business/treatments/data/TreatmentsData";
import { toast } from "sonner";

interface NewTreatmentProps {
  onClose: () => void;
  onCreated: () => void;
}
export default function NewTreatment(props: NewTreatmentProps) {
  const { isPending, mutate } = useMutation({
    mutationKey: ["newTreatment"],
    mutationFn: (treatmentForm: ITreatmentFormData) =>
      createTreatment(treatmentForm),
    onError: () => {
      toast.error("Erro ao criar o serviço");
    },
    onSuccess: () => {
      toast.success("Serviço criado com sucesso");
      props.onCreated();
    },
  });

  return (
    <TreatmentForm
      onCancel={props.onClose}
      onSave={(data) => {
        mutate(data);
      }}
      isSaving={isPending}
    />
  );
}
