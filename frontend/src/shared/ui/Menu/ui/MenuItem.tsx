import type { MouseEvent } from 'react';
import type { TMenuItemProps } from '../types/TMenuItemProps';
import clsx from 'clsx';

import st from './Menu.module.scss';
import { useMenu } from './MenuContext';

function MenuItem(props: TMenuItemProps) {
  const { blockClose, children, className = '', onClick, ref, ...otherProps } = props;
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

export default MenuItem;
