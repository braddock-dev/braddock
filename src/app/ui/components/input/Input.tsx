'use client';
import styles from './Input.module.scss';
import React, { forwardRef, JSXElementConstructor, useMemo, useState } from 'react';

interface IInputProps extends React.ComponentPropsWithoutRef<'input'> {
  Icon?: JSXElementConstructor<any>;
  position?: 'LEFT' | 'RIGHT';
  clickIcon?: () => void;
  dirty?: boolean;
  touched?: boolean;
  errorMessage?: string;
  floatingMode?: boolean;
  withBorder?: boolean;
  classNameContainer?: string;
}
function Input({ Icon, errorMessage, floatingMode, touched, classNameContainer, ...rest }: IInputProps, ref?: React.Ref<HTMLInputElement>) {
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState<any>(rest.value || '');

  const getValidationClass = useMemo(() => {
    return touched && errorMessage ? styles.invalid : '';
  }, [touched, errorMessage]);

  const getFloatModeClass = useMemo(() => {
    return floatingMode ? styles.floatingMode : '';
  }, [floatingMode]);

  const isFloating = useMemo(() => {
    return inputFocus || rest.value || localValue;
  }, [inputFocus, rest.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    rest.onChange && rest.onChange(e);
  };

  return (
    <div
      className={`${styles.container} ${rest.disabled ? styles.disabled : ''} ${classNameContainer || ''}`}
      onFocus={() => setInputFocus(true)}
      onBlur={() => setInputFocus(false)}
    >
      <input ref={ref} className={`${styles.input} ${getValidationClass} ${getFloatModeClass}`} onChange={handleChange} {...rest} />

      {floatingMode && (
        <label className={`${styles.label} ${isFloating ? styles.floatLabel : ''}`} htmlFor={rest.name}>
          {rest.placeholder}
        </label>
      )}
      {!!Icon && <Icon onClick={() => rest.clickIcon && rest.clickIcon()} />}
      {!!touched && errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
}

export default forwardRef(Input);
