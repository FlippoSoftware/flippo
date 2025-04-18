import type { TMenuHandlerProps } from '../types/TMenuHandlerProps';

import { cloneElement, useImperativeHandle } from 'react';
import { useMenu } from './MenuContext';

function MenuHandler(props: TMenuHandlerProps) {
  const { children, ref, ...otherProps } = props;
  const { handler, isOpen, onToggle } = useMenu();

  useImperativeHandle<HTMLElement | null, HTMLElement | null>(ref, () => handler.current);

  // eslint-disable-next-line react/no-clone-element
  return cloneElement(children, {
    onClick(event: MouseEvent) {
      event.preventDefault();

      onToggle();
    },
    'ref': handler,
    ...otherProps,
    'aria-controls': 'menu-list',
    'aria-expanded': isOpen,
    'aria-haspopup': 'true',
    'id': 'menu-button'
  });
}

MenuHandler.displayName = 'Flippo.MenuHandler';

export default MenuHandler;
