import type { ForwardedRef } from 'react';
import type { TFormInputProps } from '../types/TFormInputProps';
import { Input } from '@shared/ui/Input';

import { clsx } from 'clsx';
import { forwardRef } from 'react';

import st from './FormInput.module.scss';

function FormInput(props: TFormInputProps, ref: ForwardedRef<HTMLInputElement>) {
  const { className, errorMessage, ...otherProps } = props;

  return (
    <div className={ clsx(st.inputGroup, !!errorMessage && st.show) }>
      <Input className={ clsx(!!errorMessage && st.invalid, className) } ref={ ref } { ...otherProps } />
      <div className={ clsx(st.errorWrap, !!errorMessage && st.show) }>
        <p className={ st.error }>{errorMessage}</p>
      </div>
    </div>
  );
}

export default forwardRef(FormInput);
