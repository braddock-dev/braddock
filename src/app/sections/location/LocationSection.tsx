import styles from "./LocationSection.module.scss";
import BaseSection from "@/app/ui/components/base-section/BaseSection";
import Button, { ButtonColors } from "@/app/ui/components/button/Button";
import PhoneIcon from "@/app/ui/vectors/phone-icon.svg";
import MapImage from "@/app/ui/images/map-image.jpg";
import Image from "next/image";
import Link from "next/link";

export default function LocationSection() {
  return (
    <BaseSection containerClassName={styles.sectionContainer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.title}>
            ONDE É QUE NOS PODE <br />
            ENCONTRAR?
          </h1>

          <p className={styles.location}>
            Largo General Humberto Delgado, ou, Tv. Jogo da Bola 12, <br />{" "}
            6250-070 Belmonte - Portugal
          </p>

          <Button
            color={ButtonColors.LIGHT_BROWN}
            href={`https://wa.me/+351915917539?text=${encodeURI("Saudações, gostaria de marcar um horário para cortar o cabelo.")}`}
            target={"_blank"}
          >
            <div className={styles.buttonContainer}>
              <PhoneIcon className={styles.icon} />
              <span className={styles.text}>LIGUE-NOS</span>
            </div>
          </Button>
        </div>

        <div className={styles.right}>
          <Link
            className={styles.mapLink}
            target={"_blank"}
            href={
              "https://www.google.pt/maps/place/Barbearia+Braddock/@40.357173,-7.352735,17.83z/data=!4m10!1m2!2m1!1sbraddock!3m6!1s0xd3d1dfb99ba9cf7:0xed79c591905ace27!8m2!3d40.3571449!4d-7.3510334!15sCghicmFkZG9ja5IBC2JhcmJlcl9zaG9w4AEA!16s%2Fg%2F11vbcrf2hn?entry=ttu&g_ep=EgoyMDI0MDgyOC4wIKXMDSoASAFQAw%3D%3D"
            }
          >
            <Image
              className={styles.mapImage}
              src={MapImage}
              alt={"Mapa de localização"}
              width={750}
              height={312}
            />
          </Link>
        </div>
      </div>
    </BaseSection>
  );
}
