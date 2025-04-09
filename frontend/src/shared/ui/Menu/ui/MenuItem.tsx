import type { ForwardedRef, MouseEvent } from 'react';
import type { TMenuItemProps } from '../types/TMenuItemProps';
import clsx from 'clsx';

import { forwardRef } from 'react';
import st from './Menu.module.scss';
import { useMenu } from './MenuContext';

function MenuItem(props: TMenuItemProps, ref: ForwardedRef<HTMLButtonElement>) {
  const { blockClose, children, className = '', onClick, ...otherProps } = props;
  const { onClose } = useMenu();

  const onClickItem = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick)
      onClick(event);

    if (!blockClose)
      onClose();
  };

  return (
    <button type={ 'button' } { ...otherProps } className={ clsx(st.item, className) } onClick={ onClickItem } ref={ ref } role={ 'menuitem' }>
      {children}
    </button>
  );
}

export default forwardRef(MenuItem);
