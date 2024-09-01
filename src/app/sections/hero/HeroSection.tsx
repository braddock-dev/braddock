import styles from "./HeroSection.module.scss";
import BaseSection from "@/app/components/base-section/BaseSection";
import Image from "next/image";
import HeroImage from "@/app/ui/images/hero-image.jpg";
import Header from "@/app/components/header/Header";
import AppointmentCard from "@/app/components/appointment-card/AppointmentCard";

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

        <AppointmentCard />

        <h1 className={styles.title}>
          EXPERIÊNCIAS ÚNICAS <br />
          EM CUIDADOS COM A <br />
          AUTOESTIMA
        </h1>
      </div>
    </BaseSection>
  );
}
