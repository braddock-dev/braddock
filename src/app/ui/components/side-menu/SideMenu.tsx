"use client";

import AppLogo from "@/app/ui/vectors/logo-horizontal.svg";
import Link from "next/link";
import { Constants } from "@/app/utils/Constants";
import MenuItem, {
  ISideMenuItem,
} from "@/app/ui/components/side-menu/MenuItem";
import { useMemo } from "react";
import HomeIcon from "@/app/ui/vectors/home.svg";
import { usePathname } from "next/navigation";
import { UserIcon } from "lucide-react";

export default function SideMenu() {
  const pathName = usePathname();

  const menuItems = useMemo((): ISideMenuItem[] => {
    return [
      {
        label: "Agendamentos",
        icon: <HomeIcon className="shrink-0 size-4" />,
        url: Constants.APP_ROUTES.APPOINTMENTS,
      },
      {
        label: "Minha Conta",
        icon: <UserIcon className="shrink-0 size-4" />,
        url: Constants.APP_ROUTES.ACCOUNT,
      },
    ];
  }, []);

  return (
    <div>
      <div
        id="hs-application-sidebar"
        className="hs-overlay  [--auto-close:lg]
  hs-overlay-open:translate-x-0
  -translate-x-full transition-all duration-300 transform
  w-[260px] h-full
  hidden
  fixed inset-y-0 start-0 z-[60]
  border-e border-gray-200 bg-brown
  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          <div className="px-6 pt-4 flex justify-center">
            <Link
              className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              href={Constants.APP_ROUTES.HOME}
              aria-label="Preline"
            >
              <AppLogo className={"h-8"} />
            </Link>
          </div>

          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <nav
              className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <ul className="flex flex-col space-y-1">
                {menuItems.map((menuItem, index) => (
                  <MenuItem
                    key={index}
                    menuItem={menuItem}
                    isActive={menuItem.url.startsWith(pathName)}
                  />
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
