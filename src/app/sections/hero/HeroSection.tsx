"use client";
import styles from "./HeroSection.module.scss";
import BaseSection from "@/app/ui/components/base-section/BaseSection";
import Image from "next/image";
import HeroImage from "@/app/ui/images/hero-image.jpg";
import Header from "@/app/ui/components/header/Header";
import AppointmentCard from "@/app/ui/components/appointment-card/AppointmentCard";
import AnimatedText from "@/app/ui/components/animated-text/AnimatedText";

export default function HeroSection() {
  return (
    <BaseSection>
      <Image
        className={styles.backgroundImage}
        src={HeroImage}
        alt={"Hero Image"}
        fill
      />
      <div className={styles.shadow}></div>

      <div className={styles.container}>
        <Header />

        <AnimatedText
          text={["EXPERIÊNCIAS ÚNICAS", "EM CUIDADOS COM A", "AUTOESTIMA"]}
          element={"h1"}
          className={styles.title}
          once
        />

        <AppointmentCard className={styles.appointmentCard} />
      </div>
    </BaseSection>
  );
}
