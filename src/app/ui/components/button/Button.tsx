import styles from "./Button.module.scss";
import { ButtonHTMLAttributes, ReactElement } from "react";
import Link from "next/link";
import Spinner, { SpinnerColor } from "@/app/ui/components/spinner/Spinner";

export enum ButtonColors {
  WHITE = "white",
  BLACK = "black",
  BROWN = "brown",
  LIGHT_BROWN = "light-brown",
}

interface IButtonColorsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColors;
  children: ReactElement | string;
  fullWidth?: boolean;
  outline?: boolean;
  href?: string;
  target?: "_blank" | "_self";
  isLoading?: boolean;
}

export default function Button({
  color,
  href,
  target,
  fullWidth,
  outline,
  isLoading,
  ...defaultButtonProps
}: IButtonColorsProps) {
  return (
    <button
      {...defaultButtonProps}
      className={`${styles.container} ${defaultButtonProps.className}`}
      data-button-color={color}
      data-full-width={fullWidth}
      data-outline={outline}
    >
      {isLoading ? (
        <Spinner className={styles.spinner} color={SpinnerColor.WHITE} />
      ) : (
        <>
          {href ? (
            <Link className={styles.link} href={href} target={target}>
              {defaultButtonProps.children}
            </Link>
          ) : (
            defaultButtonProps.children
          )}
        </>
      )}
    </button>
  );
}
