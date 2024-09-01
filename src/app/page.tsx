import styles from "./page.module.scss";
import HeroSection from "@/app/sections/hero/HeroSection";

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
    </main>
  );
}
