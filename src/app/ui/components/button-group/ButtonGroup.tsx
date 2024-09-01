"use client";
import SelectButton, {
  ISelectButton,
} from "@/app/ui/components/select-button/SelectButton";
import { useCallback, useMemo, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import {
  FreeMode,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import styles from "./ButtonGroup.module.scss";
import ArrowIcon from "@/app/ui/vectors/chevron-right.svg";
import { v4 as uuid } from "uuid";

interface IButtonGroupProps {
  buttonItems: ISelectButton[];
  title: string;
  defaultSelected?: string;
  isMultiple?: boolean;
  showCounter?: boolean;
}
export default function ButtonGroup(props: IButtonGroupProps) {
  const [hidden, setHidden] = useState<boolean>(true);
  const swiperRef = useRef<SwiperRef | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const [selectedButtons, setSelectedButtons] = useState<string[]>(
    props.defaultSelected ? [props.defaultSelected] : [],
  );

  const hiddenSliderClass = useMemo(
    () => (hidden ? styles.hidden : ""),
    [hidden],
  );

  const hiddenPrevButtonClass = useMemo(() => {
    return currentSlide === 0 ? styles.hidden : "";
  }, [currentSlide]);

  const hiddenNextButtonClass = useMemo(() => {
    return currentSlide === props.buttonItems.length - 1 ? styles.hidden : "";
  }, [currentSlide]);

  const uniqueId = uuid();
  const nextButtonId = `nextButton-${uniqueId}`;
  const prevButtonId = `prevButton-${uniqueId}`;

  const isButtonSelected = useCallback(
    (buttonValue: string) => {
      return selectedButtons.includes(buttonValue);
    },
    [selectedButtons],
  );

  const toggleSelectedButton = (selectButton: ISelectButton) => {
    if (props.isMultiple) {
      if (isButtonSelected(selectButton.value)) {
        setSelectedButtons(
          selectedButtons.filter((value) => value !== selectButton.value),
        );
      } else {
        setSelectedButtons([...selectedButtons, selectButton.value]);
      }
    } else {
      setSelectedButtons([selectButton.value]);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        {props.title}{" "}
        <span className={styles.counter}>
          {selectedButtons.length > 1 ? `(${selectedButtons.length})` : ""}
        </span>
      </p>
      <div className={styles.groupContainer}>
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          freeMode={{ enabled: true }}
          mousewheel={{ enabled: true }}
          modules={[FreeMode, Mousewheel, Scrollbar, Pagination, Navigation]}
          scrollbar={{ draggable: true, enabled: true }}
          className={`${styles.swiperContainer} ${hiddenSliderClass}`}
          ref={swiperRef}
          onInit={() => setHidden(false)}
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
          navigation={{
            nextEl: `#${nextButtonId}`,
            prevEl: `#${prevButtonId}`,
          }}
        >
          {props.buttonItems.map((buttonItem, index) => (
            <SwiperSlide key={index} style={{ width: "auto" }}>
              <SelectButton
                key={index}
                selectButton={buttonItem}
                isSelected={isButtonSelected(buttonItem.value)}
                onClick={toggleSelectedButton}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          id={prevButtonId}
          className={`${styles.prevButton} ${hiddenSliderClass} ${hiddenPrevButtonClass}`}
        >
          <ArrowIcon className={styles.icon} />
        </div>

        <div
          id={nextButtonId}
          className={`${styles.nextButton} ${hiddenSliderClass} ${hiddenNextButtonClass}`}
        >
          <ArrowIcon className={styles.icon} />
        </div>
      </div>
    </div>
  );
}
