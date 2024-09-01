import styles from "./MenuItem.module.scss";

export interface IMenuItem {
  href: string;
  text: string;
}

interface MenuItemProps {
  menuItem: IMenuItem;
  selected?: boolean;
}

export default function MenuItem(props: MenuItemProps) {
  return (
    <li className={styles.container} data-is-selected={props.selected}>
      <a className={styles.link} href={props.menuItem.href}>
        {props.menuItem.text}
      </a>
    </li>
  );
}
