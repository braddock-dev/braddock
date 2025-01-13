import TreatmentForm from "@/app/ui/components/treatments/tratment-form/TreatmentForm";
import { useMutation } from "@tanstack/react-query";
import { updateTreatment } from "@/app/backend/actions/treatmentsActions";
import {
  ITreatment,
  ITreatmentFormData,
} from "@/app/backend/business/treatments/data/TreatmentsData";
import { toast } from "sonner";

interface NewTreatmentProps {
  onClose: () => void;
  onCreated: () => void;
  treatment: ITreatment;
}
export default function EditTreatment(props: NewTreatmentProps) {
  const { isPending, mutate } = useMutation({
    mutationKey: ["updateTreatment"],
    mutationFn: (data: {
      treatmentId: string;
      treatmentForm: ITreatmentFormData;
    }) => updateTreatment(data.treatmentId, data.treatmentForm),
    onError: () => {
      toast.error("Erro ao actualizar o serviço");
    },
    onSuccess: () => {
      toast.success("Serviço actualizado com sucesso");
      props.onCreated();
    },
  });

  return (
    <TreatmentForm
      onCancel={props.onClose}
      onSave={(data) => {
        mutate({ treatmentId: props.treatment.id, treatmentForm: data });
      }}
      isSaving={isPending}
      defaultValues={{
        name: props.treatment.name,
        duration: props.treatment.durationInMinutes,
        price: props.treatment.price || "",
      }}
    />
  );
}
