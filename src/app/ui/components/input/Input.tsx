"use client";
import styles from "./Input.module.scss";
import React, {
  forwardRef,
  JSXElementConstructor,
  useMemo,
  useState,
} from "react";

interface IInputProps extends React.ComponentPropsWithoutRef<"input"> {
  Icon?: JSXElementConstructor<any>;
  position?: "LEFT" | "RIGHT";
  clickIcon?: () => void;
  dirty?: boolean;
  touched?: boolean;
  errorMessage?: string;
  floatingMode?: boolean;
  withBorder?: boolean;
  classNameContainer?: string;
  isValid?: boolean;
  hasValue: boolean;
  themeMode?: "light" | "dark";
  centerText?: boolean;
}
function Input(
  {
    Icon,
    errorMessage,
    floatingMode,
    touched,
    classNameContainer,
    isValid,
    hasValue,
    themeMode = "dark",
    centerText,
    withBorder,
    ...rest
  }: IInputProps,
  ref?: React.Ref<HTMLInputElement>,
) {
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState<any>(rest.value || "");

  const getValidationClass = useMemo(() => {
    if (touched && errorMessage) {
      return styles.invalid;
    }

    if (touched && !errorMessage) {
      return styles.valid;
    }
  }, [touched, errorMessage]);

  const getFloatModeClass = useMemo(() => {
    return floatingMode ? styles.floatingMode : "";
  }, [floatingMode]);

  const isFloating = useMemo(() => {
    return inputFocus || hasValue || localValue;
  }, [inputFocus, hasValue, localValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    rest.onChange && rest.onChange(e);
  };

  return (
    <div
      className={`${styles.container} ${rest.disabled ? styles.disabled : ""} ${classNameContainer || ""}`}
      onFocus={() => setInputFocus(true)}
      onBlur={() => setInputFocus(false)}
      data-is-valid={isValid}
      data-theme-mode={themeMode}
    >
      <input
        ref={ref}
        className={`${styles.input} ${getValidationClass} ${getFloatModeClass} ${centerText ? styles.centerText : ""}`}
        onChange={handleChange}
        {...rest}
      />

      {floatingMode && (
        <label
          className={`${styles.label} ${isFloating ? styles.floatLabel : ""}`}
          htmlFor={rest.name}
        >
          {rest.placeholder}
        </label>
      )}
      {!!Icon && <Icon onClick={() => rest.clickIcon && rest.clickIcon()} />}
      {!!touched && errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
}

export default forwardRef(Input);
