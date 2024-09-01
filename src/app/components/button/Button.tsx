import styles from "./Button.module.scss";
import { ButtonHTMLAttributes, ReactElement } from "react";

export enum ButtonColors {
  WHITE = "white",
  BLACK = "black",
  BROWN = "brown",
  LIGHT_BROWN = "light-brown",
}

interface IButtonColorsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColors;
  icon?: ReactElement;
  children: ReactElement;
}

export default function Button({
  icon,
  color,
  ...defaultButtonProps
}: IButtonColorsProps) {
  return (
    <button
      className={styles.container}
      {...defaultButtonProps}
      data-button-color={color}
    >
      {icon}
      {defaultButtonProps.children}
    </button>
  );
}
