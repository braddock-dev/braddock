"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  authActions,
  authSelectors,
  useAuthStore,
} from "@/app/store/authStore";
import Image from "next/image";
import GoogleCalendarIcon from "@/app/ui/images/google-calendar-icon.png";
import FallbackImage from "@/app/ui/images/avatarFallback.png";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getUserInfo,
  refreshGoogleCalendarToken,
} from "@/app/backend/actions/authActions";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Page() {
  const userInfo = useAuthStore(authSelectors.userInfo);
  const setUserInfo = useAuthStore(authActions.setUserInfo);

  const { data, dataUpdatedAt } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: () => getUserInfo(),
  });

  const { mutate: mutateRefreshCalendarLink, isPending } = useMutation({
    mutationFn: () => refreshGoogleCalendarToken(),
    onSuccess: (refreshTokenUrl: string) => {
      window.open(refreshTokenUrl, "_blank");
    },
    onError: () => {
      toast.error("Erro ao conectar com o Google Calendar");
    },
  });

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data, dataUpdatedAt]);

  if (!userInfo) {
    return null;
  }

  return (
    <Card className={"p-5"}>
      <h1 className={"text-2xl font-semibold tracking-tight text-brown"}>
        Meu Perfil
      </h1>

      <div className={"flex flex-col w-full justify-center items-center mt-10"}>
        <Avatar className={"w-24 h-24"}>
          <AvatarImage src={FallbackImage.src} />
          <AvatarFallback>{userInfo.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <p className="text-sm text-gray-800 mt-2">{userInfo.name}</p>
        <p className="text-sm text-brown">{userInfo.email}</p>
        <p className="text-sm text-gray-500">{userInfo.role}</p>
        <p className="text-sm text-gray-500">{userInfo.phoneNumber}</p>
      </div>

      <div className={"flex justify-center flex-col items-center mt-2"}>
        <div className={"flex gap-3 items-center"}>
          <Image
            src={GoogleCalendarIcon}
            alt={"Google calendar icon"}
            className={"w-4 h-4"}
          />

          {userInfo.hasGoogleCalendar ? (
            <p className={"text text-green-500"}>conectado</p>
          ) : (
            <p className={"text text-red-500"}>Não conectado</p>
          )}
        </div>

        <Button
          className={"mt-2 bg-brown"}
          onClick={() => mutateRefreshCalendarLink()}
        >
          {userInfo.hasGoogleCalendar ? "Reconectar" : "Conectar"}
        </Button>
      </div>
    </Card>
  );
}
