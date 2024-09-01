import styles from "./Header.module.scss";
import MainLogo from "@/app/ui/vectors/main-logo.svg";
import MenuItems from "@/app/components/menu-items/MenuItems";
import Button, { ButtonColors } from "@/app/components/button/Button";

export default function Header() {
  return (
    <div className={styles.container}>
      <MainLogo className={styles.logo} />

      <MenuItems />

      <Button color={ButtonColors.WHITE}>CONTACTE-NOS</Button>
    </div>
  );
}
