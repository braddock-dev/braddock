"use client";
import styles from "./MenuItems.module.scss";

import MenuItem, {
  IMenuItem,
} from "@/app/ui/components/menu-items/menu-item/MenuItem";
import { Constants } from "@/app/utils/Constants";
import { useEffect, useState } from "react";

const menuItems: IMenuItem[] = [
  Constants.MENU_ITEMS.HOME,
  Constants.MENU_ITEMS.SERVICES,
  Constants.MENU_ITEMS.ABOUT_US,
  Constants.MENU_ITEMS.GALLERY,
];

interface IMenuItemsProps {
  className?: string;
}
export default function MenuItems(props: IMenuItemsProps) {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");

  useEffect(() => {
    const updateActiveMenuItem = () => {
      const hashPath = window.location.hash;
      const menuItem = menuItems.find((menuItem) => menuItem.href === hashPath);

      if (menuItem) {
        setSelectedMenuItem(menuItem.text);
      } else {
        setSelectedMenuItem(Constants.MENU_ITEMS.HOME.text);
      }
    };

    updateActiveMenuItem();

    window.addEventListener("hashchange", updateActiveMenuItem);

    return () => {
      window.removeEventListener("hashchange", updateActiveMenuItem);
    };
  }, [menuItems]);

  return (
    <div className={`${styles.container} ${props.className}`}>
      {menuItems.map((menuItem, index) => (
        <MenuItem
          menuItem={menuItem}
          key={index}
          selected={selectedMenuItem === menuItem.text}
        />
      ))}
    </div>
  );
}
