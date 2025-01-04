import SelectComponent, {
  ISelectItem,
  ItemType,
} from "@/app/ui/components/select/Select";
import React, { useCallback, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { getCustomers } from "@/app/backend/actions/customerActions";
import { toast } from "sonner";

interface ICustomerSelectionProps {
  onSelectCustomer: (customer: any) => void;
  selectedCustomerNumber?: string;
}
export default function CustomerSelection(props: ICustomerSelectionProps) {
  const {
    data: customersList,
    isPending: isPendingCustomerList,
    mutate: getCustomersList,
  } = useMutation({
    mutationKey: ["getCustomers"],
    mutationFn: (data: { searchValue: string }) =>
      getCustomers(data.searchValue, data.searchValue),
    onError: () => {
      debugger;
      toast.error("Erro ao buscar clientes");
    },
  });

  const handleSelectCustomer = (customer: any) => {
    props.onSelectCustomer(customer);
  };

  const customerOptions = useMemo((): ISelectItem[] => {
    const addNewCustomerOption: ISelectItem = {
      label: "Adicionar novo cliente",
      selectedDisplay: "Adicionar novo cliente",
      value: ItemType.ADD_NEW,
      type: ItemType.ADD_NEW,
      data: { name: ItemType.ADD_NEW },
    };

    if (!customersList?.length) {
      return [addNewCustomerOption];
    }

    const customersOptionsList: ISelectItem[] = customersList.map(
      (customer) => ({
        label: customer.name,
        value: customer.msisdn,
        type: ItemType.SIMPLE,
        selectedDisplay: customer.name,
        data: customer,
      }),
    );

    customersOptionsList.push(addNewCustomerOption);

    return customersOptionsList;
  }, [customersList]);

  const handleSearchCustomerChange = useCallback(
    (value: string) => {
      getCustomersList({ searchValue: value });
    },
    [getCustomersList],
  );

  return (
    <div>
      <SelectComponent
        placeholder={"Pesquisar clientes"}
        onChange={(selected) => {
          const customers = selected.map((selectedItem) => selectedItem.data);
          handleSelectCustomer(customers[0]);
        }}
        items={customerOptions}
        defaultValue={
          props.selectedCustomerNumber
            ? [props.selectedCustomerNumber]
            : undefined
        }
        maxHeight={500}
        searchable
        onSearchChange={handleSearchCustomerChange}
        handleAddNew={() => {}}
        isLoading={isPendingCustomerList}
      />
    </div>
  );
}
