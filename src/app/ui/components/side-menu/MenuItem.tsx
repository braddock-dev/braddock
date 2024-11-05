import { ReactElement } from "react";
import Link from "next/link";
import { clsx } from "clsx";

export interface ISideMenuItem {
  icon: ReactElement;
  label: string;
  url: string;
}

interface MenuItemProps {
  menuItem: ISideMenuItem;
  isActive: boolean;
}
export default function MenuItem(props: MenuItemProps) {
  return (
    <li>
      <Link
        className={clsx(
          "flex items-center gap-x-3.5 py-4 px-2.5 bg-gray-50/10 text-white border border-transparent  text-sm  rounded-lg hover:border-white",
          {
            "!bg-lightBrown01 text-gray-700": props.isActive,
          },
        )}
        href={props.menuItem.url}
      >
        {props.menuItem.icon}
        {props.menuItem.label}
      </Link>
    </li>
  );
}
