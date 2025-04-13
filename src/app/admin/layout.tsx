import Header from "@/app/admin/header/Header";
import { ReactNode } from "react";
import SideMenu from "@/app/ui/components/side-menu/SideMenu";
import ProtectedRoutes from "@/app/ui/components/protected-routes/ProtectedRoutes";
import { AuthRoles } from "@/app/backend/business/auth/data/AuthDtos";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <ProtectedRoutes allowedRoles={[AuthRoles.BUSINESS]}>
      <div>
        <Header />
        <SideMenu />

        <div className="w-full transition-all duration-300">
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">{children}</div>
        </div>
      </div>
    </ProtectedRoutes>
  );
}
