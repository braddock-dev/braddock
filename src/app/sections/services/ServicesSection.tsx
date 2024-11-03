"use client";

import styles from "./ServicesSection.module.scss";
import "swiper/css";
import BaseSection from "@/app/ui/components/base-section/BaseSection";
import ArrowRight from "@/app/ui/vectors/arrow-right.svg";
import { Autoplay, Mousewheel, Navigation } from "swiper/modules";
import Image1 from "@/app/ui/images/image1.jpg";
import Image2 from "@/app/ui/images/image2.jpg";
import Image3 from "@/app/ui/images/image3.jpg";
import Image4 from "@/app/ui/images/image4.jpg";
import Image5 from "@/app/ui/images/image5.jpg";
import Image6 from "@/app/ui/images/image6.jpg";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import TestimonialCard from "@/app/ui/components/testimonial-card/TestimonialCard";
import BasePricesTable from "@/app/ui/components/base-price-table/BasePricesTable";
import { Constants } from "@/app/utils/Constants";

interface IImages {
  image: any;
  customStyle?: string;
}

const images: IImages[] = [
  { image: Image1 },
  { image: Image2 },
  { image: Image3 },
  { image: Image4 },
  { image: Image5 },
  { image: Image6 },
];

const breakpoints = {
  0: {
    spaceBetween: 10,
  },
  768: {
    spaceBetween: 25,
    loop: true,
  },
};

export default function ServicesSection() {
  const [hidden, setHidden] = useState<boolean>(true);
  const swiperRef = useRef<SwiperRef | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextButtonId = "nextButton";
  const prevButtonId = "prevButton";

  const hiddenSliderClass = useMemo(
    () => (hidden ? styles.hidden : ""),
    [hidden],
  );

  return (
    <BaseSection
      containerClassName={styles.sectionContainer}
      id={Constants.MENU_ITEMS.SERVICES.href}
    >
      <div className={styles.container}>
        <div className={styles.serviceInfo}>
          <div className={styles.left}>
            <h1 className={styles.title}>
              APRECIE OS NOSSOS <br />
              TRABALHOS
            </h1>

            <p className={styles.description}>
              ️Sob a orientação de{" "}
              <span className={styles.highlight}>Jonne</span>, nosso fundador e
              um barbeiro de longa trajetória, que iniciou sua jornada
              profissional no Rio de Janeiro, Brasil, e agora continua
              aprimorando suas habilidades em Portugal.
            </p>

            <div className={styles.controls}>
              <div className={styles.counter}>
                ({currentSlide + 1}/{images.length})
              </div>
              <div className={styles.arrows}>
                <ArrowRight
                  className={`${styles.arrow} ${styles.arrowLeft}`}
                  id={prevButtonId}
                  data-disabled={currentSlide === 0}
                />

                <ArrowRight
                  className={`${styles.arrow} ${styles.arrowRight}`}
                  id={nextButtonId}
                  data-disabled={currentSlide === images.length - 1}
                />
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <Swiper
              slidesPerView="auto"
              mousewheel={{ enabled: true, forceToAxis: true }}
              modules={[Mousewheel, Navigation, Autoplay]}
              scrollbar={{ draggable: true }}
              className={`${styles.swiperContainer} ${hiddenSliderClass}`}
              ref={swiperRef}
              onInit={() => setHidden(false)}
              onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
              navigation={{
                nextEl: `#${nextButtonId}`,
                prevEl: `#${prevButtonId}`,
              }}
              autoplay={{ delay: 5000, disableOnInteraction: true }}
              breakpoints={breakpoints}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className={styles.imageContainer}>
                  <Image
                    className={styles.image}
                    src={image.image}
                    alt={"image"}
                    width={350}
                    height={350}
                  />
                  <div className={styles.shadow}></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div
          className={styles.basePrices}
          id={Constants.MENU_ITEMS.BASE_PRICES.href}
        >
          <div className={styles.testimonials}>
            <TestimonialCard />
          </div>

          <div className={styles.pricesContainer}>
            <h1 className={styles.title}>PREÇOS BASE</h1>
            <BasePricesTable />
          </div>
        </div>
      </div>
    </BaseSection>
  );
}
