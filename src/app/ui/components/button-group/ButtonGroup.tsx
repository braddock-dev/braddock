"use client";
import SelectButton, {
  ISelectButton,
} from "@/app/ui/components/select-button/SelectButton";
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

type SelectionKey = string | number | (string | number)[];

const getDefaultSelection = (defaultSelected?: SelectionKey) => {
  if (!defaultSelected) return [];
  if (Array.isArray(defaultSelected)) return defaultSelected;
  return [defaultSelected];
};

export enum DISPLAY_MODE {
  SWIPER = "SWIPER",
  LIST = "LIST",
}

interface IButtonGroupProps {
  buttonItems: ISelectButton[];
  title: string;
  defaultSelectedKey?: SelectionKey;
  isMultiple?: boolean;
  showCounter?: boolean;
  displayMode: DISPLAY_MODE;
  onSelectedButtonsChange: (buttonValues: any[], buttonData: any[]) => void;
}
export default function ButtonGroup(props: IButtonGroupProps) {
  const [hidden, setHidden] = useState<boolean>(true);
  const swiperRef = useRef<SwiperRef | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);

  useEffect(() => {
    setSelectedKeys(getDefaultSelection(props.defaultSelectedKey));
  }, [props.defaultSelectedKey]);

  const hiddenSliderClass = useMemo(
    () => (hidden ? styles.hidden : ""),
    [hidden],
  );

  const hiddenPrevButtonClass = useMemo(() => {
    return currentSlide === 0 ? styles.hidden : "";
  }, [currentSlide]);

  const hiddenNextButtonClass = useMemo(() => {
    return currentSlide === props.buttonItems.length - 1 ? styles.hidden : "";
  }, [currentSlide, props.buttonItems]);

  const uniqueId = uuid();
  const nextButtonId = `nextButton-${uniqueId}`;
  const prevButtonId = `prevButton-${uniqueId}`;

  const isButtonSelected = useCallback(
    (buttonValue: string) => {
      return selectedKeys.includes(buttonValue);
    },
    [selectedKeys],
  );

  const triggerSelectedButtonsChange = useCallback(
    (selectedKeys: (string | number)[]) => {
      const selectedButtonData = props.buttonItems
        .filter((buttonItem) => selectedKeys.includes(buttonItem.value))
        .map((buttonItem) => buttonItem.data);

      props.onSelectedButtonsChange(selectedKeys, selectedButtonData);
    },
    [props.buttonItems],
  );

  const toggleSelectedButton = useCallback(
    (selectButton: ISelectButton) => {
      let resultOptions;

      if (props.isMultiple) {
        if (isButtonSelected(selectButton.value)) {
          resultOptions = selectedKeys.filter(
            (value) => value !== selectButton.value,
          );
        } else {
          resultOptions = [...selectedKeys, selectButton.value];
        }
      } else {
        resultOptions = [selectButton.value];
      }

      setSelectedKeys(resultOptions);
      triggerSelectedButtonsChange(resultOptions);
    },
    [
      props.isMultiple,
      isButtonSelected,
      selectedKeys,
      triggerSelectedButtonsChange,
    ],
  );

  const displayMode: Record<DISPLAY_MODE, ReactElement> = {
    [DISPLAY_MODE.LIST]: (
      <div className={styles.listContainer}>
        {props.buttonItems.map((buttonItem, index) => (
          <SelectButton
            key={index}
            selectButton={buttonItem}
            isSelected={isButtonSelected(buttonItem.value)}
            onClick={toggleSelectedButton}
          />
        ))}
      </div>
    ),
    [DISPLAY_MODE.SWIPER]: (
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
          slidesOffsetAfter={30}
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
    ),
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        {props.title}{" "}
        <span className={styles.counter}>
          {selectedKeys.length > 1 ? `(${selectedKeys.length})` : ""}
        </span>
      </p>

      {displayMode[props.displayMode]}
    </div>
  );
}
