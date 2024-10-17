import React, { useEffect, useRef } from "react";
import styles from "./Select.module.scss";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import AddIcon from "@/app/ui/vectors/plus-icon.svg";
import { useOutsideClick } from "@/app/utils/CustomHooks";

const SELECT_BOTTOM_OFFSET = 20;

export enum ItemType {
  SIMPLE = "SIMPLE",
  ADD_NEW = "ADD_NEW",
}

export interface ISelectItem {
  label: string;
  value: string;
  type?: ItemType;
}

export enum ItemsPlacement {
  TOP = "TOP",
  BOTTOM = "BOTTOM",
}

interface ISelectProps {
  items: ISelectItem[];
  defaultValue?: (string | number)[];
  className?: string;
  placeholder: string;
  label?: string;
  onChange?: (value: ISelectItem[]) => void;
  name?: string;
  scrollableParent?: HTMLElement;
  itemsPlacement?: ItemsPlacement;
  disabled?: boolean;
}

export default function SelectComponent(props: ISelectProps) {
  const [selectedItems, setSelectedItems] = React.useState<ISelectItem[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const optionsRef = useRef<HTMLUListElement | null>(null);

  const selectContainerRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(selectContainerRef, () => setIsOpen(false));

  const handleSelectItem = (item: ISelectItem) => {
    let itemsTobeSelected: ISelectItem[] = [];

    if (isItemSelected(item)) {
      itemsTobeSelected = selectedItems.filter(
        (selectedItem) => selectedItem.value !== item.value,
      );
    } else {
      itemsTobeSelected = [...selectedItems, item];
    }

    setSelectedItems(itemsTobeSelected);
    props.onChange && props.onChange(itemsTobeSelected);
  };

  const isItemSelected = (item: ISelectItem) => {
    return selectedItems.some(
      (selectedItem) => String(selectedItem.value) === String(item.value),
    );
  };

  useEffect(() => {
    if (!props.defaultValue) return;

    const defaultItems = props.items.filter((item) =>
      props.defaultValue?.includes(item.value),
    );

    if (!defaultItems) return;

    setSelectedItems(defaultItems);
    setIsOpen(false);
  }, [props.defaultValue, props.items]);

  useEffect(() => {
    let observeRefValue: HTMLUListElement;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (entry.intersectionRatio < 1 && isOpen && optionsRef.current) {
        optionsRef.current?.scrollIntoView({
          behavior: "smooth",
          inline: "nearest",
          block: "nearest",
        });

        setTimeout(() => {
          if (!props.scrollableParent) {
            return;
          }

          props.scrollableParent.scrollTo({
            behavior: "smooth",
            top: props.scrollableParent.scrollTop + SELECT_BOTTOM_OFFSET,
          });
        }, 300);
      }
    });

    if (optionsRef.current) {
      observer.observe(optionsRef.current);
      observeRefValue = optionsRef.current;
    }

    return () => {
      if (observeRefValue) {
        observer.unobserve(observeRefValue);
      }
    };
  }, [isOpen, props.scrollableParent]);

  return (
    <div
      className={`${styles.container} ${props.className}`}
      ref={selectContainerRef}
    >
      <div
        className={`${styles.selectTrigger} ${selectedItems ? styles.hasValue : ""}`}
      >
        {props.label && (
          <label htmlFor="selectInputCheckbox">{props.placeholder}</label>
        )}
        <input
          type="checkbox"
          id={"selectInputCheckbox"}
          className={styles.optionsViewButton}
          checked={isOpen}
          onClick={(e) => setIsOpen(!isOpen)}
          onChange={() => {}}
          data-checked={isOpen}
          disabled={props.disabled}
        />

        <div className={styles.selectButton}>
          <span className={styles.selectedValue}>
            {selectedItems.map((item) => item.label).join(", ") ||
              props.placeholder}
          </span>

          <div>
            <ChevronDownIcon
              className={`${styles.chevronDown} ${styles.arrowIcon}`}
            />
            <ChevronUpIcon
              className={`${styles.chevronUp} ${styles.arrowIcon}`}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <ul
          className={styles.options}
          ref={optionsRef}
          data-items-placement={props.itemsPlacement}
        >
          {props.items.map((item, index) => (
            <li
              className={styles.option}
              key={`${item.value} - ${index}`}
              data-selected={isItemSelected(item)}
              data-item-type={item.type}
            >
              <input
                type="radio"
                name="option"
                data-label={item.label}
                value={item.value}
                checked={isItemSelected(item)}
                onClick={() => handleSelectItem(item)}
                onChange={() => {}}
              />
              <span className={styles.optionLabel}>
                {item.type === ItemType.ADD_NEW ? (
                  <AddIcon className={styles.addIcon} />
                ) : null}

                {item.label}
              </span>
              <CheckIcon className={styles.checkIcon} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
