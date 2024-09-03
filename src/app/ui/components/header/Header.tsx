"use client";
import styles from "./Header.module.scss";
import MainLogo from "@/app/ui/vectors/main-logo.svg";
import MenuItems from "@/app/ui/components/menu-items/MenuItems";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import { useScrollPosition } from "@/app/utils/CustomHooks";
import { useMemo } from "react";

const START_STICKY_POSITION = 10;

export default function Header() {
  const { y: scrollPosition } = useScrollPosition();

  const isSticky = useMemo(() => {
    return scrollPosition > START_STICKY_POSITION;
  }, [scrollPosition]);

  return (
    <div className={styles.container} data-is-sticky={isSticky}>
      <div className={styles.headerContent}>
        <MainLogo className={styles.logo} />

        <MenuItems className={styles.menuItemsContainer} />

        <Button
          color={ButtonColors.WHITE}
          href={`https://wa.me/+351915917539?text=${encodeURI("Saudações, gostaria de marcar um horário para cortar o cabelo.")}`}
          target={"_blank"}
        >
          CONTACTE-NOS
        </Button>
      </div>
    </div>
  );
}
