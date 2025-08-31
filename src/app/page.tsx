import styles from "./page.module.scss";
import HeroSection from "@/app/sections/hero/HeroSection";
import ServicesSection from "@/app/sections/services/ServicesSection";
import LocationSection from "@/app/sections/location/LocationSection";
import SectionFooter from "@/app/sections/footer/SectionFooter";

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <ServicesSection />
      <LocationSection />
      <SectionFooter />
    </main>
  );
}
