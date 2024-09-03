import styles from "./TestimonialCard.module.scss";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { useMemo, useRef, useState } from "react";
import ArrowRight from "@/app/ui/vectors/arrow-right-circle.svg";

const testimonials = [
  {
    name: "MUFANA",
    text: (
      <p>
        &rdquo;Encontrei na <span className={styles.highlight}>Braddock</span> o
        serviço que sempre procurei. O ambiente é acolhedor, os profissionais
        são altamente qualificados e o atendimento é impecável. Saio de lá
        sempre satisfeito, com um corte impecável e a barba alinhada. Recomendo
        para quem busca qualidade e um toque de estilo!&rdquo;
      </p>
    ),
  },
  {
    name: "Crick Oliveira",
    text: (
      <p>
        &rdquo;Então mano já corto com o Jonne desde novembro do ano passado,
        fico uns dias a mais sem cortar mas não corto com outro não haha, ele
        tem o talento mesmo, falha nunca pode ter certeza que o mano é bom
        mesmo.&rdquo;
      </p>
    ),
  },
  {
    name: "Gesner Almeida",
    text: (
      <p>
        &rdquo;Cortar o cabelo na Braddock uma experiência única.Quando você é
        um profissional que se dedica, que sabe o que está fazendo e com
        material de primeira. O corte foi incrível, poucas vezes foi feito em
        mim um degradê tão bem feito.&rdquo;
      </p>
    ),
  },
];

export default function TestimonialCard() {
  const [hidden, setHidden] = useState<boolean>(true);
  const swiperRef = useRef<SwiperRef | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextButtonId = "nextButtonTest";
  const prevButtonId = "prevButtonTest";

  const hiddenSliderClass = useMemo(
    () => (hidden ? styles.hidden : ""),
    [hidden],
  );

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Swiper
          spaceBetween={25}
          slidesPerView={1}
          loop
          mousewheel={{ enabled: true, forceToAxis: true }}
          modules={[Mousewheel, Navigation, Autoplay, Pagination]}
          scrollbar={{ draggable: true }}
          pagination={{
            type: "bullets",
            renderBullet: (index, className) => {
              return `<div class="${className}"></div>`;
            },
            bulletClass: styles.paginationBullet,
            currentClass: styles.paginationBulletCurrent,
            horizontalClass: styles.paginationHorizontal,
            bulletActiveClass: styles.paginationBulletActive,
          }}
          className={`${styles.swiperContainer} ${hiddenSliderClass}`}
          ref={swiperRef}
          onInit={() => setHidden(false)}
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
          navigation={{
            nextEl: `#${nextButtonId}`,
            prevEl: `#${prevButtonId}`,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className={styles.testimonialContainer}>
              <div className={styles.testimonialText}>{testimonial.text}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.bottom}>
        <p className={styles.name}>MUFANA</p>
        <div className={styles.controls}>
          <div className={styles.arrows}>
            <ArrowRight
              className={`${styles.arrow} ${styles.arrowLeft}`}
              id={prevButtonId}
              data-disabled={currentSlide === 0}
            />

            <ArrowRight className={`${styles.arrow}`} id={nextButtonId} />
          </div>
        </div>
      </div>
    </div>
  );
}
