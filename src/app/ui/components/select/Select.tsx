import React, { ReactElement, useEffect, useRef } from "react";
import styles from "./Select.module.scss";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import AddIcon from "@/app/ui/vectors/plus-icon.svg";
import { useOutsideClick } from "@/app/utils/CustomHooks";
import Spinner, { SpinnerColor } from "@/app/ui/components/spinner/Spinner";

const SELECT_BOTTOM_OFFSET = 20;

export enum ItemType {
  SIMPLE = "SIMPLE",
  ADD_NEW = "ADD_NEW",
}

export interface ISelectItem {
  label: string | ReactElement;
  value: string;
  type?: ItemType;
  selectedDisplay?: string;
  data: any;
}

export enum ItemsPlacement {
  TOP = "TOP",
  BOTTOM = "BOTTOM",
}

const DEFAULT_MAX_HEIGHT = 250;

interface ISelectProps {
  searchable?: boolean;
  onSearchChange?: (value: string) => void;
  handleAddNew?: () => void;
  emptyListMessage?: string;
  items: ISelectItem[];
  defaultValue?: (string | number)[];
  className?: string;
  selectTriggerClassName?: string;
  multiple?: boolean;
  placeholder: string;
  label?: string;
  onChange?: (value: ISelectItem[]) => void;
  name?: string;
  scrollableParent?: HTMLElement;
  itemsPlacement?: ItemsPlacement;
  disabled?: boolean;
  maxHeight?: number;
  isLoading?: boolean;
}

export default function SelectComponent({multiple = true, ...props}: ISelectProps) {
  const [selectedItems, setSelectedItems] = React.useState<ISelectItem[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const optionsRef = useRef<HTMLUListElement | null>(null);
  const [searchValue, setSearchValue] = React.useState<string>("");

  const selectContainerRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(selectContainerRef, () => setIsOpen(false));

  const optionsMaxHeight = props.maxHeight || DEFAULT_MAX_HEIGHT;

  const handleSelectItem = (item: ISelectItem) => {

    if(!multiple){
      setSelectedItems([item]);
      props.onChange && props.onChange([item]);
      return;
    }

    let itemsTobeSelected: ISelectItem[] = [];

    if (isItemSelected(item)) {
      itemsTobeSelected = selectedItems.filter(
        (selectedItem) => selectedItem.value !== item.value,
      );

      if (props.searchable) {
        setSearchValue("");
        setIsOpen(false);
      }
    } else {
      itemsTobeSelected = [...selectedItems, item];

      if (props.searchable) {
        if(typeof item.label === "string"){
          setSearchValue(item.label);
        }else{
          setSearchValue(item.selectedDisplay || item.value);
        }
        setIsOpen(false);
        itemsTobeSelected = [item];
      }
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
    if (!props.defaultValue?.length) return;

    const defaultItems = props.items.filter((item) =>
      props.defaultValue?.includes(item.value),
    );

    if (!defaultItems.length) return;

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

  useEffect(() => {
    props.onSearchChange && props.onSearchChange(searchValue);
  }, [searchValue, props.onSearchChange]);

  const placeholder =
    selectedItems.map((item) => item.selectedDisplay).join(", ") ||
    props.placeholder;

  return (
    <div
      className={`${styles.container} ${props.className} ${props.selectTriggerClassName ?? ""}`}
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

        {props.searchable ? (
          <input
            type="text"
            className={styles.searchInput}
            placeholder={placeholder || "Pesquisar"}
            value={searchValue}
            onChange={(e) => {
              setIsOpen(true);
              setSearchValue(e.target.value);
            }}
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <div className={styles.selectButton}>
            <span className={styles.selectedValue}>{placeholder}</span>

            <div>
              <ChevronDownIcon
                className={`${styles.chevronDown} ${styles.arrowIcon}`}
              />
              <ChevronUpIcon
                className={`${styles.chevronUp} ${styles.arrowIcon}`}
              />
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <ul
          className={styles.options}
          ref={optionsRef}
          data-items-placement={props.itemsPlacement}
          style={{ maxHeight: `${optionsMaxHeight}px` }}
        >
          {props.isLoading ? (
            <li
              className={`${styles.option} ${styles.loadingOption}`}
              data-item-type={ItemType.SIMPLE}
              key={"LoadingOption"}
            >
              <Spinner color={SpinnerColor.BLACK} className={styles.spinner} />
            </li>
          ) : !props.items.length ? (
            <li
              className={`${styles.option} ${styles.noItemsFound}`}
              data-item-type={ItemType.SIMPLE}
              key={"NoItemsFoundItem"}
            >
              {props.emptyListMessage || "Nenhum item encontrado"}
            </li>
          ) : (
            props.items.map((item, index) => (
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
                  onClick={() => {
                    if (item.type === ItemType.ADD_NEW) {
                      setIsOpen(false);
                      props.handleAddNew && props.handleAddNew();
                      return;
                    }

                    handleSelectItem(item);
                  }}
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
            ))
          )}
        </ul>
      )}
    </div>
  );
}
