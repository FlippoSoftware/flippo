import type { TIconButtonProps } from '../types/TIconButtonProps';
import { UnstyledButton } from '@shared/ui/Button';
import clsx from 'clsx';

import st from './IconButton.module.scss';

function IconButton(props: TIconButtonProps) {
  const { children, size, variant, ref, ...otherProps } = props;

  return (
    <UnstyledButton type={ 'button' } as={ 'button' } className={ clsx(st.iconButton, st[variant], st[size]) } ref={ ref } { ...otherProps }>
      {children}
    </UnstyledButton>
  );
}

export default IconButton;
