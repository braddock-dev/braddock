import styles from "./SelectButton.module.scss";
import { ReactElement } from "react";

export enum ButtonType {
  horizontal = "horizontal",
  vertical = "vertical",
}

export interface ISelectButton {
  text: ReactElement | string;
  type: ButtonType;
  value: any;
  data: any;
}

interface ISelectButtonProps {
  selectButton: ISelectButton;
  onClick?: (selectButton: ISelectButton) => void;
  isSelected: boolean;
  className?: string;
  disabled?: boolean;
}
export default function SelectButton(props: ISelectButtonProps) {
  return (
    <button
      className={`${styles.container} ${props.className}`}
      data-is-selected={props.isSelected}
      data-button-type={props.selectButton.type}
      onClick={() => props.onClick && props.onClick(props.selectButton)}
      disabled={props.disabled}
    >
      {props.selectButton.text}
    </button>
  );
}
