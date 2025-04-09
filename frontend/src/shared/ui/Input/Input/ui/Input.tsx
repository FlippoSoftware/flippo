import type { ForwardedRef } from 'react';
import type { TInputProps } from '../types/TInputProps';
import clsx from 'clsx';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import st from './Input.module.scss';

function Input(props: TInputProps, ref: ForwardedRef<HTMLInputElement | null>) {
  const { children, className, icon, size, ...otherProps } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(ref, () => {
    return inputRef.current;
  });

  const onClickInput = () => {
    if (inputRef.current)
      inputRef.current.focus();
  };

  return (
    <div className={ clsx(st.input, st[size], className) } onClick={ onClickInput }>
      <div className={ st.content }>
        {icon || null}
        <input ref={ inputRef } { ...otherProps } />
      </div>
      {children}
    </div>
  );
}

export default forwardRef<HTMLInputElement, TInputProps>(Input);
