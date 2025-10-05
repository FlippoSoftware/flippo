

import type { TDialogProps } from '../types/TDialogProps';
import clsx from 'clsx';

import { useImperativeHandle, useRef } from 'react';
import st from './Dialog.module.scss';

function Dialog(props: TDialogProps) {
  const { children, className, ref, ...otherProps } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

  return (
    <dialog className={ clsx(st.dialog, className) } ref={ dialogRef } { ...otherProps }>
      {children}
    </dialog>
  );
}

export default Dialog;
