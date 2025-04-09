import type { ForwardedRef } from 'react';
import type { TIconButtonProps } from '../types/TIconButtonProps';
import { UnstyledButton } from '@shared/ui/Button';
import clsx from 'clsx';

import { forwardRef } from 'react';
import st from './IconButton.module.scss';

function IconButton(props: TIconButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const { children, size, variant, ...otherProps } = props;

  return (
    <UnstyledButton type={ 'button' } as={ 'button' } className={ clsx(st.iconButton, st[variant], st[size]) } ref={ ref } { ...otherProps }>
      {children}
    </UnstyledButton>
  );
}

export default forwardRef(IconButton);
