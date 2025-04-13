"use client";

import AppLogo from "@/app/ui/vectors/logo-horizontal.svg";
import Link from "next/link";
import { Constants } from "@/app/utils/Constants";
import MenuItem, { ISideMenuItem } from "@/app/ui/components/side-menu/MenuItem";
import { useMemo, useState } from "react";
import HomeIcon from "@/app/ui/vectors/home.svg";
import { usePathname } from "next/navigation";
import { Archive, Menu, UserIcon, Users, X } from "lucide-react";

export default function SideMenu() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = useMemo((): ISideMenuItem[] => {
    return [
      {
        label: "Agendamentos",
        icon: <HomeIcon className="shrink-0 size-4" />,
        url: Constants.APP_ROUTES.APPOINTMENTS,
      },
      {
        label: "Serviços",
        icon: <Archive className="shrink-0 size-4" />,
        url: Constants.APP_ROUTES.SERVICES,
      },
      {
        label: "Operadores",
        icon: <Users className="shrink-0 size-4" />,
        url: Constants.APP_ROUTES.OPERATORS,
      },
      {
        label: "Clientes",
        icon: <Users className="shrink-0 size-4" />,
        url: Constants.APP_ROUTES.CUSTOMERS,
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
      {/* Menu toggle button - visible on all screen sizes */}
      <button
        className="fixed top-3 left-4 z-[70] bg-brown text-white p-2 rounded-md"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <div
        className={`fixed inset-y-0 start-0 z-[60] w-[260px] h-full 
          border-e border-gray-200 bg-brown transition-transform duration-300 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
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
            <nav className="p-3 w-full flex flex-col flex-wrap">
              <ul className="flex flex-col space-y-1">
                {menuItems.map((menuItem, index) => (
                  <MenuItem key={index} menuItem={menuItem} isActive={menuItem.url.startsWith(pathName)} />
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isOpen && <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-[55]" onClick={() => setIsOpen(false)} aria-hidden="true" />}
    </div>
  );
}
