"use client";

import styles from "./SectionFooter.module.scss";
import BaseSection from "@/app/ui/components/base-section/BaseSection";
import HorizontalLogo from "@/app/ui/vectors/horizontal-logo.svg";
import InstagramIcon from "@/app/ui/vectors/instagram.svg";
import MailIcon from "@/app/ui/vectors/mail.svg";
import PhoneIcon from "@/app/ui/vectors/phone.svg";
import Link from "next/link";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import CalendarIcon from "@/app/ui/vectors/calendar.svg";
import { Constants } from "@/app/utils/Constants";
import { HeroCardType, uiActions, useUIStore } from "@/app/store/uiStore";

const socialMediaLinks = [
  {
    icon: <InstagramIcon className={styles.icon} />,
    url: "https://www.instagram.com/braddock.barber/",
  },
  {
    icon: <MailIcon className={styles.icon} />,
    url: "mailto:jonnebp@gmail.com",
  },
  {
    icon: <PhoneIcon className={styles.icon} />,
    url: "tel:+351915917539",
  },
];

export default function SectionFooter() {
  const setHeroCardType = useUIStore(uiActions.setHeroCardType);

  return (
    <BaseSection
      containerClassName={styles.sectionContainer}
      id={Constants.MENU_ITEMS.LOCATION.href}
    >
      <div className={styles.container}>
        <div className={styles.left}>
          <HorizontalLogo className={styles.logo} />
          <p className={styles.text}>
            Criando experiências únicas em cuidados com a autoestima.
          </p>

          <div className={styles.icons}>
            {socialMediaLinks.map((link, index) => (
              <Link key={index} href={link.url} className={styles.link}>
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <Button
            color={ButtonColors.LIGHT_BROWN}
            className={styles.button}
            onClick={() => {
              window.scroll(0, 0);
              setHeroCardType(HeroCardType.NEW_APPOINTMENT);
            }}
          >
            <div className={styles.buttonContainer}>
              <CalendarIcon className={styles.icon} />
              <span className={styles.text}>AGENDAR</span>
            </div>
          </Button>

          <p className={styles.text}>
            @{new Date().getFullYear()} - Todos os direitos reservados
          </p>
        </div>
      </div>
    </BaseSection>
  );
}
