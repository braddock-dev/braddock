import { useMutation } from "@tanstack/react-query";
import { IUpdateCustomerRequest } from "@/app/backend/business/customer/CustomerDto";
import { updateCustomerInfo } from "@/app/backend/actions/customerActions";
import { toast } from "sonner";
import {
  newAppointmentSelectors,
  useNewAppointmentStore,
} from "@/app/store/newAppointmentStore";

export function useCustomerInfo() {
  const newAppointmentStore = useNewAppointmentStore(
    newAppointmentSelectors.appointmentStore,
  );

  const { mutate: mutateUpdateCustomer, isPending: isPendingUpdateCustomer } =
    useMutation({
      mutationKey: ["updateCustomer"],
      mutationFn: (updateCustomer: IUpdateCustomerRequest) => {
        return updateCustomerInfo(updateCustomer);
      },
      onError: () => {
        toast.error("Erro ao actualizar dados, tente novamente");
      },
      onSuccess: () => {
        toast.success("Dados actualizados com sucesso");
      },
    });

  return {
    mutateUpdateCustomer,
    isPendingUpdateCustomer,
  };
}
