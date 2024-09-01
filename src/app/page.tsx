import styles from "./page.module.scss";
import HeroSection from "@/app/sections/hero/HeroSection";
import ServicesSection from "@/app/sections/services/ServicesSection";

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <ServicesSection />
    </main>
  );
}
