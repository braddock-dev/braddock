"use client";

import Image from "next/image";
import AvatarUser from "@/app/ui/images/avatarFallback.png";
import {
  AuthRoles,
  IUserInfo,
} from "@/app/backend/business/auth/data/AuthDtos";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import NotificationsIcon from "@/app/ui/vectors/notifications-icon.svg";
import UserIcon from "@/app/ui/vectors/user-icon.svg";
import LogoutIcon from "@/app/ui/vectors/logout-icon.svg";
import CalendarIcon from "@/app/ui/vectors/calendar-icon.svg";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/app/backend/actions/authActions";
import { useAuthStore } from "@/app/store/authStore";
import { toast } from "sonner";
import { useNewAppointmentStore } from "@/app/store/newAppointmentStore";

interface AvatarOptionsProps {
  userInfo: IUserInfo;
}
export default function AvatarOptions(props: AvatarOptionsProps) {
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
      toast.success("Conta desconectada com sucesso.");
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
            label: "Notificações",
            icon: <NotificationsIcon className="shrink-0 size-4" />,
            onClick: () => router.push("/notifications"),
          },
          {
            label: "Minha Conta",
            icon: <UserIcon className="shrink-0 size-4" />,
            onClick: () => router.push("/account"),
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
            label: "Meus Agendamentos",
            icon: <CalendarIcon className="shrink-0 size-4" />,
            onClick: () => router.push("/client/appointments"),
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
  }, [props.userInfo.role]);

  return (
    <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
      <button
        id="hs-dropdown-account"
        type="button"
        className="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:text-white"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="Dropdown"
      >
        <Image
          className="shrink-0 size-[38px] rounded-full"
          src={AvatarUser}
          alt="Avatar"
        />
      </button>

      <div
        className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="hs-dropdown-account"
      >
        <div className="py-3 px-5 bg-gray-100 rounded-t-lg dark:bg-neutral-700">
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            {props.userInfo.name}
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
            {props.userInfo.email}
          </p>
        </div>
        <div className="p-1.5 space-y-0.5">
          {menuItems.map((item, index) => (
            <a
              key={index}
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
              href="#"
              onClick={item.onClick}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
