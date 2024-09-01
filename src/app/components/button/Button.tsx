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
  fullWidth?: boolean;
}

export default function Button({
  icon,
  color,
  ...defaultButtonProps
}: IButtonColorsProps) {
  return (
    <button
      {...defaultButtonProps}
      className={`${styles.container} ${defaultButtonProps.className}`}
      data-button-color={color}
      data-full-width={defaultButtonProps.fullWidth}
    >
      {icon}
      {defaultButtonProps.children}
    </button>
  );
}
