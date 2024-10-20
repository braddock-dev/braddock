"use client";

import { IUserInfo } from "@/app/backend/business/auth/data/AuthDtos";
import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";

interface AuthProviderClientProps {
  userInfo?: IUserInfo;
  children: ReactNode;
}
export default function AuthProviderClient(props: AuthProviderClientProps) {
  const setUserInfo = useAuthStore((state) => state.setUserInfo);

  useEffect(() => {
    if (props.userInfo) {
      setUserInfo(props.userInfo);
    }
  }, [props.userInfo]);

  return <>{props.children}</>;
}
