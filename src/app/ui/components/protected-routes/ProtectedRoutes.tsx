import { redirect } from "next/navigation";
import { AuthRoles } from "@/app/backend/business/auth/data/AuthDtos";
import { getUserInfo } from "@/app/backend/actions/authActions";
import { Constants } from "@/app/utils/Constants";

interface ProtectedRoutesProps {
  children: React.ReactNode;
  allowedRoles: AuthRoles[];
}
export default async function ProtectedRoutes(props: ProtectedRoutesProps) {
  try {
    const authUser = await getUserInfo();

    if (!props.allowedRoles.includes(authUser?.role!)) {
      return redirect(Constants.APP_ROUTES.HOME);
    }
  } catch (error) {
    return redirect(Constants.APP_ROUTES.HOME);
  }

  return <>{props.children}</>;
}
