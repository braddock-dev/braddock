"use client";

import AppLogo from "@/app/ui/vectors/logo-horizontal.svg";
import { useAuthStore } from "@/app/store/authStore";
import AvatarOptions from "@/app/ui/components/avatar-options/AvatarOptions";
import { operatorActions, operatorSelectors, useOperatorStore } from "@/app/store/operatorStore";
import { useQuery } from "@tanstack/react-query";
import { getOperators } from "@/app/backend/actions/operatorActions";
import { IOperator } from "@/app/backend/business/operators/data/OperatorDtos";
import SelectComponent, { ISelectItem } from "@/app/ui/components/select/Select";
import styles from "./Header.module.scss";
import { useEffect, useMemo } from "react";
import { Link, Menu } from "lucide-react";
import { menuActions, menuSelectors, useMenuStore } from "@/app/store/menuStore";
import { Constants } from "@/app/utils/Constants";

const ALL_OPERATORS_VALUE = "all";

export default function Header() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const selectedOperator = useOperatorStore(operatorSelectors.selectedOperator);
  const setSelectedOperator = useOperatorStore(operatorActions.setSelectedOperator);

  const setOperators = useOperatorStore(operatorActions.setOperators);
  const toggleMenu = useMenuStore(menuActions.toggleMenu);
  const isMenuOpen = useMenuStore(menuSelectors.isOpen);

  const { data: operators } = useQuery({
    queryKey: ["operators"],
    queryFn: () => getOperators(),
  });

  useEffect(() => {
    if (operators) {
      setOperators(operators);
    }
  }, [operators, setOperators]);

  const selectItems: ISelectItem[] = useMemo(
    () => [
      {
        label: "Todos",
        selectedDisplay: "Todos Operadores",
        value: ALL_OPERATORS_VALUE,
        data: null,
      },
      ...(operators?.map((operator) => ({
        label: operator.name,
        selectedDisplay: operator.name,
        value: operator.id,
        data: operator,
      })) || []),
    ],
    [operators]
  );

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-brown border-b text-sm py-2.5 pl-4">
      <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
        <button
          className="mr-3 bg-brown text-white p-2 rounded-md border border-white cursor-pointer"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <Menu className="size-4" />
        </button>

        <a
          className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
          href={Constants.APP_ROUTES.HOME}
          aria-label="Logo Principal"
        >
          <AppLogo className={"h-6"} />
        </a>

        <div className="w-full flex items-center justify-end ms-auto gap-x-3">
          <div className="flex justify-end">
            <SelectComponent
              selectTriggerClassName={styles.selectTrigger}
              items={selectItems}
              placeholder="Selecione um operador"
              multiple={false}
              onChange={(items) => {
                const selectedItem = items[0];
                if (selectedItem.value === ALL_OPERATORS_VALUE) {
                  setSelectedOperator(undefined);
                } else {
                  setSelectedOperator(selectedItem.data as IOperator);
                }
              }}
              defaultValue={!selectedOperator ? [ALL_OPERATORS_VALUE] : selectedOperator ? [selectedOperator.id] : []}
            />
          </div>

          <div className="flex flex-row items-center justify-end gap-1">{userInfo && <AvatarOptions userInfo={userInfo} />}</div>
        </div>
      </nav>
    </header>
  );
}
