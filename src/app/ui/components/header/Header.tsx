import styles from "./Header.module.scss";
import MainLogo from "@/app/ui/vectors/main-logo.svg";
import MenuItems from "@/app/ui/components/menu-items/MenuItems";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.headerContent}>
        <MainLogo className={styles.logo} />

        <MenuItems className={styles.menuItemsContainer} />

        <Button color={ButtonColors.WHITE}>CONTACTE-NOS</Button>
      </div>
    </div>
  );
}
