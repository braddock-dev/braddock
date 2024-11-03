"use client";
import styles from "./HeroSection.module.scss";
import BaseSection from "@/app/ui/components/base-section/BaseSection";
import Image from "next/image";
import HeroImage from "@/app/ui/images/hero-image.jpg";
import Header from "@/app/ui/components/header/Header";
import AppointmentCard from "@/app/ui/components/appointment-card/AppointmentCard";
import AnimatedText from "@/app/ui/components/animated-text/AnimatedText";
import AppointmentsListCard from "@/app/ui/components/appointments-list-card/AppointmentsListCard";
import { HeroCardType, uiSelectors, useUIStore } from "@/app/store/uiStore";
import { ReactElement } from "react";
import { Constants } from "@/app/utils/Constants";

export default function HeroSection() {
  const heroCardType = useUIStore(uiSelectors.heroCardType);

  const renderCard: Record<HeroCardType, ReactElement> = {
    [HeroCardType.NEW_APPOINTMENT]: (
      <AppointmentCard className={styles.appointmentCard} />
    ),
    [HeroCardType.APPOINTMENTS_LIST]: (
      <AppointmentsListCard className={styles.appointmentCard} />
    ),
  };

  return (
    <BaseSection id={Constants.MENU_ITEMS.HOME.href}>
      <Image
        className={styles.backgroundImage}
        src={HeroImage}
        alt={"Hero Image"}
        fill
      />
      <div className={styles.shadow}></div>

      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          <AnimatedText
            text={["EXPERIÊNCIAS ÚNICAS", "EM CUIDADOS COM A", "AUTOESTIMA"]}
            element={"h1"}
            className={styles.title}
            once
          />

          {renderCard[heroCardType]}
        </div>
      </div>
    </BaseSection>
  );
}
