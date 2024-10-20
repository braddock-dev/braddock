import { getUserInfo } from "@/app/backend/actions/authActions";
import { ReactNode } from "react";
import Logger from "@/app/utils/Logger";
import AuthProviderClient from "@/app/ui/components/auth-provider/AuthProviderClient";
import { IUserInfo } from "@/app/backend/business/auth/data/AuthDtos";

const LOG_TAG = "AuthProvider";

interface AuthProviderProps {
  children: ReactNode;
}
export default async function AuthProvider(props: AuthProviderProps) {
  let userInfo: IUserInfo | undefined;

  try {
    userInfo = await getUserInfo();
  } catch (error) {
    Logger.error(LOG_TAG, "Error on getting user info", error);
  }

  return (
    <AuthProviderClient userInfo={userInfo}>
      {props.children}
    </AuthProviderClient>
  );
}
