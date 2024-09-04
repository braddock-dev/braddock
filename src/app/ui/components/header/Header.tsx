"use client";
import styles from "./Header.module.scss";
import MainLogo from "@/app/ui/vectors/main-logo.svg";
import MenuItems from "@/app/ui/components/menu-items/MenuItems";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import { useScrollPosition } from "@/app/utils/CustomHooks";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { defaultAppearAnimation } from "@/app/utils/animations";

const START_STICKY_POSITION = 10;

export default function Header() {
  const { y: scrollPosition } = useScrollPosition();

  const isSticky = useMemo(() => {
    return scrollPosition > START_STICKY_POSITION;
  }, [scrollPosition]);

  return (
    <div className={styles.container} data-is-sticky={isSticky}>
      <div className={styles.headerContent}>
        <motion.div {...defaultAppearAnimation}>
          <MainLogo className={styles.logo} />
        </motion.div>

        <motion.div {...defaultAppearAnimation}>
          <MenuItems className={styles.menuItemsContainer} />
        </motion.div>

        <motion.div {...defaultAppearAnimation}>
          <Button
            color={ButtonColors.WHITE}
            href={`https://wa.me/+351915917539?text=${encodeURI("Saudações, gostaria de marcar um horário para cortar o cabelo.")}`}
            target={"_blank"}
          >
            CONTACTE-NOS
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
