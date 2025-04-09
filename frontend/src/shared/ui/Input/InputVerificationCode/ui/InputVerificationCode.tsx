'use client';

import type { ChangeEvent, ClipboardEvent, KeyboardEvent, MouseEvent, Ref } from 'react';

import type { TInputVerificationCodeProps, TVerifyInputHandler } from '../types/TInputVerificationCode';
import clsx from 'clsx';
import { createRef, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';

import { unknown } from 'zod';

import st from './InputVerificationCode.module.scss';

const onChangeDefault = () => null;
const onCompletedDefault = () => unknown;

function InputVerificationCode(props: TInputVerificationCodeProps, ref: Ref<TVerifyInputHandler>) {
  const {
    autoFocus = true,
    inputSlotProps,
    invalid = false,
    length = 4,
    onChange = onChangeDefault,
    onCompleted = onCompletedDefault,
    placeholder = '.',
    valid = false,
    value: defaultValue = '',
    variant = 'number'
  } = props;

  const fillValues = (value: string) => Array.from({ length }).fill('').map((_, index) => value[index] ?? '');

  const fillReadOnly = useCallback(() => Array.from<boolean>({ length }).fill(true), [length]);

  const [values, setValues] = useState<string[]>(fillValues(defaultValue));
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [readOnly, setReadOnly] = useState<boolean[]>(fillReadOnly());

  // !TODO: alternatively use useRef to avoid re-creating the array on every render
  // eslint-disable-next-line react/no-create-ref
  const inputRefs = useMemo(() => Array.from({ length }).fill(null).map(() => createRef<HTMLInputElement>()), [length]);

  const findIndexLastEmptyInput = useCallback((): number => {
    for (let index = 0; index < length; index++) {
      const input = inputRefs[index]?.current;
      if (input && input.value === '') {
        return index;
      }
    }
    return length - 1;
  }, [length, inputRefs]);

  const validate = (input: string) => {
    if (variant === 'number') {
      return /\d/.test(input);
    }

    if (variant === 'alphanumeric') {
      return /^[a-z0-9]/i.test(input);
    }

    return true;
  };

  const selectInputContent = (index: number) => {
    const input = inputRefs[index]?.current;

    if (input) {
      requestAnimationFrame(() => input.select());
    }
  };

  const setValue = (value: string, index: number) => {
    const nextValues = [...values];
    nextValues[index] = value;

    setValues(nextValues);

    const stringifiedValues = nextValues.join('');
    const isCompleted = stringifiedValues.length === length;

    onChange(stringifiedValues);

    if (isCompleted) {
      onCompleted(stringifiedValues);
    }
  };

  const focusInput = useCallback(
    (index: number) => {
      if (index < 0 || index === length)
        return;

      const input = inputRefs[index]?.current;

      if (input) {
        requestAnimationFrame(() => input.focus());
        // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
        setReadOnly(() => {
          const newReadOnly = fillReadOnly();
          newReadOnly[index] = false;

          return newReadOnly;
        });
      }
    },
    [inputRefs, fillReadOnly, length]
  );

  const blurInput = (index: number) => {
    const input = inputRefs[index]?.current;

    if (input) {
      requestAnimationFrame(() => input.blur());
    }
  };

  const onInputFocus = (index: number) => {
    const input = inputRefs[index]?.current;

    if (input) {
      setFocusIndex(index);
      selectInputContent(index);
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const eventValue = event.target.value;

    const value = eventValue.replace(values[index] ?? '', '');

    if (!validate(value)) {
      selectInputContent(index);
      return;
    }

    setValue(value, index);

    if (index === length - 1) {
      blurInput(index);
      return;
    }

    focusInput(index + 1);
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    const eventKey = event.key;

    if (eventKey === 'Backspace' || eventKey === 'Delete') {
      event.preventDefault();

      if (inputRefs[focusIndex]?.current?.value === '') {
        setValue('', index - 1);
        focusInput(index - 1);
      }
      else {
        setValue('', focusIndex);
      }
    }
  };

  const onInputPaste = (event: ClipboardEvent<HTMLInputElement>, index: number) => {
    event.preventDefault();

    const clipboardValue = event.clipboardData.getData('text');
    const nextValue = clipboardValue.slice(0, length);

    if (!validate(nextValue)) {
      return;
    }

    setValues(fillValues(nextValue));

    onChange(nextValue);

    const isCompleted = nextValue.length === length;

    if (isCompleted) {
      blurInput(index);
      onCompleted(nextValue);

      return;
    }

    focusInput(nextValue.length);
  };

  const onInputClick = (event: MouseEvent<HTMLDivElement | HTMLInputElement>) => {
    const target = event.target;
    if (target) {
      const index = findIndexLastEmptyInput();
      focusInput(index);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        const index = findIndexLastEmptyInput();
        focusInput(index);
      }
    };
  }, [findIndexLastEmptyInput, focusInput]);

  useEffect(() => {
    if (autoFocus) {
      const index = findIndexLastEmptyInput();

      focusInput(index);
    }
  }, [autoFocus, focusInput, findIndexLastEmptyInput]);

  return (
    <div
      className={ clsx(st.verifyInput, invalid && st.invalid, valid && st.valid) }
      onClick={ event => onInputClick(event) }
    >
      {inputRefs.map((ref, index) => (
        <input
          className={ clsx(st.verifyInputSlot, invalid && st.invalid, valid && st.valid) }
          // eslint-disable-next-line react/no-array-index-key
          key={ `verifyInputSlot-${index}` }
          onChange={ (event: ChangeEvent<HTMLInputElement>) => onInputChange(event, index) }
          onFocus={ () => onInputFocus(index) }
          onKeyDown={ (event: KeyboardEvent<HTMLInputElement>) => onInputKeyDown(event, index) }
          onPaste={ (event: ClipboardEvent<HTMLInputElement>) => onInputPaste(event, index) }
          placeholder={ placeholder }
          readOnly={ readOnly[index] }
          ref={ ref }
          value={ values[index] }
          { ...inputSlotProps }
        />
      ))}
    </div>
  );
}

export default forwardRef<TVerifyInputHandler, TInputVerificationCodeProps>(InputVerificationCode);
