"use client";

import Image from "next/image";
import AvatarUser from "@/app/ui/images/avatarFallback.png";
import {
  AuthRoles,
  IUserInfo,
} from "@/app/backend/business/auth/data/AuthDtos";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import NotificationsIcon from "@/app/ui/vectors/notifications-icon.svg";
import UserIcon from "@/app/ui/vectors/user-icon.svg";
import LogoutIcon from "@/app/ui/vectors/logout-icon.svg";
import CalendarIcon from "@/app/ui/vectors/calendar-icon.svg";
import PlusIcon from "@/app/ui/vectors/plus-icon.svg";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/app/backend/actions/authActions";
import { useAuthStore } from "@/app/store/authStore";
import { toast } from "sonner";
import { useNewAppointmentStore } from "@/app/store/newAppointmentStore";
import { Constants } from "@/app/utils/Constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HeroCardType, uiActions, useUIStore } from "@/app/store/uiStore";

interface AvatarOptionsProps {
  userInfo: IUserInfo;
}
export default function AvatarOptions(props: AvatarOptionsProps) {
  const setHeroCardType = useUIStore(uiActions.setHeroCardType);
  const router = useRouter();
  const removeUserInfo = useAuthStore((state) => state.removeUserInfo);
  const resetNewAppointment = useNewAppointmentStore(
    (state) => state.resetState,
  );

  const { mutate: mutateLogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    onSuccess: () => {
      removeUserInfo();
      resetNewAppointment();
      toast.info("Logout realizado com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao sair da conta, tente novamente.");
    },
  });

  const menuItems = useMemo(() => {
    switch (props.userInfo.role) {
      case AuthRoles.BUSINESS: {
        return [
          {
            label: "Home",
            icon: <NotificationsIcon className="shrink-0 size-4" />,
            onClick: () => router.push(Constants.APP_ROUTES.ADMIN),
          },
          {
            label: "Minha Conta",
            icon: <UserIcon className="shrink-0 size-4" />,
            onClick: () => {
              router.push(Constants.APP_ROUTES.ACCOUNT);
            },
          },
          {
            label: "Sair",
            icon: <LogoutIcon className="shrink-0 size-4" />,
            onClick: () => {
              mutateLogout();
            },
          },
        ];
      }
      case AuthRoles.CUSTOMER: {
        return [
          {
            label: "Agendar",
            icon: <PlusIcon className="shrink-0 size-4 stroke-black" />,
            onClick: () => {
              window.scroll(0, 0);
              setHeroCardType(HeroCardType.NEW_APPOINTMENT);
            },
          },
          {
            label: "Meus Agendamentos",
            icon: <CalendarIcon className="shrink-0 size-4" />,
            onClick: () => {
              window.scroll(0, 0);
              setHeroCardType(HeroCardType.APPOINTMENTS_LIST);
            },
          },
          {
            label: "Sair",
            icon: <LogoutIcon className="shrink-0 size-4" />,
            onClick: () => {
              mutateLogout();
            },
          },
        ];
      }
    }

    return [];
  }, [mutateLogout, props.userInfo.role, router]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className={"flex"}>
        <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
          <button
            id="hs-dropdown-account"
            type="button"
            className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-white  mr-3"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
            control-id="ControlID-5"
          >
            <Image
              className="shrink-0 size-[38px] rounded-full border-2 border-brown01"
              src={AvatarUser}
              alt="Avatar"
            />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"min-w-[15rem] mr-5"}>
        <DropdownMenuLabel>
          <div className="py-3 px-5 bg-gray-100 rounded-t-lg dark:bg-neutral-700">
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              Minha Conta
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
              {props.userInfo?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item, index) => (
          <DropdownMenuItem key={index}>
            {item.icon}
            <div
              className="flex items-center gap-2 w-full text-sm font-medium text-gray-800 dark:text-neutral-200 cursor-pointer"
              onClick={item.onClick}
            >
              {item.label}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
