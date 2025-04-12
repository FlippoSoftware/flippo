import type { TButtonProps } from '../types/TButtonProps';
import { UnstyledButton } from '@shared/ui/Button';

import { clsx } from 'clsx';

import st from './Button.module.scss';

function Button<E extends 'a' | 'button'>(props: TButtonProps<E>) {
  const { children, className, iconLeft, iconRight, size, variant, ...otherProps } = props;

  return (
    <UnstyledButton className={ clsx(st.button, st[variant], st[size], className) } { ...(otherProps as any) }>
      <div className={ st.content }>
        {iconLeft || null}
        <span className={ st.text }>{children}</span>
        {iconRight || null}
      </div>
    </UnstyledButton>
  );
}

export default Button;
