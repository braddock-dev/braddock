"use client";
import styles from "./Header.module.scss";
import MainLogo from "@/app/ui/vectors/main-logo.svg";
import MenuItems from "@/app/ui/components/menu-items/MenuItems";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import { useScrollPosition } from "@/app/utils/CustomHooks";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { defaultAppearAnimation } from "@/app/utils/animations";
import AvatarOptions from "@/app/ui/components/avatar-options/AvatarOptions";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { Constants } from "@/app/utils/Constants";

const START_STICKY_POSITION = 10;

export default function Header() {
  const router = useRouter();
  const userInfo = useAuthStore((state) => state.userInfo);

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

        <div className={"flex gap-5 items-center"}>
          {!userInfo ? (
            <motion.div {...defaultAppearAnimation}>
              <Button
                color={ButtonColors.WHITE}
                href={"#"}
                onClick={() => router.push(Constants.APP_ROUTES.LOGIN)}
              >
                ENTRAR
              </Button>
            </motion.div>
          ) : (
            <></>
          )}

          {userInfo && <AvatarOptions userInfo={userInfo} />}
        </div>
      </div>
    </div>
  );
}
