import styles from "./Button.module.scss";
import { ButtonHTMLAttributes, ReactElement } from "react";
import Link from "next/link";

export enum ButtonColors {
  WHITE = "white",
  BLACK = "black",
  BROWN = "brown",
  LIGHT_BROWN = "light-brown",
}

interface IButtonColorsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColors;
  children: ReactElement;
  fullWidth?: boolean;
  href?: string;
  target?: "_blank" | "_self";
}

export default function Button({
  color,
  href,
  target,
  ...defaultButtonProps
}: IButtonColorsProps) {
  return (
    <button
      {...defaultButtonProps}
      className={`${styles.container} ${defaultButtonProps.className}`}
      data-button-color={color}
      data-full-width={defaultButtonProps.fullWidth}
    >
      {href ? (
        <Link className={styles.link} href={href} target={target}>
          {defaultButtonProps.children}
        </Link>
      ) : (
        defaultButtonProps.children
      )}
    </button>
  );
}
