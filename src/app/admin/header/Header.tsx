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

const ALL_OPERATORS_VALUE = "all";

export default function Header() {
  const userInfo = useAuthStore((state) => state.userInfo);
  const selectedOperator = useOperatorStore(operatorSelectors.selectedOperator);
  const setSelectedOperator = useOperatorStore(operatorActions.setSelectedOperator);

  const setOperators = useOperatorStore(operatorActions.setOperators);

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
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-brown border-b text-sm py-2.5 lg:ps-[260px]">
      <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
        <div className="me-5 lg:me-0 lg:hidden flex items-center gap-4">
          <button
            type="button"
            className="size-8 flex justify-center items-center gap-x-2 border border-white text-white rounded-lg focus:outline-none focus:text-white disabled:opacity-50 disabled:pointer-events-none"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-application-sidebar"
            aria-label="Toggle navigation"
            data-hs-overlay="#hs-application-sidebar"
          >
            <span className="sr-only">Abrir menu</span>
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M15 3v18" />
              <path d="m8 9 3 3-3 3" />
            </svg>
          </button>
          <a className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80" href="#" aria-label="Preline">
            <AppLogo className={"h-6"} />
          </a>
        </div>

        <div className="w-full flex items-center justify-end ms-auto  gap-x-3">
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
