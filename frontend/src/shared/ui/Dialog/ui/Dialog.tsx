'use client';

import type { ForwardedRef } from 'react';
import type { TDialogProps } from '../types/TDialogProps';
import clsx from 'clsx';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import st from './Dialog.module.scss';

function Dialog(props: TDialogProps, ref: ForwardedRef<HTMLDialogElement>) {
  const { children, className, ...otherProps } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

  return (
    <dialog className={ clsx(st.dialog, className) } ref={ dialogRef } { ...otherProps }>
      {children}
    </dialog>
  );
}

export default forwardRef(Dialog);
