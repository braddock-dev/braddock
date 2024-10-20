import { useMutation } from "@tanstack/react-query";
import { IUpdateCustomerRequest } from "@/app/backend/business/customer/CustomerDto";
import { updateCustomerInfo } from "@/app/backend/actions/customerActions";

export function useCustomerInfo() {
  const { mutate: mutateUpdateCustomer, isPending: isPendingUpdateCustomer } =
    useMutation({
      mutationKey: ["updateCustomer"],
      mutationFn: (updateCustomer: IUpdateCustomerRequest) => {
        return updateCustomerInfo(updateCustomer);
      },
    });

  return {
    mutateUpdateCustomer,
    isPendingUpdateCustomer,
  };
}
