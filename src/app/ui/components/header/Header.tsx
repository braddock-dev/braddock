"use client";
import styles from "./Header.module.scss";
import MainLogo from "@/app/ui/vectors/main-logo.svg";
import MenuItems from "@/app/ui/components/menu-items/MenuItems";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import { useScrollPosition } from "@/app/utils/CustomHooks";
import { ReactElement, useMemo } from "react";
import { motion } from "framer-motion";
import { defaultAppearAnimation } from "@/app/utils/animations";
import AvatarOptions from "@/app/ui/components/avatar-options/AvatarOptions";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { Constants } from "@/app/utils/Constants";
import Link from "next/link";
import {
  HeroCardType,
  uiActions,
  uiSelectors,
  useUIStore,
} from "@/app/store/uiStore";

const START_STICKY_POSITION = 10;

export default function Header() {
  const heroCardType = useUIStore(uiSelectors.heroCardType);
  const setHeroCardType = useUIStore(uiActions.setHeroCardType);
  const router = useRouter();
  const userInfo = useAuthStore((state) => state.userInfo);

  const { y: scrollPosition } = useScrollPosition();

  const isSticky = useMemo(() => {
    return scrollPosition > START_STICKY_POSITION;
  }, [scrollPosition]);

  const actionButtonByHeroCardType: Record<HeroCardType, ReactElement> = {
    [HeroCardType.NEW_APPOINTMENT]: (
      <Button
        color={ButtonColors.BROWN}
        onClick={() => {
          window.scroll(0, 0);
          setHeroCardType(HeroCardType.APPOINTMENTS_LIST);
        }}
      >
        VER AGENDAMENTOS
      </Button>
    ),
    [HeroCardType.APPOINTMENTS_LIST]: (
      <Button
        color={ButtonColors.BLACK}
        onClick={() => {
          window.scroll(0, 0);
          setHeroCardType(HeroCardType.NEW_APPOINTMENT);
        }}
      >
        AGENDAR AGORA
      </Button>
    ),
  };

  return (
    <div className={styles.container} data-is-sticky={isSticky}>
      <div className={styles.headerContent}>
        <motion.div {...defaultAppearAnimation}>
          <Link href={Constants.APP_ROUTES.HOME}>
            <MainLogo className={styles.logo} />
          </Link>
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
            <>
              <motion.div {...defaultAppearAnimation}>
                {actionButtonByHeroCardType[heroCardType]}
              </motion.div>
              <AvatarOptions userInfo={userInfo} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
