import Header from "@/app/admin/header/Header";
import { ReactNode } from "react";
import SideMenu from "@/app/ui/components/side-menu/SideMenu";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <SideMenu />

      <div className="w-full lg:ps-64">
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">{children}</div>
      </div>
    </div>
  );
}
